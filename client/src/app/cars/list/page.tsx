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
        country: string;
    };
}

export default function CarList() {
    const [cars, setCars] = useState<Car[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");  // 検索クエリ
    const [filteredCars, setFilteredCars] = useState<Car[]>([]);  // フィルタリングされた車のデータ
    const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc"); // ソート順のステート

    useEffect(() => {
        fetch("http://localhost:3001/api/cars")
            .then((response) => response.json())
            .then((data) => {
                setCars(data);
                setFilteredCars(data);  // 初期のデータでfilteredCarsを設定
            })
            .catch((error) => console.error("データ取得エラー:", error));
    }, []);

    // 検索クエリが変更されたときに呼ばれる
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value;
        setSearchQuery(query);
    
        // 車名でフィルタリング（空文字の場合もフィルタリングする）
        const filtered = cars.filter((car) =>
            car.manufacturer.name.toLowerCase().includes(query.toLowerCase())  // 大文字小文字を無視してフィルタ
        );
    
        setFilteredCars(filtered);  // フィルタリングした車リストを状態にセット
    };

    // 金額でソート
    const handleSort = () => {
        const carsToSort = filteredCars.length > 0 ? [...filteredCars] : [...cars];  // filteredCarsがない場合はcarsをソート

        const sortedCars = carsToSort.sort((a, b) => {
            if (sortOrder === "asc") {
                return a.price - b.price; // 安い順
            } else {
                return b.price - a.price; // 高い順
            }
        });

        setFilteredCars(sortedCars);  // ソートしたリストを更新
        // ソート順を切り替え
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    };


    // トップページに戻るボタンのクリック時にページをリダイレクト
    const handleBack = () => {
        window.location.href = "/";  // トップページに戻る
    };

    return (
        <>
            <div className="container">
                <h2 className="title">📋 車の一覧</h2>
                {/* 検索入力欄 */}
                <div className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        value={searchQuery}
                        onChange={handleSearch}
                        placeholder="メーカー名で検索"
                    />
                </div>
                <table className="car-table">
                    <thead>
                        <tr>
                            <th>メーカー名</th>
                            <th>車種名</th>
                            <th onClick={handleSort} style={{ cursor: "pointer" }}>
                                金額 {sortOrder === "asc" ? "🔼" : "🔽"}
                            </th>
                            <th>URL</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* もし検索結果があればfilteredCarsを、なければ全車carsを表示 */}
                        {(filteredCars.length > 0 ? filteredCars : cars).map((car) => (
                            <tr key={car.id}>
                                <td className="car-manufacturer">
                                    {car.manufacturer?.name || "不明"} ({car.manufacturer?.country || "不明"})
                                </td>
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