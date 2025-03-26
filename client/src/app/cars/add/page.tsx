"use client";

import { useState, useEffect } from "react";
import "./AddCar.css"; // CSSファイルを読み込む

export default function AddCar() {
    const [manufacturers, setManufacturers] = useState<{ id: number; name: string }[]>([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [url, setUrl] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/api/manufacturers")
            .then((response) => response.json())
            .then((data) => setManufacturers(data))
            .catch((error) => console.error("メーカー取得エラー:", error));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedManufacturer) {
            alert("メーカーを選択してください");
            return;
        }

        const newCar = {
            manufacturer_id: selectedManufacturer,
            name,
            price: parseInt(price, 10),
            url,
        };

        const response = await fetch("http://localhost:3001/api/cars", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newCar),
        });

        if (response.ok) {
            alert("車種が追加されました");
            setName("");
            setPrice("");
            setUrl("");
            setSelectedManufacturer(null);
        } else {
            alert("エラーが発生しました");
        }
    };

    // トップページに戻るボタンのクリック時にページをリダイレクト
    const handleBack = () => {
        window.location.href = "/";  // トップページに戻る
    };

    return (
        <div className="container">
            <h2 className="title">🚗 車種を追加</h2>
            <form onSubmit={handleSubmit} className="form">
                <label className="label">
                    メーカー:
                    <select
                        value={selectedManufacturer || ""}
                        onChange={(e) => setSelectedManufacturer(Number(e.target.value))}
                        required
                        className="select"
                    >
                        <option value="">選択してください</option>
                        {manufacturers.map((manufacturer) => (
                            <option key={manufacturer.id} value={manufacturer.id}>
                                {manufacturer.name}
                            </option>
                        ))}
                    </select>
                </label>
                <label className="label">
                    車種名:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="input" />
                </label>
                <label className="label">
                    価格:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="input" />
                </label>
                <label className="label">
                    URL:
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required className="input" />
                </label>
                <button type="submit" className="button">追加</button>
            </form>
            <div className="back-button-container">
                <button onClick={handleBack} className="back-button">
                    トップページに戻る
                </button>
            </div>
        </div>
    );
}
