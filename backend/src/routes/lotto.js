import express from 'express';
import { runSimulation, getStats } from '../services/lottoService.js';

const router = express.Router();

/**
 * POST /api/lotto/simulate
 * 서버사이드 몬테카를로 시뮬레이션 실행
 * Body: { csvLines: string[], gameCount: number, simulationCount: number }
 */
router.post('/simulate', async (req, res) => {
  try {
    const { csvLines, gameCount = 5, simulationCount = 100000 } = req.body;

    if (!csvLines || !Array.isArray(csvLines) || csvLines.length < 10) {
      return res.status(400).json({ error: 'CSV 데이터가 필요합니다. (최소 10줄)' });
    }

    if (simulationCount > 500000) {
      return res.status(400).json({ error: '서버 API는 최대 50만회 시뮬레이션을 지원합니다. 더 높은 횟수는 프론트엔드 Web Worker를 사용하세요.' });
    }

    const results = await runSimulation({ csvLines, gameCount, simulationCount });
    return res.json({ success: true, results, meta: { gameCount, simulationCount } });
  } catch (err) {
    console.error('[/simulate]', err);
    return res.status(500).json({ error: err.message });
  }
});

/**
 * POST /api/lotto/stats
 * CSV 데이터 통계 분석
 * Body: { csvLines: string[] }
 */
router.post('/stats', async (req, res) => {
  try {
    const { csvLines } = req.body;
    if (!csvLines || !Array.isArray(csvLines)) {
      return res.status(400).json({ error: 'csvLines 필드가 필요합니다.' });
    }

    const stats = getStats(csvLines);
    return res.json({ success: true, stats });
  } catch (err) {
    console.error('[/stats]', err);
    return res.status(500).json({ error: err.message });
  }
});

export default router;
