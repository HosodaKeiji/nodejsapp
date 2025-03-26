const { Manufacturer, Car } = require("../models");

// メーカーとその車種の一覧を取得する
const getManufacturers = async (req, res) => {
    try {
        // メーカーと関連する車種を一緒に取得
        const manufacturers = await Manufacturer.findAll({
        include: [{
            model: Car, // ここで車種（Car）モデルを指定
            as: "cars",
        }],
        });
        res.json(manufacturers);
    } catch (error) {
        res.status(500).json({ error: "メーカーの取得に失敗しました。" });
    }
};

// メーカーを追加する処理
const addManufacturer = async (req, res) => {
    try {
        const { name, country } = req.body;
    
        // 入力値のチェック
        if (!name || !country) {
            return res.status(400).json({ error: "名前と国を入力してください" });
        }
    
        const newManufacturer = await Manufacturer.create({
            name,
            country,
        });
    
        res.status(201).json(newManufacturer);
        } catch (error) {
        console.error("Error adding manufacturer:", error);
        res.status(500).json({ error: "メーカーの追加に失敗しました" });
    }
};

module.exports = { getManufacturers, addManufacturer };
