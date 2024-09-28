import { z } from "zod";

const commitFileDownloadRequestSchema = z.object({
  repositoryId: z.string().min(1).regex(/^\d+$/),
  commitUuid: z.string().uuid(),
  fileName: z.string().min(1).startsWith(".env"),
});

export type CommitFileDownloadRequest = z.infer<typeof commitFileDownloadRequestSchema>;

export function isValidCommitFileDownloadRequestObject(requestObject: CommitFileDownloadRequest) {
  try {
    commitFileDownloadRequestSchema.parse(requestObject);
  } catch {
    return false;
  }
  return true;
}
