import "server-only";
import { createClient } from "@/lib/supabase/server";

const formatDate = (date: Date): string[] => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  return [`${year}年${month}月${day}日`, `${hours}時${minutes}分${seconds}秒`];
};

export const fetchLinkedEnvFileNames = async (repositoryId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.storage.from("env_bucket").list(repositoryId, {
    limit: 100,
    sortBy: {
      column: "created_at",
    },
  });

  if (error) {
    return {
      isError: true,
      errorMessage: "ファイルフェッチ時に何らかのエラーが発生しました。\nブラウザを更新してください。",
    };
  }

  const linkedFileData = data?.map((file) => ({
    name: file.name,
    updatedAt: formatDate(new Date(file.updated_at)),
  }));

  return {
    isError: false,
    linkedFileData,
  };
};
