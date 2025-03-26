const express = require("express");
const manufacturerController = require("../controllers/manufacturerController");
const router = express.Router();

// メーカーの一覧を取得
router.get("/", manufacturerController.getManufacturers);

// メーカー追加API
router.post("/", manufacturerController.addManufacturer);

module.exports = router;
