import { z } from "zod";

const commitListRequestSchema = z.string().min(1).regex(/^\d+$/);

export function isValidRepositoryId(repositoryId: string): boolean {
  try {
    commitListRequestSchema.parse(repositoryId);
  } catch {
    return false;
  }
  return true;
}
