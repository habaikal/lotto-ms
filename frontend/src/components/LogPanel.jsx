import React, { useRef, useEffect } from 'react';
import { TerminalSquare } from 'lucide-react';

/**
 * LogPanel — 시스템 로그 콘솔 패널
 */
export default function LogPanel({ logs }) {
  const logContainerRef = useRef(null);

  // 새 로그가 추가될 때마다 자동 스크롤
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex-1 min-h-[250px] flex flex-col">
      <h3 className="text-xs font-bold text-slate-500 mb-2 flex items-center gap-2 uppercase tracking-wider">
        <TerminalSquare className="w-4 h-4" />
        System Logs
      </h3>

      <div
        ref={logContainerRef}
        className="log-container"
        role="log"
        aria-live="polite"
        aria-label="시스템 로그"
      >
        {logs.length === 0 ? (
          <div className="text-slate-600 italic">시스템 대기 중...</div>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className={
                log.includes('완료') || log.includes('✓')
                  ? 'text-emerald-400'
                  : log.includes('[ERROR]')
                  ? 'text-red-400'
                  : ''
              }
            >
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
