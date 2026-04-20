import React from 'react';
import { Cpu, ShieldCheck } from 'lucide-react';

/**
 * Header — 앱 상단 헤더
 */
export default function Header() {
  return (
    <header className="w-full max-w-6xl mb-8 flex flex-col md:flex-row items-center justify-between border-b border-cyan-900/50 pb-6">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500 flex items-center justify-center glow-cyan">
          <Cpu className="text-cyan-400 w-7 h-7" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-gradient-cyan tracking-wider">
            LOTTO GENIE PRO{' '}
            <span className="text-sm font-medium text-cyan-200 ml-2 px-2 py-0.5 border border-cyan-700 rounded bg-cyan-950/50">
              v4.6
            </span>
          </h1>
          <p className="text-sm text-slate-400">
            Quantum-Genetic Engine · 15-Filter · Monte Carlo × Fisher-Yates
          </p>
        </div>
      </div>

      <div className="mt-4 md:mt-0 flex gap-4">
        <div className="badge-secure">
          <ShieldCheck className="w-4 h-4" />
          ALGO-SHIELD SECURE
        </div>
      </div>
    </header>
  );
}
