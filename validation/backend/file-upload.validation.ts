// TODO:便宜的にバリデーションをbackendディレクトリに入れているが、FEでも使いそうなら共通化する
import { z } from "zod";

// 1ファイルの最大サイズは50KBとする
const maxFileSize = 1 * 1024 * 50;

const envFileSchema = z.object({
  name: z.string().startsWith(".env"),
  size: z.number().lte(maxFileSize),
});

const envFileListSchema = z.array(envFileSchema).min(1);

export function isValidEnvFileList(uploadTargetFiles: File[]): boolean {
  try {
    envFileListSchema.parse(uploadTargetFiles);
  } catch {
    return false;
  }
  return true;
}

const metaDataSchema = z.object({
  repo_name: z.string().min(1),
  repo_id: z.number().int().positive(),
  commit_message: z.string(),
});

export type MetaData = z.infer<typeof metaDataSchema>;

export function isValidMetaData(metaData: MetaData) {
  try {
    metaDataSchema.parse(metaData);
  } catch {
    return false;
  }
  return true;
}
