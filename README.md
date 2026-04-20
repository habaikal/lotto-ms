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

## 🧠 알고리즘 상세 (15단계 필터)

| 필터 # | 이름 | 설명 |
|--------|------|------|
| 1 | PDF 가중치 | 출현 빈도 기반 확률 밀도 함수 |
| 2 | Cold 번호 | 15회 이상 미출현 번호 가중치 증가 |
| 3 | Hot 번호 | 평균 대비 1.2배 이상 출현 번호 감점 |
| 4 | 합계 골든존 | 역대 평균 합계 108~168 (타깃: 138.2) |
| 5 | W-PRNG 추출 | 가중치 기반 난수 번호 추출 |
| 6 | 엘리트 풀 | 상위 1,000개 조합 풀 관리 |
| 7 | Fisher-Yates | 최종 셔플링으로 점수 편향 제거 |
| 8 | 연속 번호 | 4개 이상 연속 번호 제거 |
| 9 | 삼중 연속 감점 | 3개 연속 번호 15점 감점 |
| 10 | 홀짝 비율 | 전체 홀수/짝수 극단 조합 감점 |
| 11 | 저고 비율 | 1~22 / 23~45 극단 분포 감점 |
| 12 | AC Value | 7 미만 시 누적 감점 |
| 13 | 동일 끝수 | 3개 이상 같은 끝자리 감점 |
| 14 | 이월수 | 최근 당첨 번호 2개 초과 포함 감점 |
| 15 | 소수/3배수 | 소수 혹은 3의 배수 비율 검증 |

---

## 📁 디렉토리 구조

```
lotto-ms/
├── frontend/                    # React + Vite 프론트엔드
│   ├── public/
│   │   ├── favicon.ico
│   │   └── sample_lotto.csv     # 샘플 데이터
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.jsx       # 헤더 컴포넌트
│   │   │   ├── DataPanel.jsx    # CSV 업로드 패널
│   │   │   ├── ControlPanel.jsx # 파라미터 설정 패널
│   │   │   ├── LogPanel.jsx     # 시스템 로그 패널
│   │   │   ├── ResultPanel.jsx  # 결과 표시 패널
│   │   │   └── NumberBall.jsx   # 로또 번호 볼 컴포넌트
│   │   ├── workers/
│   │   │   └── lotto.worker.js  # Web Worker (몬테카를로 엔진)
│   │   ├── hooks/
│   │   │   └── useLottoWorker.js # Worker 커스텀 훅
│   │   ├── utils/
│   │   │   └── csvParser.js     # CSV 파싱 유틸리티
│   │   ├── App.jsx              # 메인 앱 컴포넌트
│   │   ├── main.jsx             # 진입점
│   │   └── index.css            # 전역 스타일
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/                     # Express.js 백엔드 (선택적)
│   ├── src/
│   │   ├── routes/
│   │   │   └── lotto.js         # 로또 API 라우터
│   │   ├── services/
│   │   │   └── lottoService.js  # 비즈니스 로직
│   │   └── server.js            # Express 서버
│   ├── package.json
│   └── .env.example
├── data/
│   └── lotto_results.csv        # 역대 당첨 데이터
├── .gitignore
├── docker-compose.yml
└── README.md
```

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
