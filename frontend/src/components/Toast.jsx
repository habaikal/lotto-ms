import React, { useEffect, useState } from 'react';
import { CheckCircle2, XCircle, X } from 'lucide-react';

/**
 * Toast — 저장/공유 완료 시 화면 우하단에 잠깐 표시되는 알림 컴포넌트
 * @param {string} message - 표시할 메시지
 * @param {'success'|'error'} type - 알림 유형
 * @param {Function} onClose - 닫기 콜백
 */
export default function Toast({ message, type = 'success', onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 마운트 후 애니메이션 진입
    const showTimer = setTimeout(() => setVisible(true), 10);
    // 2.8초 후 자동 퇴장 애니메이션
    const hideTimer = setTimeout(() => {
      setVisible(false);
      // 애니메이션 종료 후 언마운트
      setTimeout(onClose, 400);
    }, 2800);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  const isSuccess = type === 'success';

  return (
    <div
      role="alert"
      aria-live="polite"
      style={{
        transform: visible ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.95)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
      className={`
        fixed bottom-6 right-6 z-50 flex items-center gap-3
        px-5 py-3.5 rounded-2xl shadow-2xl border backdrop-blur-md
        ${isSuccess
          ? 'bg-emerald-950/90 border-emerald-700/60 text-emerald-300'
          : 'bg-red-950/90 border-red-700/60 text-red-300'
        }
      `}
    >
      {/* 아이콘 */}
      {isSuccess
        ? <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
        : <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
      }

      {/* 메시지 */}
      <span className="text-sm font-medium">{message}</span>

      {/* 닫기 버튼 */}
      <button
        onClick={() => { setVisible(false); setTimeout(onClose, 400); }}
        className="ml-2 text-slate-500 hover:text-slate-300 transition-colors"
        aria-label="알림 닫기"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
