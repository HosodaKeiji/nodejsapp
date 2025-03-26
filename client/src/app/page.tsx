"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>トップページ</h2>
      <p>このアプリでは、さまざまな車の情報を比較できます。</p>
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={() => router.push("/manufacturers/add")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          🏭 メーカーの追加
        </button>
        <button
          onClick={() => router.push("/cars/add")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          🚗 車種の追加
        </button>
        <button
          onClick={() => router.push("/cars/list")}
          style={{
            padding: "10px 20px",
            margin: "10px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          📋 車の一覧を見る
        </button>
      </div>
    </div>
  );
}
