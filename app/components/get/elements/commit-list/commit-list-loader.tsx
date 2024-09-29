"use client";

import { ClipLoader } from "react-spinners";

export function CommmitListLoader() {
  return (
    <div className="h-[258px] flex items-center justify-center">
      <ClipLoader className="text-blue-600" color="#2563eb " />
    </div>
  );
}
