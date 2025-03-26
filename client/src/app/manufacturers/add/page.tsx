"use client";

import { useState } from "react";
import "./AddManufacturer.css";

export default function AddManufacturer() {
    const [name, setName] = useState("");
    const [country, setCountry] = useState("");
    const [error, setError] = useState<string | null>(null); // エラーハンドリング用のステート

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // 入力チェック
        if (!name || !country) {
            setError("メーカー名と国名を入力してください");
            return;
        }
        try {
            // APIにデータを送信してメーカーを追加
            const response = await fetch("http://localhost:3001/api/manufacturers", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, country }), // メーカーのデータ
            });

            if (!response.ok) {
                throw new Error("メーカーの追加に失敗しました");
            }

            // 成功した場合の処理
            const data = await response.json();
            console.log("メーカーが追加されました:", data);
            setName("");  // フォームの入力をクリア
            setCountry("");
            setError(null);  // エラーメッセージのリセット
            // メーカー追加成功時にアラートを表示してトップページにリダイレクト
            alert("メーカーが追加されました");
            window.location.href = "/";

        } catch (err: unknown) {
            // 型ガードを使ってエラーがErrorオブジェクトか確認
            if (err instanceof Error) {
                setError(err.message); // エラーメッセージの設定
            } else {
                setError("予期しないエラーが発生しました");
            }
            console.error("Error adding manufacturer:", err);
        }
    };

    // トップページに戻るボタンのクリック時にページをリダイレクト
    const handleBack = () => {
        window.location.href = "/";  // トップページに戻る
    };

    return (
        <div className="add-manufacturer-container">
            <h2>メーカーの追加</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メーカー名:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        placeholder="メーカー名"
                    />
                </div>
                <div>
                    <label>国名:</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        placeholder="国名"
                    />
                </div>
                {error && <p className="error-message">{error}</p>}  {/* エラーメッセージを表示 */}
                <div>
                    <button type="submit">追加</button>
                </div>
            </form>
            <div className="back-button-container">
                <button onClick={handleBack} className="back-button">
                    トップページに戻る
                </button>
            </div>
        </div>
    );
}
