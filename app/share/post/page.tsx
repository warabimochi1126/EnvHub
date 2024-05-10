"use client";
import RepositoryPlaceholder from "@/app/components/repository-placeholder";

export default function Post() {
  const onClick = async () => {
    const response = await fetch("/files", {
      method: "DELETE"
    });

    const responseJson = await response.json();

    console.log(responseJson);
  }
  return (
      // <RepositoryPlaceholder />
      <div onClick={() => onClick()} className="bg-blue-500">
        削除ボタン
      </div>
  )
}