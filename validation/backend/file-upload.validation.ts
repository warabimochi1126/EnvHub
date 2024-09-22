// TODO:便宜的にバリデーションをbackendディレクトリに入れているが、FEでも使いそうなら共通化する
import { z } from "zod";

// 1ファイルの最大サイズは50KBとする
const maxFileSize = 1 * 1024 * 50;

const envFileListSchema = z.array(
  z.object({
    name: z.string().startsWith(".env"),
    size: z
      .number()
      .lte(maxFileSize, { message: "適切なファイルサイズのファイルをアップロードしてください。" }),
  })
);

export function isEnvFileList(uploadTargetFiles: File[]): File[] {
  try {
    const temp = envFileListSchema.parse(uploadTargetFiles);
    console.log(temp);
    return uploadTargetFiles;
  } catch (e) {
    throw new Error();
  }
}
