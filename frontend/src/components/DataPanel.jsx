import React from 'react';
import { Database, Download } from 'lucide-react';

/**
 * DataPanel — CSV 업로드 패널
 */
export default function DataPanel({ csvData, onFileUpload }) {
  const count = csvData.length > 0 ? csvData.length - 1 : 0; // 헤더 제외

  return (
    <div className="card">
      <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
        <Database className="w-5 h-5 text-blue-400" />
        데이터 소스 연동
      </h2>

      <div className="flex flex-col gap-3">
        <label
          htmlFor="csv-upload"
          className="relative flex flex-col items-center justify-center w-full h-24
                     border-2 border-dashed border-slate-700 hover:border-cyan-500
                     rounded-xl cursor-pointer transition-colors bg-slate-950/50
                     group"
        >
          <span className="flex items-center gap-2 text-sm text-slate-400 group-hover:text-cyan-400 transition-colors">
            <Download className="w-5 h-5" />
            {csvData.length > 0 ? '데이터 재업로드' : 'lotto_results.csv 업로드'}
          </span>
          <span className="text-xs text-slate-600 mt-1">클릭 또는 드래그 앤 드롭</span>
          <input
            id="csv-upload"
            type="file"
            accept=".csv"
            className="hidden"
            onChange={onFileUpload}
            aria-label="CSV 파일 업로드"
          />
        </label>

        {csvData.length > 0 && (
          <div className="text-xs text-center text-emerald-400 font-mono bg-emerald-950/20 py-2 rounded-lg border border-emerald-900/30">
            ✓ {count}회차 데이터 로드됨
          </div>
        )}

        <div className="text-xs text-slate-600 leading-relaxed">
          <p className="font-mono">형식: 회차,번호1,...,번호6,보너스</p>
          <p className="mt-0.5">동행복권 공식 CSV 또는 동일 포맷</p>
        </div>
      </div>
    </div>
  );
}
