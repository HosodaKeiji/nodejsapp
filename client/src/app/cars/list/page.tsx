"use client";

import { useEffect, useState } from "react";

// 車のデータ型を定義
interface Car {
    id: number;
    name: string;
    price: string;
}

export default function CarList() {
  const [cars, setCars] = useState<Car[]>([]); // 型を指定

  // 車のデータを取得する関数
    useEffect(() => {
        // APIを使って車のデータを取得
        fetch("/api/cars")
        .then((response) => response.json())
        .then((data) => setCars(data))
        .catch((error) => console.error("データ取得エラー:", error));
    }, []);

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h2>車の一覧</h2>
        <div>
            <ul>
            {cars.map((car) => (
                <li key={car.id}>
                {car.name} - {car.price}円
                </li>
            ))}
            </ul>
        </div>
        </div>
    );
}
