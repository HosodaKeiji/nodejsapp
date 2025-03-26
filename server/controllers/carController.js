const { Car, Manufacturer } = require('../models');

// 車種のリストを取得
exports.getAllCars = async (req, res) => {
    try {
        const models = await Model.findAll({
        include: Manufacturer,  // 車種に関連するメーカーも取得
        });
        res.json(models);
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// 車種を追加
exports.addCar = async (req, res) => {
    try {
        const { name, price, url, manufacturer_id } = req.body;
        const newModel = await Model.create({
        name,
        price,
        url,
        manufacturer_id
        });
        res.status(201).json(newModel);  // 成功時に新しい車種を返す
    } catch (error) {
        res.status(500).send(error.message);  // エラーハンドリング
    }
};
