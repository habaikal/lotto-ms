import { useRef, useCallback } from 'react';

/**
 * useLottoWorker — Web Worker 커스텀 훅
 * Vite의 ?worker 문법을 사용하지 않고 Blob URL 방식으로 Worker 생성
 * (CRA / 순수 Vite 모두 호환)
 */
export function useLottoWorker() {
  const workerRef = useRef(null);

  const startWorker = useCallback(({ csvData, gameCount, simulationCount, onLog, onProgress, onComplete }) => {
    // 기존 Worker 종료
    if (workerRef.current) {
      workerRef.current.terminate();
    }

    // Worker 코드를 동적으로 fetch하여 Blob URL 생성
    fetch('/src/workers/lotto.worker.js')
      .then((res) => res.blob())
      .then((blob) => {
        const workerUrl = URL.createObjectURL(blob);
        const worker = new Worker(workerUrl, { type: 'module' });
        workerRef.current = worker;

        worker.onmessage = (e) => {
          const { type, message, progress, results } = e.data;
          switch (type) {
            case 'log':
              onLog(message);
              break;
            case 'progress':
              onProgress(Math.floor(progress));
              break;
            case 'complete':
              onComplete(results);
              worker.terminate();
              URL.revokeObjectURL(workerUrl);
              break;
            default:
              break;
          }
        };

        worker.onerror = (err) => {
          onLog(`[ERROR] Worker 오류: ${err.message}`);
          worker.terminate();
        };

        worker.postMessage({ csvData, gameCount, simulationCount });
      })
      .catch(() => {
        // Blob URL fetch 실패 시 인라인 Blob 방식으로 폴백
        startInlineWorker({ csvData, gameCount, simulationCount, onLog, onProgress, onComplete });
      });
  }, []);

  const stopWorker = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  return { startWorker, stopWorker, workerRef };
}

/**
 * 인라인 Blob Worker 폴백 (프로덕션 빌드용)
 */
function startInlineWorker({ csvData, gameCount, simulationCount, onLog, onProgress, onComplete }) {
  const workerCode = getWorkerCode();
  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const workerUrl = URL.createObjectURL(blob);
  const worker = new Worker(workerUrl);

  worker.onmessage = (e) => {
    const { type, message, progress, results } = e.data;
    if (type === 'log') onLog(message);
    else if (type === 'progress') onProgress(Math.floor(progress));
    else if (type === 'complete') {
      onComplete(results);
      worker.terminate();
      URL.revokeObjectURL(workerUrl);
    }
  };

  worker.postMessage({ csvData, gameCount, simulationCount });
  return worker;
}

