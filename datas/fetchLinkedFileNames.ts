import "server-only"
import { createClient } from "@/lib/supabase/server"

export const fetchLinkedEnvFileNames = async (repositoryId: string) => {
  const supabase = createClient();

  const { data, error } = await supabase.storage.from("env_bucket").list(repositoryId, {
    limit: 100,
    sortBy: {
      column: "created_at"
    }
  });


  if (error) {
    // TODO:関数の戻り値は変数1つに1つの意味を持つ方がコードが追いやすいと思うが、冗長になってしまうと思う.
    // 変数1つに複数の意味を持たせてもいいのか？.誰かに聞く
    return {
      isError: true,
      errorMessage: "ファイルフェッチ時に何らかのエラーが発生しました。\nブラウザを更新してください。"
    }
  }

  const temp = new Date(data[0]?.updated_at);
  console.log(formatDate(temp));

  const linkedFileData = data?.map(file => ({ 
    name: file.name,
    updatedAt: formatDate(new Date(file.updated_at))
}));

  return {
    isError: false,
    linkedFileData
  };
}

const formatDate = (date: Date): string[] => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return [`${year}年${month}月${day}日`, `${hours}時${minutes}分${seconds}秒`];
}
