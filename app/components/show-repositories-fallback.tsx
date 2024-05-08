"use client";

import { ScaleLoader } from "react-spinners";


export default function ShowRepositoriesFallback() {
  return (
    <div className="h-screen w-60 bg-dropbox-background flex-shrink-0 flex justify-center items-center">
      <ScaleLoader color="#00CECC" />
    </div>
  )
}