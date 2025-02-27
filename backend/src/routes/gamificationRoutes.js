const express = require('express');
const router = express.Router();

// ユーザーの達成状況取得
router.get('/achievements', (req, res) => {
  // 実装予定
  res.status(200).json({ message: '達成状況取得API - 実装予定' });
});

// 新しい達成を記録
router.post('/achievements', (req, res) => {
  // 実装予定
  res.status(201).json({ message: '達成記録API - 実装予定' });
});

// ポイント・レベル情報取得
router.get('/stats', (req, res) => {
  // 実装予定
  res.status(200).json({ 
    message: 'ゲーミフィケーション情報API - 実装予定',
    points: 100,
    level: 1,
    nextLevelAt: 200
  });
});

module.exports = router;
