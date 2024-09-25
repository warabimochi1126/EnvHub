"use client";

import { PulseLoader } from "react-spinners";

export function UploadDuringModalContent() {
  return (
    <>
      <div className="flex flex-col justify-center items-center h-52">
        <PulseLoader speedMultiplier={0.2} color="#3B82F6" size={20} />
        <p className="text-gray-600 mt-3">アップロード中です...</p>
      </div>
    </>
  );
}
