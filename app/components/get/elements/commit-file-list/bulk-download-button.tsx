"use client";

import { useCommitDataStore } from "@/store/repositoryGlobalState";
import { RiDownloadCloud2Line } from "react-icons/ri";

interface BulkDownloadResponse {
  error: null;
  path: string;
  signedURL: string;
  signedUrl: string;
}

export function BulkDownloadButton() {
  const { selectedCommitData } = useCommitDataStore();

  const bulkDownload = async () => {
    // prettier-ignore
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_DOMAIN}/api/repositories/${selectedCommitData.repoId}/commits/${selectedCommitData.commitUuid}/files/download`);
    const signedUrlsData = (await response.json()) as BulkDownloadResponse[];

    await Promise.all(
      signedUrlsData.map(async (signedUrlData) => {
        const response = await fetch(signedUrlData.signedUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = signedUrlData.path.split("/")[2];
        a.click();
        window.URL.revokeObjectURL(url);
      })
    );
  };

  return (
    <button
      className={`flex items-center m-3 border border-gray-300 py-1 px-2 rounded-md hover:bg-gray-400 transition-colors duration-300 ${
        selectedCommitData.commitUuid ? "" : "cursor-not-allowed"
      }`}
      onClick={selectedCommitData.commitUuid ? () => bulkDownload() : undefined}
    >
      <RiDownloadCloud2Line size={20} className="text-blue-500 mr-1" />
      <span className="text-sm">一括ダウンロード</span>
    </button>
  );
}
