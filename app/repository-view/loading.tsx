"use client";

// TODO:取得側・保存側共通のコンポーネントにする
import { GridLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="flex justify-center items-center h-screen">
      <GridLoader color="#3b82f6" />
    </div>
  );
}
