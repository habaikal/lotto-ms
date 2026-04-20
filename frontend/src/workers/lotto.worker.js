/**
 * LOTTO GENIE PRO — Web Worker
 * 몬테카를로 시뮬레이션 엔진 + 15단계 Multi-Constraint 하이퍼 필터링
 * v4.6: Fisher-Yates 셔플링으로 138 독식 방지
 */

// Fisher-Yates 셔플 알고리즘
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

self.onmessage = function (e) {
  const { csvData, gameCount, simulationCount } = e.data;

  self.postMessage({
    type: 'log',
    message: `데이터 파이프라인 동기화 완료... (목표: ${simulationCount.toLocaleString()}회)`,
  });

  // ── 1. 역대 데이터 파싱 및 통계 분석 ──────────────────────────────
  const frequency = Array(46).fill(0);
  const lastDrawn = Array(46).fill(0);
  let latestWinningNumbers = [];

  csvData.forEach((row, idx) => {
    const parts = row.split(',').map(Number);
    if (idx === 0 && isNaN(parts[0])) return; // 헤더 스킵
    if (parts.length < 7 || isNaN(parts[1])) return;

    const nums = parts.slice(1, 7);
    if (idx === 1) latestWinningNumbers = [...nums]; // 최신 당첨 번호 저장

    nums.forEach((n) => {
      if (n >= 1 && n <= 45) {
        frequency[n]++;
        if (lastDrawn[n] === 0) lastDrawn[n] = idx; // 마지막 출현 회차
      }
    });
  });

  self.postMessage({
    type: 'log',
    message: 'PDF 가중치 초기화 및 시뮬레이션 엔진 점화...',
  });

  // ── 2. 확률 밀도 함수(PDF) 기반 가중치 세팅 ──────────────────────
  const weights = Array(46).fill(10);
  for (let i = 1; i <= 45; i++) {
    if (lastDrawn[i] >= 15) weights[i] += 30;                                   // Cold 번호 가중치 증가
    if (frequency[i] > (csvData.length * 6 / 45) * 1.2) weights[i] = Math.max(5, weights[i] - 10); // Hot 번호 감점
  }

  // 누적 가중치 배열 생성 (W-PRNG 추출용)
  const cumulativeWeights = [];
  let currentTotal = 0;
  for (let i = 1; i <= 45; i++) {
    currentTotal += weights[i];
    cumulativeWeights.push(currentTotal);
  }
  const maxWeight = currentTotal;

  const topCombinations = [];
  let bestScoreThreshold = 0;
  const POOL_SIZE = 1000; // 엘리트 풀 크기

  // ── 3. 100만회 몬테카를로 루프 ───────────────────────────────────
  for (let i = 0; i < simulationCount; i++) {
    if (i % 50000 === 0) {
      self.postMessage({ type: 'progress', progress: (i / simulationCount) * 100 });
    }

    // W-PRNG 기반 번호 추출
    const comb = new Set();
    while (comb.size < 6) {
      const rand = Math.random() * maxWeight;
      let selectedNum = 1;
      for (let j = 0; j < 45; j++) {
        if (rand <= cumulativeWeights[j]) {
          selectedNum = j + 1;
          break;
        }
      }
      comb.add(selectedNum);
    }

    const arrComb = Array.from(comb).sort((a, b) => a - b);

    // ── Multi-Constraint Scoring ──────────────────────────────────
    let score = 100;

    // Filter 8: 연속 번호 (4개 이상 시 제거)
    let consec = 1;
    let maxConsec = 1;
    for (let j = 1; j < 6; j++) {
      if (arrComb[j] === arrComb[j - 1] + 1) {
        consec++;
        maxConsec = Math.max(maxConsec, consec);
      } else {
        consec = 1;
      }
    }
    if (maxConsec >= 4) continue;
    if (maxConsec === 3) score -= 15;

    // Filter 10: 홀짝 비율
    const oddCount = arrComb.filter((n) => n % 2 !== 0).length;
    if (oddCount === 0 || oddCount === 6) score -= 30;
    else if (oddCount === 1 || oddCount === 5) score -= 15;

    // Filter 11: 저고 비율 (1~22 / 23~45)
    const highCount = arrComb.filter((n) => n > 22).length;
    if (highCount === 0 || highCount === 6) score -= 30;
    else if (highCount === 1 || highCount === 5) score -= 15;

    // Filter 12: AC Value (번호 간 차이 다양성)
    const diffs = new Set();
    for (let x = 0; x < 5; x++) {
      for (let y = x + 1; y < 6; y++) {
        diffs.add(arrComb[y] - arrComb[x]);
      }
    }
    const acValue = diffs.size - 5;
    if (acValue < 7) score -= (7 - acValue) * 10;

    // Filter 13: 동일 끝수 (3개 이상 시 감점)
    const lastDigits = arrComb.map((n) => n % 10);
    const digitCounts = {};
    let maxSameDigit = 0;
    lastDigits.forEach((d) => {
      digitCounts[d] = (digitCounts[d] || 0) + 1;
      maxSameDigit = Math.max(maxSameDigit, digitCounts[d]);
    });
    if (maxSameDigit >= 3) score -= 40;

    // Filter 14: 이월수 (최근 당첨 번호 2개 초과 포함 시 감점)
    const carryOver = arrComb.filter((n) => latestWinningNumbers.includes(n)).length;
    if (carryOver > 2) score -= 30;

    // Filter 15: 소수 / 3의 배수 비율
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];
    const primeCount = arrComb.filter((n) => primes.includes(n)).length;
    if (primeCount === 0 || primeCount > 3) score -= 10;
    const mul3Count = arrComb.filter((n) => n % 3 === 0).length;
    if (mul3Count === 0 || mul3Count > 3) score -= 10;

    // Filter 4: 역대 평균 합계 — 골든존(108~168)
    const sum = arrComb.reduce((a, b) => a + b, 0);
    const targetSum = 138.2;

    if (sum >= 108 && sum <= 168) {
      score -= 0; // 골든존 내에서는 동일 가중치
    } else {
      const naturalStdDev = 30;
      const gaussianProb = Math.exp(
        -Math.pow(sum - targetSum, 2) / (2 * Math.pow(naturalStdDev, 2))
      );
      score -= (1 - gaussianProb) * 20;
      score -= 10;
    }

    // 엘리트 풀 관리 (상위 1,000개 유지)
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

  // ── 4. Fisher-Yates 셔플링으로 138 독식 편향 제거 ───────────────
  const shuffledPool = shuffleArray(topCombinations);
  const finalResults = shuffledPool.slice(0, gameCount);
  finalResults.sort((a, b) => b.score - a.score);

  self.postMessage({
    type: 'log',
    message: 'Top-Tier 풀(Pool) 생성 및 Fisher-Yates 셔플링 완료.',
  });

  self.postMessage({ type: 'complete', results: finalResults });
};
