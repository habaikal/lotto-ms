import React, { useCallback, useState } from 'react';
import {
  Target, Activity, Radar, Sparkles,
  Download, Share2, RotateCcw,
  FileText, Clipboard, MessageSquareShare,
} from 'lucide-react';
import * as XLSX from 'xlsx';
import NumberBall from './NumberBall';
import Toast from './Toast';

/**
 * ResultPanel — 결과 대시보드 패널
 * 저장: Excel 파일 / 텍스트 파일
 * 공유: 클립보드 복사 / Web Share API (모바일 공유 시트)
 */
export default function ResultPanel({ results, isProcessing, progress, gameCount, onResetResults }) {
  // 토스트 알림 상태
  const [toast, setToast] = useState(null); // { message, type }

  /**
   * 토스트 표시 헬퍼
   */
  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  /* ── 결과 텍스트 생성 (공통 유틸) ─────────────────────── */
  const buildResultText = useCallback(() => {
    const header = `🍀 LOTTO GENIE PRO — 추천 번호 (${new Date().toLocaleDateString('ko-KR')})`;
    const lines = results.map(
      (res, idx) =>
        `${(idx + 1).toString().padStart(2, ' ')}. [${res.nums.join(' ')}]  SCORE:${res.score.toFixed(1)}  SUM:${res.sum}  AC:${res.ac}`
    );
    const footer = '* 본 번호는 통계 기반 엔터테인먼트 목적입니다. 당첨을 보장하지 않습니다.';
    return [header, '', ...lines, '', footer].join('\n');
  }, [results]);

  /* ── 1. Excel 저장 ──────────────────────────────────────── */
  const handleSaveToExcel = useCallback(() => {
    if (results.length === 0) return;

    try {
      const data = results.map((res, idx) => ({
        순위: idx + 1,
        번호: res.nums.join(', '),
        SCORE: res.score.toFixed(2),
        SUM: res.sum,
        'AC Val': res.ac,
        생성시간: new Date().toLocaleString('ko-KR'),
      }));

      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, '추천번호');

      // 열 너비 자동 조정
      ws['!cols'] = [
        { wch: 6 }, { wch: 22 }, { wch: 10 }, { wch: 8 }, { wch: 10 }, { wch: 22 },
      ];

      const filename = `로또추천번호_${new Date().toISOString().slice(0, 10)}.xlsx`;
      XLSX.writeFile(wb, filename);
      showToast(`✅ "${filename}" 저장 완료!`);
    } catch (err) {
      showToast('Excel 저장 중 오류가 발생했습니다.', 'error');
    }
  }, [results, showToast]);

  /* ── 2. 텍스트 파일 저장 ───────────────────────────────── */
  const handleSaveToText = useCallback(() => {
    if (results.length === 0) return;

    try {
      const text = buildResultText();
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `로또추천번호_${new Date().toISOString().slice(0, 10)}.txt`;
      a.click();
      URL.revokeObjectURL(url);
      showToast('📄 텍스트 파일 저장 완료!');
    } catch (err) {
      showToast('텍스트 저장 중 오류가 발생했습니다.', 'error');
    }
  }, [results, buildResultText, showToast]);

  /* ── 3. 클립보드 복사 ──────────────────────────────────── */
  const handleCopyToClipboard = useCallback(async () => {
    if (results.length === 0) return;

    const text = buildResultText();
    try {
      await navigator.clipboard.writeText(text);
      showToast('📋 번호가 클립보드에 복사됐어요!');
    } catch {
      // 폴백: execCommand
      try {
        const el = document.createElement('textarea');
        el.value = text;
        el.style.position = 'fixed';
        el.style.opacity = '0';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
        showToast('📋 클립보드 복사 완료!');
      } catch {
        showToast('복사 실패. 브라우저 권한을 확인하세요.', 'error');
      }
    }
  }, [results, buildResultText, showToast]);

  /* ── 4. 공유하기 (Web Share API — 모바일 공유 시트) ────── */
  const handleNativeShare = useCallback(async () => {
    if (results.length === 0) return;

    const text = buildResultText();

    // Web Share API 지원 여부 확인
    if (navigator.share) {
      try {
        await navigator.share({
          title: '🍀 LOTTO GENIE PRO 추천 번호',
          text,
        });
        showToast('공유 완료!');
      } catch (err) {
        // 사용자가 취소한 경우는 무시
        if (err.name !== 'AbortError') {
          showToast('공유 중 오류가 발생했습니다.', 'error');
        }
      }
    } else {
      // Web Share API 미지원 브라우저 → 클립보드 복사로 대체
      await handleCopyToClipboard();
      showToast('이 브라우저는 공유 기능을 미지원합니다. 클립보드에 복사했습니다.');
    }
  }, [results, buildResultText, handleCopyToClipboard, showToast]);

  return (
    <>
      {/* 토스트 알림 */}
      {toast && (
        <Toast
          key={toast.message + Date.now()}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

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
            <>
              <ResultList results={results} gameCount={gameCount} />

              {/* ── 액션 버튼 그룹 ─────────────────────────────── */}
              <div className="mt-6 space-y-3">
                {/* 저장 버튼들 */}
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-mono">💾 저장하기</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      id="btn-save-excel"
                      onClick={handleSaveToExcel}
                      className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-medium text-sm transition-all shadow-[0_0_12px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                      title="Excel(.xlsx) 파일로 저장"
                    >
                      <Download className="w-4 h-4" />
                      Excel 저장
                    </button>

                    <button
                      id="btn-save-text"
                      onClick={handleSaveToText}
                      className="flex items-center gap-2 px-4 py-2.5 bg-slate-600 hover:bg-slate-500 text-white rounded-xl font-medium text-sm transition-all hover:shadow-md"
                      title="텍스트(.txt) 파일로 저장"
                    >
                      <FileText className="w-4 h-4" />
                      텍스트 저장
                    </button>
                  </div>
                </div>

                {/* 전송 버튼들 */}
                <div>
                  <p className="text-xs text-slate-500 mb-2 font-mono">📤 전송하기</p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      id="btn-copy-clipboard"
                      onClick={handleCopyToClipboard}
                      className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium text-sm transition-all shadow-[0_0_12px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                      title="클립보드에 복사 (카카오톡, 문자 등에 붙여넣기)"
                    >
                      <Clipboard className="w-4 h-4" />
                      클립보드 복사
                    </button>

                    <button
                      id="btn-native-share"
                      onClick={handleNativeShare}
                      className="flex items-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl font-medium text-sm transition-all shadow-[0_0_12px_rgba(139,92,246,0.3)] hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                      title="공유하기 (카카오톡, 문자, 메일 등)"
                    >
                      <MessageSquareShare className="w-4 h-4" />
                      공유하기
                    </button>

                    <button
                      id="btn-reset"
                      onClick={onResetResults}
                      className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium text-sm transition-all"
                      title="결과 초기화"
                    >
                      <RotateCcw className="w-4 h-4" />
                      초기화
                    </button>
                  </div>
                </div>

                {/* 안내 문구 */}
                <p className="text-xs text-slate-600 font-mono pt-1">
                  💡 &quot;공유하기&quot;는 모바일에서 카카오톡·문자·메일 등으로 바로 전송할 수 있습니다.
                </p>
              </div>
            </>
          ) : (
            <EmptyState isProcessing={isProcessing} />
          )}
        </div>
      </div>
    </>
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
