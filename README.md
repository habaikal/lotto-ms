# 🎰 LOTTO GENIE PRO — Quantum-Genetic Edition v4.6

> **15단계 하이퍼 필터링 × 몬테카를로 시뮬레이션 × Fisher-Yates 셔플링**

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-3-38BDF8?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

---

## 📌 프로젝트 개요

**Lotto Genie Pro**는 역대 로또 당첨 데이터를 기반으로:

1. **100만 회 몬테카를로 시뮬레이션**으로 로또 번호 조합을 생성하고
2. **15단계 Multi-Constraint 하이퍼 필터링**으로 통계적으로 우수한 조합을 선별하며
3. **Fisher-Yates 셔플링**으로 점수 편향 없이 최종 번호를 추출하는 웹 애플리케이션입니다.

> ⚠️ **면책 조항**: 이 앱은 통계·확률 학습 목적의 엔터테인먼트 소프트웨어입니다. 로또 당첨을 보장하지 않습니다.

---

## 🚀 빠른 시작

### 프론트엔드만 실행 (권장)

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173
```

### 백엔드 포함 실행

```bash
# 백엔드
cd backend
npm install
cp .env.example .env
npm run dev

# 프론트엔드 (새 터미널)
cd frontend
npm install
npm run dev
```

### Docker Compose로 한번에 실행

```bash
docker-compose up --build
# Frontend → http://localhost:5173
# Backend  → http://localhost:3001
```

---

## 📊 사용 방법

1. **CSV 업로드**: `lotto_results.csv` 파일을 드래그&드롭 또는 클릭하여 업로드
2. **파라미터 설정**: 시뮬레이션 횟수(10만~200만) 및 추출 조합 수(1~50) 설정
3. **시뮬레이션 시작**: "퀀텀 필터링 시작" 버튼 클릭
4. **결과 확인**: Fisher-Yates 셔플링이 적용된 최종 번호 조합 확인

### CSV 파일 형식

```csv
회차,번호1,번호2,번호3,번호4,번호5,번호6,보너스
1169,3,14,26,33,43,45,1
1168,8,15,24,37,40,42,19
...
```

---

## 🛠️ 기술 스택

### 프론트엔드
- **React 18** — UI 컴포넌트
- **Vite 5** — 빌드 툴 & 개발 서버
- **Tailwind CSS 3** — 유틸리티 CSS
- **Lucide React** — 아이콘
- **Web Workers API** — 백그라운드 연산

### 백엔드 (선택)
- **Node.js + Express** — REST API
- **CORS** — 크로스 오리진 처리

---

## 📜 라이선스

MIT License © 2026 Lotto Genie Team

---

## 🙏 기여

PR과 이슈는 언제나 환영합니다!
