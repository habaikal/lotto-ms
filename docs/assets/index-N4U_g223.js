import{r as o,C as I,S as A,D as $,a as F,b as U,Z as V,c as W,d as G,T as Y,e as q,A as Z,R as H,f as R}from"./icons-BPpCDSnd.js";import{r as B}from"./vendor-DeMfpQ9w.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const n of l)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&a(c)}).observe(document,{childList:!0,subtree:!0});function r(l){const n={};return l.integrity&&(n.integrity=l.integrity),l.referrerPolicy&&(n.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?n.credentials="include":l.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function a(l){if(l.ep)return;l.ep=!0;const n=r(l);fetch(l.href,n)}})();var E={exports:{}},N={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Q=o,z=Symbol.for("react.element"),J=Symbol.for("react.fragment"),K=Object.prototype.hasOwnProperty,X=Q.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,ee={key:!0,ref:!0,__self:!0,__source:!0};function O(s,t,r){var a,l={},n=null,c=null;r!==void 0&&(n=""+r),t.key!==void 0&&(n=""+t.key),t.ref!==void 0&&(c=t.ref);for(a in t)K.call(t,a)&&!ee.hasOwnProperty(a)&&(l[a]=t[a]);if(s&&s.defaultProps)for(a in t=s.defaultProps,t)l[a]===void 0&&(l[a]=t[a]);return{$$typeof:z,type:s,key:n,ref:c,props:l,_owner:X.current}}N.Fragment=J;N.jsx=O;N.jsxs=O;E.exports=N;var e=E.exports,v={},S=B;v.createRoot=S.createRoot,v.hydrateRoot=S.hydrateRoot;function se(){return e.jsxs("header",{className:"w-full max-w-6xl mb-8 flex flex-col md:flex-row items-center justify-between border-b border-cyan-900/50 pb-6",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsx("div",{className:"w-12 h-12 rounded-xl bg-cyan-950 border border-cyan-500 flex items-center justify-center glow-cyan",children:e.jsx(I,{className:"text-cyan-400 w-7 h-7"})}),e.jsxs("div",{children:[e.jsxs("h1",{className:"text-2xl font-black text-gradient-cyan tracking-wider",children:["LOTTO GENIE PRO"," ",e.jsx("span",{className:"text-sm font-medium text-cyan-200 ml-2 px-2 py-0.5 border border-cyan-700 rounded bg-cyan-950/50",children:"v4.6"})]}),e.jsx("p",{className:"text-sm text-slate-400",children:"Quantum-Genetic Engine · 15-Filter · Monte Carlo × Fisher-Yates"})]})]}),e.jsx("div",{className:"mt-4 md:mt-0 flex gap-4",children:e.jsxs("div",{className:"badge-secure",children:[e.jsx(A,{className:"w-4 h-4"}),"ALGO-SHIELD SECURE"]})})]})}function te({csvData:s,onFileUpload:t}){const r=s.length>0?s.length-1:0;return e.jsxs("div",{className:"card",children:[e.jsxs("h2",{className:"text-lg font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx($,{className:"w-5 h-5 text-blue-400"}),"데이터 소스 연동"]}),e.jsxs("div",{className:"flex flex-col gap-3",children:[e.jsxs("label",{htmlFor:"csv-upload",className:`relative flex flex-col items-center justify-center w-full h-24
                     border-2 border-dashed border-slate-700 hover:border-cyan-500
                     rounded-xl cursor-pointer transition-colors bg-slate-950/50
                     group`,children:[e.jsxs("span",{className:"flex items-center gap-2 text-sm text-slate-400 group-hover:text-cyan-400 transition-colors",children:[e.jsx(F,{className:"w-5 h-5"}),s.length>0?"데이터 재업로드":"lotto_results.csv 업로드"]}),e.jsx("span",{className:"text-xs text-slate-600 mt-1",children:"클릭 또는 드래그 앤 드롭"}),e.jsx("input",{id:"csv-upload",type:"file",accept:".csv",className:"hidden",onChange:t,"aria-label":"CSV 파일 업로드"})]}),s.length>0&&e.jsxs("div",{className:"text-xs text-center text-emerald-400 font-mono bg-emerald-950/20 py-2 rounded-lg border border-emerald-900/30",children:["✓ ",r,"회차 데이터 로드됨"]}),e.jsxs("div",{className:"text-xs text-slate-600 leading-relaxed",children:[e.jsx("p",{className:"font-mono",children:"형식: 회차,번호1,...,번호6,보너스"}),e.jsx("p",{className:"mt-0.5",children:"동행복권 공식 CSV 또는 동일 포맷"})]})]})]})}function ae({simulationCount:s,gameCount:t,isProcessing:r,csvLoaded:a,onSimulationCountChange:l,onGameCountChange:n,onStart:c,onStop:m}){return e.jsxs("div",{className:"card",children:[e.jsxs("h2",{className:"text-lg font-bold text-white mb-4 flex items-center gap-2",children:[e.jsx(U,{className:"w-5 h-5 text-purple-400"}),"파라미터 설정"]}),e.jsxs("div",{className:"space-y-5",children:[e.jsxs("div",{children:[e.jsxs("label",{className:"flex justify-between text-sm text-slate-300 mb-2",children:[e.jsx("span",{children:"시뮬레이션 횟수"}),e.jsxs("span",{className:"font-mono text-cyan-400",children:[s.toLocaleString()," 회"]})]}),e.jsx("input",{id:"sim-count-slider",type:"range",min:"100000",max:"2000000",step:"100000",value:s,onChange:u=>l(Number(u.target.value)),disabled:r,"aria-label":"시뮬레이션 횟수"}),e.jsxs("div",{className:"flex justify-between text-xs text-slate-600 mt-1",children:[e.jsx("span",{children:"10만"}),e.jsx("span",{children:"200만"})]})]}),e.jsxs("div",{children:[e.jsxs("label",{className:"flex justify-between text-sm text-slate-300 mb-2",children:[e.jsx("span",{children:"추출 조합 수"}),e.jsxs("span",{className:"font-mono text-cyan-400",children:[t," 게임"]})]}),e.jsx("input",{id:"game-count-slider",type:"range",min:"1",max:"50",step:"1",value:t,onChange:u=>n(Number(u.target.value)),disabled:r,"aria-label":"추출 조합 수"}),e.jsxs("div",{className:"flex justify-between text-xs text-slate-600 mt-1",children:[e.jsx("span",{children:"1게임"}),e.jsx("span",{children:"50게임"})]})]})]}),e.jsx("div",{className:"mt-6",children:r?e.jsxs("button",{id:"stop-btn",onClick:m,className:"btn-danger","aria-label":"시뮬레이션 강제 종료",children:[e.jsx(W,{className:"w-5 h-5"}),"연산 강제 종료"]}):e.jsxs("button",{id:"start-btn",onClick:c,disabled:!a,className:"btn-primary","aria-label":"퀀텀 필터링 시뮬레이션 시작",children:[e.jsx(V,{className:"w-5 h-5"}),"퀀텀 필터링 시작"]})}),e.jsx("div",{className:"mt-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800",children:e.jsxs("div",{className:"text-xs text-slate-500 space-y-1",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"필터 단계"}),e.jsx("span",{className:"text-cyan-500 font-mono",children:"15 단계"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"엘리트 풀"}),e.jsx("span",{className:"text-cyan-500 font-mono",children:"Top 1,000"})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{children:"셔플 방식"}),e.jsx("span",{className:"text-cyan-500 font-mono",children:"Fisher-Yates"})]})]})})]})}function re({logs:s}){const t=o.useRef(null);return o.useEffect(()=>{t.current&&(t.current.scrollTop=t.current.scrollHeight)},[s]),e.jsxs("div",{className:"bg-slate-950 border border-slate-800 rounded-2xl p-4 flex-1 min-h-[250px] flex flex-col",children:[e.jsxs("h3",{className:"text-xs font-bold text-slate-500 mb-2 flex items-center gap-2 uppercase tracking-wider",children:[e.jsx(G,{className:"w-4 h-4"}),"System Logs"]}),e.jsx("div",{ref:t,className:"log-container",role:"log","aria-live":"polite","aria-label":"시스템 로그",children:s.length===0?e.jsx("div",{className:"text-slate-600 italic",children:"시스템 대기 중..."}):s.map((r,a)=>e.jsx("div",{className:r.includes("완료")||r.includes("✓")?"text-emerald-400":r.includes("[ERROR]")?"text-red-400":"",children:r},a))})]})}function le({num:s}){const t=ne(s);return e.jsx("div",{className:`number-ball ${t}`,"aria-label":`번호 ${s}`,title:`번호 ${s}`,children:s})}function ne(s){return s<=10?"bg-yellow-500 text-yellow-950":s<=20?"bg-blue-500 text-blue-50":s<=30?"bg-red-500 text-red-50":s<=40?"bg-slate-500 text-slate-50":"bg-green-500 text-green-950"}function oe({results:s,isProcessing:t,progress:r,gameCount:a}){return e.jsxs("div",{className:"card relative overflow-hidden",children:[t&&e.jsx("div",{className:"progress-bar",style:{width:`${r}%`},role:"progressbar","aria-valuenow":r,"aria-valuemin":0,"aria-valuemax":100}),e.jsxs("div",{className:"flex justify-between items-center mb-6",children:[e.jsxs("h2",{className:"text-xl font-bold text-white flex items-center gap-2",children:[e.jsx(Y,{className:"w-6 h-6 text-cyan-400"}),"연산 대시보드"]}),e.jsxs("div",{className:"text-right",children:[e.jsx("div",{className:"text-sm text-slate-400",children:"Monte Carlo Progress"}),e.jsxs("div",{className:"text-2xl font-black font-mono text-cyan-400",children:[r,"%"]})]})]}),e.jsx("div",{className:"min-h-[400px] flex flex-col",children:s.length>0?e.jsx(ie,{results:s,gameCount:a}):e.jsx(de,{isProcessing:t})})]})}function ie({results:s,gameCount:t}){return e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex items-center gap-2 text-emerald-400 mb-4 bg-emerald-950/30 p-3 rounded-lg border border-emerald-900/50",children:[e.jsx(q,{className:"w-5 h-5 flex-shrink-0"}),e.jsxs("span",{className:"font-medium text-sm",children:["상위 ",t,"개 조합 추출 완료 (Fisher-Yates 셔플링 적용)"]})]}),s.map((r,a)=>e.jsx(ce,{res:r,idx:a},a))]})}function ce({res:s,idx:t}){const r=s.sum>=108&&s.sum<=168;return e.jsx("div",{className:"result-card group",children:e.jsxs("div",{className:"flex flex-col md:flex-row md:items-center justify-between gap-4",children:[e.jsxs("div",{className:"flex items-center gap-3",children:[e.jsxs("div",{className:"text-slate-500 font-mono font-bold w-6 text-right",children:["#",(t+1).toString().padStart(2,"0")]}),e.jsx("div",{className:"flex gap-2",children:s.nums.map((a,l)=>e.jsx(le,{num:a},l))})]}),e.jsxs("div",{className:"flex gap-4 text-xs font-mono text-slate-400 bg-slate-900 p-2 rounded-lg border border-slate-800 group-hover:border-slate-700",children:[e.jsx(y,{label:"SCORE",value:s.score.toFixed(1),className:"text-cyan-400"}),e.jsx("div",{className:"w-px bg-slate-800"}),e.jsx(y,{label:"SUM",value:s.sum,className:r?"text-emerald-400":"text-yellow-500"}),e.jsx("div",{className:"w-px bg-slate-800"}),e.jsx(y,{label:"AC Val",value:s.ac,className:"text-white"})]})]})})}function y({label:s,value:t,className:r}){return e.jsxs("div",{className:"flex flex-col items-center",children:[e.jsx("span",{className:"text-slate-500",children:s}),e.jsx("span",{className:`font-bold ${r}`,children:t})]})}function de({isProcessing:s}){return s?e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/30",children:[e.jsxs("div",{className:"relative w-24 h-24 mb-6",children:[e.jsx("div",{className:"absolute inset-0 border-4 border-slate-800 rounded-full"}),e.jsx("div",{className:"spinner-ring"}),e.jsx("div",{className:"absolute inset-0 flex items-center justify-center",children:e.jsx(Z,{className:"w-8 h-8 text-cyan-400 animate-pulse"})})]}),e.jsxs("div",{className:"text-center space-y-2",children:[e.jsxs("div",{className:"flex items-center gap-2 text-cyan-400 bg-cyan-950/30 px-4 py-2 rounded-full border border-cyan-900 font-mono text-sm shadow-[0_0_10px_rgba(6,182,212,0.2)]",children:[e.jsxs("span",{className:"relative flex h-3 w-3",children:[e.jsx("span",{className:"animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"}),e.jsx("span",{className:"relative inline-flex rounded-full h-3 w-3 bg-cyan-500"})]}),e.jsx("span",{children:"HYPER-FILTERING ENGINE RUNNING"})]}),e.jsx("h4",{className:"text-lg font-bold text-white tracking-wide",children:"QUANTUM SOLVING"}),e.jsx("p",{className:"text-xs font-mono text-cyan-400/80 mt-1",children:"Applying Fisher-Yates Elite Pool Shuffling..."})]})]}):e.jsxs("div",{className:"flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/30 py-16",children:[e.jsx(H,{className:"w-12 h-12 mb-4 text-slate-700"}),e.jsx("h4",{className:"text-base font-bold text-white mb-2",children:"대기 중 (IDLE)"}),e.jsxs("p",{className:"max-w-sm mx-auto text-xs text-center leading-relaxed text-slate-500",children:["CSV 데이터를 업로드하고 좌측 패널에서 연산 깊이를 설정한 후",e.jsx("br",{}),"시뮬레이션을 시작하십시오."]})]})}function me(s){return new Promise((t,r)=>{const a=new FileReader;a.onload=l=>{const c=l.target.result.split(`
`).map(m=>m.trim()).filter(m=>m!=="");t(c)},a.onerror=()=>r(new Error("파일 읽기 실패")),a.readAsText(s,"utf-8")})}function xe(s){if(!s||s.length===0)return{valid:!1,message:"CSV 파일이 비어 있습니다."};const t=s.filter((r,a)=>{const l=s[a].split(",").map(Number);return!(a===0&&isNaN(l[0]))});return t.length<10?{valid:!1,message:"최소 10회차 이상의 데이터가 필요합니다."}:{valid:!0,message:`${t.length}회차 데이터 확인됨`}}function ue(){return`
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

self.onmessage = function(e) {
  const { csvData, gameCount, simulationCount } = e.data;
  self.postMessage({ type: 'log', message: \`데이터 파이프라인 동기화 완료... (목표: \${simulationCount.toLocaleString()}회)\` });

  const frequency = Array(46).fill(0);
  const lastDrawn = Array(46).fill(0);
  let latestWinningNumbers = [];

  csvData.forEach((row, idx) => {
    const parts = row.split(',').map(Number);
    if (idx === 0 && isNaN(parts[0])) return;
    if (parts.length < 7 || isNaN(parts[1])) return;
    const nums = parts.slice(1, 7);
    if (idx === 1) latestWinningNumbers = [...nums];
    nums.forEach(n => {
      if (n >= 1 && n <= 45) {
        frequency[n]++;
        if (lastDrawn[n] === 0) lastDrawn[n] = idx;
      }
    });
  });

  self.postMessage({ type: 'log', message: 'PDF 가중치 초기화 및 시뮬레이션 엔진 점화...' });

  const weights = Array(46).fill(10);
  for (let i = 1; i <= 45; i++) {
    if (lastDrawn[i] >= 15) weights[i] += 30;
    if (frequency[i] > (csvData.length * 6 / 45) * 1.2) weights[i] = Math.max(5, weights[i] - 10);
  }

  const cumulativeWeights = [];
  let currentTotal = 0;
  for (let i = 1; i <= 45; i++) {
    currentTotal += weights[i];
    cumulativeWeights.push(currentTotal);
  }
  const maxWeight = currentTotal;

  const topCombinations = [];
  let bestScoreThreshold = 0;
  const POOL_SIZE = 1000;

  for (let i = 0; i < simulationCount; i++) {
    if (i % 50000 === 0) {
      self.postMessage({ type: 'progress', progress: (i / simulationCount) * 100 });
    }

    const comb = new Set();
    while (comb.size < 6) {
      const rand = Math.random() * maxWeight;
      let selectedNum = 1;
      for (let j = 0; j < 45; j++) {
        if (rand <= cumulativeWeights[j]) { selectedNum = j + 1; break; }
      }
      comb.add(selectedNum);
    }

    const arrComb = Array.from(comb).sort((a, b) => a - b);
    let score = 100;

    let consec = 1, maxConsec = 1;
    for (let j = 1; j < 6; j++) {
      if (arrComb[j] === arrComb[j-1] + 1) { consec++; maxConsec = Math.max(maxConsec, consec); }
      else { consec = 1; }
    }
    if (maxConsec >= 4) continue;
    if (maxConsec === 3) score -= 15;

    const oddCount = arrComb.filter(n => n % 2 !== 0).length;
    if (oddCount === 0 || oddCount === 6) score -= 30;
    else if (oddCount === 1 || oddCount === 5) score -= 15;

    const highCount = arrComb.filter(n => n > 22).length;
    if (highCount === 0 || highCount === 6) score -= 30;
    else if (highCount === 1 || highCount === 5) score -= 15;

    const diffs = new Set();
    for (let x = 0; x < 5; x++) for (let y = x+1; y < 6; y++) diffs.add(arrComb[y] - arrComb[x]);
    const acValue = diffs.size - 5;
    if (acValue < 7) score -= (7 - acValue) * 10;

    const lastDigits = arrComb.map(n => n % 10);
    const digitCounts = {};
    let maxSameDigit = 0;
    lastDigits.forEach(d => { digitCounts[d] = (digitCounts[d] || 0) + 1; maxSameDigit = Math.max(maxSameDigit, digitCounts[d]); });
    if (maxSameDigit >= 3) score -= 40;

    const carryOver = arrComb.filter(n => latestWinningNumbers.includes(n)).length;
    if (carryOver > 2) score -= 30;

    const primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43];
    const primeCount = arrComb.filter(n => primes.includes(n)).length;
    if (primeCount === 0 || primeCount > 3) score -= 10;
    const mul3Count = arrComb.filter(n => n % 3 === 0).length;
    if (mul3Count === 0 || mul3Count > 3) score -= 10;

    const sum = arrComb.reduce((a, b) => a + b, 0);
    const targetSum = 138.2;
    if (sum >= 108 && sum <= 168) {
      score -= 0;
    } else {
      const naturalStdDev = 30;
      const gaussianProb = Math.exp(-Math.pow(sum - targetSum, 2) / (2 * Math.pow(naturalStdDev, 2)));
      score -= (1 - gaussianProb) * 20;
      score -= 10;
    }

    if (score > 80 && score >= bestScoreThreshold) {
      topCombinations.push({ nums: arrComb, score, sum, ac: acValue });
      if (topCombinations.length > POOL_SIZE) {
        topCombinations.sort((a, b) => b.score - a.score);
        topCombinations.length = POOL_SIZE;
        bestScoreThreshold = topCombinations[topCombinations.length - 1].score;
      }
    }
  }

  self.postMessage({ type: 'progress', progress: 100 });

  const shuffledPool = shuffleArray(topCombinations);
  const finalResults = shuffledPool.slice(0, gameCount);
  finalResults.sort((a, b) => b.score - a.score);

  self.postMessage({ type: 'log', message: 'Top-Tier 풀(Pool) 생성 및 Fisher-Yates 셔플링 완료.' });
  self.postMessage({ type: 'complete', results: finalResults });
};
`}function fe(){const[s,t]=o.useState([]),[r,a]=o.useState(!1),[l,n]=o.useState(0),[c,m]=o.useState([]),[u,C]=o.useState([]),[g,L]=o.useState(5),[b,P]=o.useState(1e6),j=R.useRef(null),i=o.useCallback(f=>{m(x=>[...x,`[${new Date().toLocaleTimeString()}] ${f}`])},[]),_=o.useCallback(async f=>{const x=f.target.files[0];if(x)try{const d=await me(x),{valid:h,message:p}=xe(d);if(!h){i(`[ERROR] ${p}`);return}t(d),i(`CSV 로드 완료: 총 ${d.length-1}회차 데이터 인식됨.`)}catch(d){i(`[ERROR] 파일 읽기 실패: ${d.message}`)}},[i]),M=o.useCallback(()=>{if(s.length===0){i("[WARN] lotto_results.csv 파일을 먼저 업로드하세요.");return}a(!0),n(0),C([]),m([]),i("HMAC Security: 고유 시드 배정 완료. 세션 암호화 활성화."),i(`Multi-Constraint 알고리즘 가동... (목표: ${b.toLocaleString()}회)`);const f=new Blob([ue()],{type:"application/javascript"}),x=URL.createObjectURL(f),d=new Worker(x);j.current=d,d.onmessage=h=>{const{type:p,message:T,progress:k,results:w}=h.data;p==="log"?i(T):p==="progress"?n(Math.floor(k)):p==="complete"&&(C(w),a(!1),i(`✓ 시뮬레이션 완료! ${w.length}개 조합 추출.`),d.terminate(),URL.revokeObjectURL(x))},d.onerror=h=>{i(`[ERROR] Worker 오류: ${h.message}`),a(!1),d.terminate()},d.postMessage({csvData:s,gameCount:g,simulationCount:b})},[s,g,b,i]),D=o.useCallback(()=>{j.current&&(j.current.terminate(),j.current=null,a(!1),i("시뮬레이션이 사용자에 의해 강제 종료되었습니다."))},[i]);return e.jsxs("div",{className:"min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 flex flex-col items-center",children:[e.jsx(se,{}),e.jsxs("main",{className:"w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-6",children:[e.jsxs("div",{className:"lg:col-span-4 flex flex-col gap-6",children:[e.jsx(te,{csvData:s,onFileUpload:_}),e.jsx(ae,{simulationCount:b,gameCount:g,isProcessing:r,csvLoaded:s.length>0,onSimulationCountChange:P,onGameCountChange:L,onStart:M,onStop:D}),e.jsx(re,{logs:c})]}),e.jsx("div",{className:"lg:col-span-8 flex flex-col gap-6",children:e.jsx(oe,{results:u,isProcessing:r,progress:l,gameCount:g})})]}),e.jsx("footer",{className:"w-full max-w-6xl mt-12 pt-6 border-t border-slate-800 text-center text-xs text-slate-600",children:e.jsxs("p",{children:["LOTTO GENIE PRO v4.6 — Quantum-Genetic Edition ·"," ",e.jsx("span",{className:"text-slate-500",children:"본 앱은 통계 학습 목적의 엔터테인먼트 소프트웨어입니다. 당첨을 보장하지 않습니다."})]})})]})}v.createRoot(document.getElementById("root")).render(e.jsx(R.StrictMode,{children:e.jsx(fe,{})}));
