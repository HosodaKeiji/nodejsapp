"use client";

import { useState, useEffect } from "react";

export default function AddCar() {
    const [manufacturers, setManufacturers] = useState<{ id: number; name: string }[]>([]);
    const [selectedManufacturer, setSelectedManufacturer] = useState<number | null>(null);
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [url, setUrl] = useState("");

    // APIからメーカー一覧を取得
    useEffect(() => {
        fetch("http://localhost:3001/api/manufacturers") // ExpressのAPIエンドポイント
        .then((response) => response.json())
        .then((data) => setManufacturers(data))
        .catch((error) => console.error("メーカー取得エラー:", error));
    }, []);

    // 車種を追加する処理
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
            headers: {
                "Content-Type": "application/json",
            },
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
    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>🚗 車種を追加</h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <label>
                    メーカー:
                    <select
                        value={selectedManufacturer || ""}
                        onChange={(e) => setSelectedManufacturer(Number(e.target.value))}
                        required
                        style={{ marginLeft: "10px", padding: "5px" }}
                    >
                        <option value="">選択してください</option>
                        {manufacturers.map((manufacturer) => (
                        <option key={manufacturer.id} value={manufacturer.id}>
                            {manufacturer.name}
                        </option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    車種名:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required style={{ marginLeft: "10px", padding: "5px" }} />
                </label>
                <br />
                <label>
                    価格:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required style={{ marginLeft: "10px", padding: "5px" }} />
                </label>
                <br />
                <label>
                    画像URL:
                    <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} required style={{ marginLeft: "10px", padding: "5px" }} />
                </label>
                <br />
                <button type="submit" style={{ padding: "10px 20px", fontSize: "16px", cursor: "pointer" }}>追加</button>
            </form>
        </div>
    );
}    
