import React from 'react';
import { Target, Activity, Radar, Sparkles } from 'lucide-react';
import NumberBall from './NumberBall';

/**
 * ResultPanel — 결과 대시보드 패널
 */
export default function ResultPanel({ results, isProcessing, progress, gameCount }) {
  return (
    <div className="card relative overflow-hidden">
      {/* 진행률 바 */}
      {isProcessing && (
        <div
          className="progress-bar"
          style={{ width: `${progress}%` }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      )}

      {/* 헤더 */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Target className="w-6 h-6 text-cyan-400" />
          연산 대시보드
        </h2>
        <div className="text-right">
          <div className="text-sm text-slate-400">Monte Carlo Progress</div>
          <div className="text-2xl font-black font-mono text-cyan-400">{progress}%</div>
        </div>
      </div>

      {/* 결과 영역 */}
      <div className="min-h-[400px] flex flex-col">
        {results.length > 0 ? (
          <ResultList results={results} gameCount={gameCount} />
        ) : (
          <EmptyState isProcessing={isProcessing} />
        )}
      </div>
    </div>
  );
}

/* ─── 결과 목록 ──────────────────────────────────────────────── */
function ResultList({ results, gameCount }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-emerald-400 mb-4 bg-emerald-950/30 p-3 rounded-lg border border-emerald-900/50">
        <Sparkles className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium text-sm">
          상위 {gameCount}개 조합 추출 완료 (Fisher-Yates 셔플링 적용)
        </span>
      </div>

      {results.map((res, idx) => (
        <ResultCard key={idx} res={res} idx={idx} />
      ))}
    </div>
  );
}

function ResultCard({ res, idx }) {
  const isGoldenZone = res.sum >= 108 && res.sum <= 168;

  return (
    <div className="result-card group">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* 번호볼 */}
        <div className="flex items-center gap-3">
          <div className="text-slate-500 font-mono font-bold w-6 text-right">
            #{(idx + 1).toString().padStart(2, '0')}
          </div>
          <div className="flex gap-2">
            {res.nums.map((num, nIdx) => (
              <NumberBall key={nIdx} num={num} />
            ))}
          </div>
        </div>

        {/* 메타 정보 */}
        <div className="flex gap-4 text-xs font-mono text-slate-400 bg-slate-900 p-2 rounded-lg border border-slate-800 group-hover:border-slate-700">
          <MetaItem label="SCORE" value={res.score.toFixed(1)} className="text-cyan-400" />
          <div className="w-px bg-slate-800" />
          <MetaItem
            label="SUM"
            value={res.sum}
            className={isGoldenZone ? 'text-emerald-400' : 'text-yellow-500'}
          />
          <div className="w-px bg-slate-800" />
          <MetaItem label="AC Val" value={res.ac} className="text-white" />
        </div>
      </div>
    </div>
  );
}

function MetaItem({ label, value, className }) {
  return (
    <div className="flex flex-col items-center">
      <span className="text-slate-500">{label}</span>
      <span className={`font-bold ${className}`}>{value}</span>
    </div>
  );
}

/* ─── 빈 상태 (대기 / 처리 중) ──────────────────────────────── */
function EmptyState({ isProcessing }) {
  if (isProcessing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/30">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-slate-800 rounded-full" />
          <div className="spinner-ring" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Activity className="w-8 h-8 text-cyan-400 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <div className="flex items-center gap-2 text-cyan-400 bg-cyan-950/30 px-4 py-2 rounded-full border border-cyan-900 font-mono text-sm shadow-[0_0_10px_rgba(6,182,212,0.2)]">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500" />
            </span>
            <span>HYPER-FILTERING ENGINE RUNNING</span>
          </div>
          <h4 className="text-lg font-bold text-white tracking-wide">QUANTUM SOLVING</h4>
          <p className="text-xs font-mono text-cyan-400/80 mt-1">
            Applying Fisher-Yates Elite Pool Shuffling...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/30 py-16">
      <Radar className="w-12 h-12 mb-4 text-slate-700" />
      <h4 className="text-base font-bold text-white mb-2">대기 중 (IDLE)</h4>
      <p className="max-w-sm mx-auto text-xs text-center leading-relaxed text-slate-500">
        CSV 데이터를 업로드하고 좌측 패널에서 연산 깊이를 설정한 후<br />
        시뮬레이션을 시작하십시오.
      </p>
    </div>
  );
}
