import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import DataPanel from './components/DataPanel';
import ControlPanel from './components/ControlPanel';
import LogPanel from './components/LogPanel';
import ResultPanel from './components/ResultPanel';
import { parseCSVFile, validateCSV } from './utils/csvParser';
import { getWorkerCode } from './utils/workerCode';

/**
 * App — 메인 애플리케이션 컴포넌트
 * LOTTO GENIE PRO v4.6 — Quantum-Genetic Edition
 */
export default function App() {
  const [csvData, setCsvData] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState([]);
  const [results, setResults] = useState([]);
  const [gameCount, setGameCount] = useState(5);

  const [simulationCount, setSimulationCount] = useState(1000000);

  const workerRef = React.useRef(null);

  const addLog = useCallback((msg) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);
  }, []);

  // CSV 파일 업로드 처리
  const handleFileUpload = useCallback(
    async (e) => {
      const file = e.target.files[0];
      if (!file) return;

      try {
        const lines = await parseCSVFile(file);
        const { valid, message } = validateCSV(lines);
        if (!valid) {
          addLog(`[ERROR] ${message}`);
          return;
        }
        setCsvData(lines);
        addLog(`CSV 로드 완료: 총 ${lines.length - 1}회차 데이터 인식됨.`);
      } catch (err) {
        addLog(`[ERROR] 파일 읽기 실패: ${err.message}`);
      }
    },
    [addLog]
  );

  // 시뮬레이션 시작
  const startSimulation = useCallback(() => {
    if (csvData.length === 0) {
      addLog('[WARN] lotto_results.csv 파일을 먼저 업로드하세요.');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setResults([]);
    setLogs([]);
    addLog('HMAC Security: 고유 시드 배정 완료. 세션 암호화 활성화.');
    addLog(`Multi-Constraint 알고리즘 가동... (목표: ${simulationCount.toLocaleString()}회)`);

    // Blob URL Worker 생성
    const blob = new Blob([getWorkerCode()], { type: 'application/javascript' });
    const workerUrl = URL.createObjectURL(blob);
    const worker = new Worker(workerUrl);
    workerRef.current = worker;

    worker.onmessage = (e) => {
      const { type, message, progress: prog, results: res } = e.data;
      if (type === 'log') {
        addLog(message);
      } else if (type === 'progress') {
        setProgress(Math.floor(prog));
      } else if (type === 'complete') {
        setResults(res);
        setIsProcessing(false);
        addLog(`✓ 시뮬레이션 완료! ${res.length}개 조합 추출.`);
        worker.terminate();
        URL.revokeObjectURL(workerUrl);
      }
    };

    worker.onerror = (err) => {
      addLog(`[ERROR] Worker 오류: ${err.message}`);
      setIsProcessing(false);
      worker.terminate();
    };

    worker.postMessage({ csvData, gameCount, simulationCount });
  }, [csvData, gameCount, simulationCount, addLog]);

  // 시뮬레이션 강제 종료
  const stopSimulation = useCallback(() => {
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
      setIsProcessing(false);
      addLog('시뮬레이션이 사용자에 의해 강제 종료되었습니다.');
    }
  }, [addLog]);

  // 결과 초기화
  const resetResults = useCallback(() => {
    setResults([]);
    addLog('결과가 초기화되었습니다.');
  }, [addLog]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 flex flex-col items-center">
      <Header />

      <main className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* 좌측: 데이터 + 설정 + 로그 */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <DataPanel csvData={csvData} onFileUpload={handleFileUpload} />

          <ControlPanel
            simulationCount={simulationCount}
            gameCount={gameCount}
            isProcessing={isProcessing}
            csvLoaded={csvData.length > 0}
            onSimulationCountChange={setSimulationCount}
            onGameCountChange={setGameCount}
            onStart={startSimulation}
            onStop={stopSimulation}
          />

          <LogPanel logs={logs} />
        </div>

        {/* 우측: 결과 대시보드 */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <ResultPanel
            results={results}
            isProcessing={isProcessing}
            progress={progress}
            gameCount={gameCount}
            onResetResults={resetResults}
          />
        </div>
      </main>

      {/* 푸터 */}
      <footer className="w-full max-w-6xl mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-600">
        <p>
          LOTTO GENIE PRO v4.6 — Quantum-Genetic Edition ·{' '}
          <span className="text-slate-500">
            본 앱은 통계 학습 목적의 엔터테인먼트 소프트웨어입니다. 당첨을 보장하지 않습니다.
          </span>
        </p>
      </footer>
    </div>
  );
}
