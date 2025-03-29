"use client";

import { useEffect, useState } from "react";
import "./ListCar.css";

// 車のデータ型を定義
interface Car {
    id: number;
    name: string;
    price: number;
    url: string;
    manufacturer: {
        name: string;
    };
}

export default function CarList() {
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        fetch("http://localhost:3001/api/cars") // APIのエンドポイント修正
            .then((response) => response.json())
            .then((data) => setCars(data))
            .catch((error) => console.error("データ取得エラー:", error));
    }, []);

    // トップページに戻るボタンのクリック時にページをリダイレクト
    const handleBack = () => {
        window.location.href = "/";  // トップページに戻る
    };

    return (
        <>
            <div className="container">
                <h2 className="title">📋 車の一覧</h2>
                <table className="car-table">
                    <thead>
                        <tr>
                            <th>メーカー名</th>
                            <th>車種名</th>
                            <th>金額</th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car) => (
                            <tr key={car.id}>
                                <td className="car-manufacturer">{car.manufacturer?.name || "不明"}</td>
                                <td className="car-name">{car.name}</td>
                                <td className="car-price">{car.price.toLocaleString()}円</td>
                                <td>
                                    <a href={car.url} target="_blank" rel="noopener noreferrer" className="car-link">
                                        {car.name}へのリンク
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="back-button-container">
                <button onClick={handleBack} className="back-button">
                    トップページに戻る
                </button>
            </div>
        </>
    );
}