function getWorkerCode() {
  return `
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

self.onmessage = function(e) {
  const { csvData, gameCount, simulationCount } = e.data;
  self.postMessage({ type: 'log', message: \`데이터 파이프라인 동기화 완료... (목표: \${simulationCount.toLocaleString()}회)\` });

  const frequency = Array(46).fill(0);
  const lastDrawn = Array(46).fill(0);
  let latestWinningNumbers = [];

  csvData.forEach((row, idx) => {
    const parts = row.split(',').map(Number);
    if (idx === 0 && isNaN(parts[0])) return;
    if (parts.length < 7 || isNaN(parts[1])) return;
    const nums = parts.slice(1, 7);
    if (idx === 1) latestWinningNumbers = [...nums];
    nums.forEach(n => {
      if (n >= 1 && n <= 45) {
        frequency[n]++;
        if (lastDrawn[n] === 0) lastDrawn[n] = idx;
      }
    });
  });

  self.postMessage({ type: 'log', message: 'PDF 가중치 초기화 및 시뮬레이션 엔진 점화...' });

  const weights = Array(46).fill(10);
  for (let i = 1; i <= 45; i++) {
    if (lastDrawn[i] >= 15) weights[i] += 30;
    if (frequency[i] > (csvData.length * 6 / 45) * 1.2) weights[i] = Math.max(5, weights[i] - 10);
  }

  const cumulativeWeights = [];
  let currentTotal = 0;
  for (let i = 1; i <= 45; i++) {
    currentTotal += weights[i];
    cumulativeWeights.push(currentTotal);
  }
  const maxWeight = currentTotal;

  const topCombinations = [];
  let bestScoreThreshold = 0;
  const POOL_SIZE = 1000;

  for (let i = 0; i < simulationCount; i++) {
    if (i % 50000 === 0) {
      self.postMessage({ type: 'progress', progress: (i / simulationCount) * 100 });
    }

    const comb = new Set();
    while (comb.size < 6) {
      const rand = Math.random() * maxWeight;
      let selectedNum = 1;
      for (let j = 0; j < 45; j++) {
        if (rand <= cumulativeWeights[j]) { selectedNum = j + 1; break; }
      }
      comb.add(selectedNum);
    }

    const arrComb = Array.from(comb).sort((a, b) => a - b);
    let score = 100;

    let consec = 1, maxConsec = 1;
    for (let j = 1; j < 6; j++) {
      if (arrComb[j] === arrComb[j-1] + 1) { consec++; maxConsec = Math.max(maxConsec, consec); }
      else { consec = 1; }
    }
    if (maxConsec >= 4) continue;
    if (maxConsec === 3) score -= 15;

    const oddCount = arrComb.filter(n => n % 2 !== 0).length;
    if (oddCount === 0 || oddCount === 6) score -= 30;
    else if (oddCount === 1 || oddCount === 5) score -= 15;

    const highCount = arrComb.filter(n => n > 22).length;
    if (highCount === 0 || highCount === 6) score -= 30;
    else if (highCount === 1 || highCount === 5) score -= 15;

    const diffs = new Set();
    for (let x = 0; x < 5; x++) for (let y = x+1; y < 6; y++) diffs.add(arrComb[y] - arrComb[x]);
    const acValue = diffs.size - 5;
    if (acValue < 7) score -= (7 - acValue) * 10;

    const lastDigits = arrComb.map(n => n % 10);
    const digitCounts = {};
    let maxSameDigit = 0;
    lastDigits.forEach(d => { digitCounts[d] = (digitCounts[d] || 0) + 1; maxSameDigit = Math.max(maxSameDigit, digitCounts[d]); });
    if (maxSameDigit >= 3) score -= 40;

    const carryOver = arrComb.filter(n => latestWinningNumbers.includes(n)).length;
    if (carryOver > 2) score -= 30;

    const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43];
    const primeCount = arrComb.filter(n => primes.includes(n)).length;
    if (primeCount === 0 || primeCount > 3) score -= 10;
    const mul3Count = arrComb.filter(n => n % 3 === 0).length;
    if (mul3Count === 0 || mul3Count > 3) score -= 10;

    const sum = arrComb.reduce((a, b) => a + b, 0);
    const targetSum = 138.2;
    if (sum >= 108 && sum <= 168) {
      score -= 0;
    } else {
      const naturalStdDev = 30;
      const gaussianProb = Math.exp(-Math.pow(sum - targetSum, 2) / (2 * Math.pow(naturalStdDev, 2)));
      score -= (1 - gaussianProb) * 20;
      score -= 10;
    }

    if (score > 80 && score >= bestScoreThreshold) {
      topCombinations.push({ nums: arrComb, score, sum, ac: acValue });
      if (topCombinations.length > POOL_SIZE) {
        topCombinations.sort((a, b) => b.score - a.score);
        topCombinations.length = POOL_SIZE;
        bestScoreThreshold = topCombinations[topCombinations.length - 1].score;
      }
    }
  }

  self.postMessage({ type: 'progress', progress: 100 });
  const shuffledPool = shuffleArray(topCombinations);
  const finalResults = shuffledPool.slice(0, gameCount);
  finalResults.sort((a, b) => b.score - a.score);
  self.postMessage({ type: 'log', message: 'Top-Tier 풀(Pool) 생성 및 Fisher-Yates 셔플링 완료.' });
  self.postMessage({ type: 'complete', results: finalResults });
};
`;
}
