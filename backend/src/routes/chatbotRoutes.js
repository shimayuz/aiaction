const express = require('express');
const router = express.Router();

// チャットボットメッセージ送信
router.post('/message', (req, res) => {
  // 実装予定
  res.status(200).json({ 
    message: 'チャットボット応答 - 実装予定',
    response: 'こんにちは！AIアクションハビットコーチです。何かお手伝いできることはありますか？'
  });
});

// チャット履歴取得
router.get('/history', (req, res) => {
  // 実装予定
  res.status(200).json({ message: 'チャット履歴取得API - 実装予定' });
});

module.exports = router;
