import { z } from "zod";

// TODO:文字列型の数値という意味の正規表現、他の物にも適用する
const commitListRequestSchema = z.string().min(1).regex(/^\d+$/);

export function isValidRepositoryId(repositoryId: string): boolean {
  try {
    commitListRequestSchema.parse(repositoryId);
  } catch {
    return false;
  }
  return true;
}
