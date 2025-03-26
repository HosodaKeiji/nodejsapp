const express = require('express');
const cors = require('cors');
const carsRoutes = require('./routes/carRoutes');  // 車種のルートをインポート
const manufacturersRouter = require("./routes/manufacturerRoutes");
const { sequelize } = require('./models');  // Sequelizeのインスタンスをインポート

const app = express();

// CORS設定：フロントエンド（localhost:3000）からのリクエストを許可
app.use(cors({
    origin: 'http://localhost:3000', // フロントエンドのURLを指定
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // 許可するHTTPメソッド
    allowedHeaders: ['Content-Type'], // 許可するヘッダー
}));

// ミドルウェア
app.use(express.json());  // リクエストのbodyをJSONとして解析

// APIルート設定
app.use("/api/cars", carsRoutes);  // 車API
app.use("/api/manufacturers", manufacturersRouter);  // メーカーAPI

// サーバー起動
const PORT = process.env.PORT || 3001;
app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
    
    try {
        // データベース接続確認
        await sequelize.authenticate(); 
        console.log('Database connected');
    } catch (err) {
        console.error('Error: ' + err);
        process.exit(1);  // エラーが発生した場合はサーバーを終了
    }
});
