import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import lottoRouter from './routes/lotto.js';

const app = express();
const PORT = process.env.PORT || 3001;
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:5173';

// ── 미들웨어 ──────────────────────────────────────────────────
app.use(cors({
  origin: [FRONTEND_URL, 'http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// ── 라우터 ───────────────────────────────────────────────────
app.use('/api/lotto', lottoRouter);

// ── 헬스 체크 ────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'LOTTO GENIE PRO API',
    version: '4.6.0',
    timestamp: new Date().toISOString(),
  });
});

// ── 404 핸들러 ───────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// ── 오류 핸들러 ──────────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('[ERROR]', err);
  res.status(500).json({ error: err.message || 'Internal Server Error' });
});

// ── 서버 시작 ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 LOTTO GENIE API Server running on http://localhost:${PORT}`);
  console.log(`   Frontend: ${FRONTEND_URL}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
});

export default app;
