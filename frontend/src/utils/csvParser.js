/**
 * CSV 파서 유틸리티
 * lotto_results.csv: 회차,번호1,번호2,번호3,번호4,번호5,번호6,보너스
 */

/**
 * 파일 → 라인 배열로 파싱
 * @param {File} file
 * @returns {Promise<string[]>}
 */
export function parseCSVFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text
        .split('\n')
        .map((l) => l.trim())
        .filter((l) => l !== '');
      resolve(lines);
    };
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsText(file, 'utf-8');
  });
}

/**
 * 라인 배열 → 구조화된 객체 배열
 * @param {string[]} lines
 * @returns {{ round: number, nums: number[], bonus: number }[]}
 */
export function parseCSVLines(lines) {
  const result = [];
  for (let i = 0; i < lines.length; i++) {
    const parts = lines[i].split(',').map(Number);
    if (i === 0 && isNaN(parts[0])) continue; // 헤더 스킵
    if (parts.length < 7 || isNaN(parts[1])) continue;
    result.push({
      round: parts[0],
      nums: parts.slice(1, 7),
      bonus: parts[7] ?? null,
    });
  }
  return result;
}

/**
 * CSV 데이터 유효성 검사
 * @param {string[]} lines
 * @returns {{ valid: boolean; message: string }}
 */
export function validateCSV(lines) {
  if (!lines || lines.length === 0) {
    return { valid: false, message: 'CSV 파일이 비어 있습니다.' };
  }
  const dataLines = lines.filter((_, i) => {
    const parts = lines[i].split(',').map(Number);
    return !(i === 0 && isNaN(parts[0]));
  });
  if (dataLines.length < 10) {
    return { valid: false, message: '최소 10회차 이상의 데이터가 필요합니다.' };
  }
  return { valid: true, message: `${dataLines.length}회차 데이터 확인됨` };
}
