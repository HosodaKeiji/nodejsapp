const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// 車種のリストを取得
router.get('/', carController.getAllCars);

// 車種を追加
router.post('/', carController.addCar);

module.exports = router;
