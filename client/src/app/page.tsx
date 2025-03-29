"use client";

import { useRouter } from "next/navigation";
import "./TopPage.css";

export default function Home() {
  const router = useRouter();

  return (
    <div className="container">
      <h2 className="title">車比較Webアプリ</h2>
      <p className="description">このアプリでは、さまざまな車の情報を比較できます。</p>
      <div className="button-container">
        <button
          onClick={() => router.push("/manufacturers/add")}
        >
          🏭 メーカーの追加
        </button>
        <button
          onClick={() => router.push("/cars/add")}
        >
          🚗 車種の追加
        </button>
        <button
          onClick={() => router.push("/cars/list")}
        >
          📋 車の一覧を見る
        </button>
      </div>
    </div>
  );
}
