/**
 * lottoService.js — 서버사이드 로또 시뮬레이션 서비스
 * Node.js 동기 실행 (소규모 시뮬레이션용)
 */

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * CSV 라인 배열을 파싱하여 번호 통계 반환
 */
function parseCsvLines(lines) {
  const frequency = Array(46).fill(0);
  const lastDrawn = Array(46).fill(0);
  let latestWinningNumbers = [];

  lines.forEach((row, idx) => {
    const parts = row.split(',').map(Number);
    if (idx === 0 && isNaN(parts[0])) return;
    if (parts.length < 7 || isNaN(parts[1])) return;

    const nums = parts.slice(1, 7);
    if (idx === 1) latestWinningNumbers = [...nums];

    nums.forEach((n) => {
      if (n >= 1 && n <= 45) {
        frequency[n]++;
        if (lastDrawn[n] === 0) lastDrawn[n] = idx;
      }
    });
  });

  return { frequency, lastDrawn, latestWinningNumbers, totalRounds: lines.length - 1 };
}

/**
 * 몬테카를로 시뮬레이션 실행
 * @param {{ csvLines: string[], gameCount: number, simulationCount: number }}
 * @returns {Promise<Array>}
 */
export async function runSimulation({ csvLines, gameCount, simulationCount }) {
  const { frequency, lastDrawn, latestWinningNumbers, totalRounds } = parseCsvLines(csvLines);

  // PDF 가중치 세팅
  const weights = Array(46).fill(10);
  for (let i = 1; i <= 45; i++) {
    if (lastDrawn[i] >= 15) weights[i] += 30;
    if (frequency[i] > (totalRounds * 6 / 45) * 1.2) weights[i] = Math.max(5, weights[i] - 10);
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
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43];

  for (let i = 0; i < simulationCount; i++) {
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

    // Filter 8: 연속 번호
    let consec = 1, maxConsec = 1;
    for (let j = 1; j < 6; j++) {
      if (arrComb[j] === arrComb[j - 1] + 1) { consec++; maxConsec = Math.max(maxConsec, consec); }
      else consec = 1;
    }
    if (maxConsec >= 4) continue;
    if (maxConsec === 3) score -= 15;

    // Filter 10: 홀짝 비율
    const oddCount = arrComb.filter((n) => n % 2 !== 0).length;
    if (oddCount === 0 || oddCount === 6) score -= 30;
    else if (oddCount === 1 || oddCount === 5) score -= 15;

    // Filter 11: 저고 비율
    const highCount = arrComb.filter((n) => n > 22).length;
    if (highCount === 0 || highCount === 6) score -= 30;
    else if (highCount === 1 || highCount === 5) score -= 15;

    // Filter 12: AC Value
    const diffs = new Set();
    for (let x = 0; x < 5; x++) for (let y = x + 1; y < 6; y++) diffs.add(arrComb[y] - arrComb[x]);
    const acValue = diffs.size - 5;
    if (acValue < 7) score -= (7 - acValue) * 10;

    // Filter 13: 동일 끝수
    const digitCounts = {};
    let maxSameDigit = 0;
    arrComb.forEach((n) => {
      const d = n % 10;
      digitCounts[d] = (digitCounts[d] || 0) + 1;
      maxSameDigit = Math.max(maxSameDigit, digitCounts[d]);
    });
    if (maxSameDigit >= 3) score -= 40;

    // Filter 14: 이월수
    const carryOver = arrComb.filter((n) => latestWinningNumbers.includes(n)).length;
    if (carryOver > 2) score -= 30;

    // Filter 15: 소수/3배수
    const primeCount = arrComb.filter((n) => primes.includes(n)).length;
    if (primeCount === 0 || primeCount > 3) score -= 10;
    const mul3Count = arrComb.filter((n) => n % 3 === 0).length;
    if (mul3Count === 0 || mul3Count > 3) score -= 10;

    // Filter 4: 합계 골든존
    const sum = arrComb.reduce((a, b) => a + b, 0);
    if (sum < 108 || sum > 168) {
      const gaussianProb = Math.exp(-Math.pow(sum - 138.2, 2) / (2 * Math.pow(30, 2)));
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

  const shuffled = shuffleArray(topCombinations);
  const final = shuffled.slice(0, gameCount);
  final.sort((a, b) => b.score - a.score);
  return final;
}

/**
 * CSV 통계 분석
 */
export function getStats(csvLines) {
  const { frequency, lastDrawn, totalRounds } = parseCsvLines(csvLines);
  const stats = [];
  for (let i = 1; i <= 45; i++) {
    stats.push({
      number: i,
      frequency: frequency[i],
      lastDrawnAgo: lastDrawn[i],
      percentage: ((frequency[i] / (totalRounds * 6)) * 100).toFixed(2),
    });
  }
  return { totalRounds, numbers: stats };
}
