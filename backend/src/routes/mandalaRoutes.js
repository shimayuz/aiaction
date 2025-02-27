const express = require('express');
const {
  generateMandalaChart,
  saveMandalaChart,
  getUserMandalaCharts,
  getMandalaChart
} = require('../controllers/mandalaController');

// 本番環境では認証ミドルウェアを追加
// const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// 認証が必要なルート
// router.use(protect);

// 曼荼羅チャートのルート
router.route('/')
  .get(getUserMandalaCharts)
  .post(saveMandalaChart);

router.route('/generate')
  .post(generateMandalaChart);

router.route('/:id')
  .get(getMandalaChart);

module.exports = router;
