"use client";

import { RingLoader } from "react-spinners";

export function RepositoryDetailLoading() {
  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <RingLoader color="#00CECC"/>
    </div>
  )
}