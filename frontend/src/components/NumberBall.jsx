import React from 'react';

/**
 * NumberBall — 로또 번호 볼 (색상 범위별 구분)
 * 1~10:  노란색
 * 11~20: 파란색
 * 21~30: 빨간색
 * 31~40: 회색
 * 41~45: 초록색
 */
export default function NumberBall({ num }) {
  const colorClass = getColorClass(num);

  return (
    <div
      className={`number-ball ${colorClass}`}
      aria-label={`번호 ${num}`}
      title={`번호 ${num}`}
    >
      {num}
    </div>
  );
}

function getColorClass(num) {
  if (num <= 10) return 'bg-yellow-500 text-yellow-950';
  if (num <= 20) return 'bg-blue-500 text-blue-50';
  if (num <= 30) return 'bg-red-500 text-red-50';
  if (num <= 40) return 'bg-slate-500 text-slate-50';
  return 'bg-green-500 text-green-950';
}
