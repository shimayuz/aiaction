const express = require('express');
const router = express.Router();

// ユーザー登録
router.post('/register', (req, res) => {
  // 実装予定
  res.status(201).json({ message: 'ユーザー登録API - 実装予定' });
});

// ユーザーログイン
router.post('/login', (req, res) => {
  // 実装予定
  res.status(200).json({ message: 'ユーザーログインAPI - 実装予定' });
});

// ユーザープロフィール取得
router.get('/profile', (req, res) => {
  // 実装予定
  res.status(200).json({ message: 'ユーザープロフィールAPI - 実装予定' });
});

module.exports = router;
