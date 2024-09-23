import { z } from "zod";

const getStorageDataRequestSchema = z.object({
  repositoryId: z.string().min(1).regex(/^\d+$/),
  commitUuid: z.string().uuid(),
});

export type GetStorageDataRequest = z.infer<typeof getStorageDataRequestSchema>;

export function isValidStorageDataRequestObject(requestObject: GetStorageDataRequest): boolean {
  try {
    getStorageDataRequestSchema.parse(requestObject);
  } catch {
    return false;
  }
  return true;
}
