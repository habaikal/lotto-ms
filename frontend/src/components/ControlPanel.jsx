import React from 'react';
import { Settings, Zap, StopCircle } from 'lucide-react';

/**
 * ControlPanel — 시뮬레이션 파라미터 설정 패널
 */
export default function ControlPanel({
  simulationCount,
  gameCount,
  isProcessing,
  csvLoaded,
  onSimulationCountChange,
  onGameCountChange,
  onStart,
  onStop,
}) {
  return (
    <div className="card">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Settings className="w-5 h-5 text-purple-400" />
        파라미터 설정
      </h2>

      <div className="space-y-5">
        {/* 시뮬레이션 횟수 */}
        <div>
          <label className="flex justify-between text-sm text-slate-300 mb-2">
            <span>시뮬레이션 횟수</span>
            <span className="font-mono text-cyan-400">{simulationCount.toLocaleString()} 회</span>
          </label>
          <input
            id="sim-count-slider"
            type="range"
            min="100000"
            max="2000000"
            step="100000"
            value={simulationCount}
            onChange={(e) => onSimulationCountChange(Number(e.target.value))}
            disabled={isProcessing}
            aria-label="시뮬레이션 횟수"
          />
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>10만</span>
            <span>200만</span>
          </div>
        </div>

        {/* 추출 조합 수 */}
        <div>
          <label className="flex justify-between text-sm text-slate-300 mb-2">
            <span>추출 조합 수</span>
            <span className="font-mono text-cyan-400">{gameCount} 게임</span>
          </label>
          <input
            id="game-count-slider"
            type="range"
            min="1"
            max="50"
            step="1"
            value={gameCount}
            onChange={(e) => onGameCountChange(Number(e.target.value))}
            disabled={isProcessing}
            aria-label="추출 조합 수"
          />
          <div className="flex justify-between text-xs text-slate-600 mt-1">
            <span>1게임</span>
            <span>50게임</span>
          </div>
        </div>
      </div>

      <div className="mt-6">
        {!isProcessing ? (
          <button
            id="start-btn"
            onClick={onStart}
            disabled={!csvLoaded}
            className="btn-primary"
            aria-label="퀀텀 필터링 시뮬레이션 시작"
          >
            <Zap className="w-5 h-5" />
            퀀텀 필터링 시작
          </button>
        ) : (
          <button
            id="stop-btn"
            onClick={onStop}
            className="btn-danger"
            aria-label="시뮬레이션 강제 종료"
          >
            <StopCircle className="w-5 h-5" />
            연산 강제 종료
          </button>
        )}
      </div>

      {/* 알고리즘 정보 */}
      <div className="mt-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800">
        <div className="text-xs text-slate-500 space-y-1">
          <div className="flex justify-between">
            <span>필터 단계</span>
            <span className="text-cyan-500 font-mono">15 단계</span>
          </div>
          <div className="flex justify-between">
            <span>엘리트 풀</span>
            <span className="text-cyan-500 font-mono">Top 1,000</span>
          </div>
          <div className="flex justify-between">
            <span>셔플 방식</span>
            <span className="text-cyan-500 font-mono">Fisher-Yates</span>
          </div>
        </div>
      </div>
    </div>
  );
}
