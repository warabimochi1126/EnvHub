import { z } from "zod";

// TODO: commitUuidには"latest"と大文字のUUIDv4パターンが存在するが、正しくバリデーション出来ていないので改善が必要
const getStorageDataRequestSchema = z.object({
  repositoryId: z.string().min(1).regex(/^\d+$/),
  commitUuid: z.union([z.literal("latest"), z.string().min(1).uuid()]),
});

export type GetStorageDataRequest = z.infer<typeof getStorageDataRequestSchema>;

export function isValidStorageDataRequestObject(requestObject: GetStorageDataRequest): boolean {
  try {
    getStorageDataRequestSchema.parse(requestObject);
  } catch (e) {
    return false;
  }
  return true;
}
