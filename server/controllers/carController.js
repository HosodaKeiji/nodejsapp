const { Car, Manufacturer } = require('../models');

// 車種のリストを取得
exports.getAllCars = async (req, res) => {
    try {
        const cars = await Car.findAll({
            include: {
                model: Manufacturer,
                as: "manufacturer", // メーカーを取得する際に使うエイリアス名
                attributes: ['name'], // メーカー名のみ取得
            },
        });

        res.json(cars);
    } catch (error) {
        console.error("データ取得エラー:", error);
        res.status(500).send(error.message);
    }
};

// 車種を追加
exports.addCar = async (req, res) => {
    try {
        const { name, price, url, manufacturer_id } = req.body;
        // メーカーが存在するかチェック
        const manufacturer = await Manufacturer.findByPk(manufacturer_id);
        if (!manufacturer) {
            return res.status(400).json({ error: "指定されたメーカーが存在しません" });
        }

        //車種を追加
        const newCar = await Car.create({
        name,
        price,
        url,
        manufacturer_id
        });
        console.log("新しい車が追加されました:", newCar); // デバッグ用ログ
        res.status(201).json(newCar);  // 成功時に新しい車種を返す
    } catch (error) {
        console.error("車の追加中にエラー:", error); // エラー詳細をログに出す
        res.status(500).send(error.message);  // エラーハンドリング
    }
};
