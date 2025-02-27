const express = require('express');
const router = express.Router();

// タスク一覧取得
router.get('/', (req, res) => {
  // 実装予定
  res.status(200).json({ message: 'タスク一覧取得API - 実装予定' });
});

// タスク作成
router.post('/', (req, res) => {
  // 実装予定
  res.status(201).json({ message: 'タスク作成API - 実装予定' });
});

// タスク更新
router.put('/:id', (req, res) => {
  // 実装予定
  res.status(200).json({ message: 'タスク更新API - 実装予定' });
});

// タスク削除
router.delete('/:id', (req, res) => {
  // 実装予定
  res.status(200).json({ message: 'タスク削除API - 実装予定' });
});

module.exports = router;
