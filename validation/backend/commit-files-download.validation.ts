import { z } from "zod";

const commitFilesDownloadRequestSchema = z.object({
  repositoryId: z.string().min(1).regex(/^\d+$/),
  commitUuid: z.string().min(1).uuid(),
});

export type CommitFilesDownloadRequest = z.infer<typeof commitFilesDownloadRequestSchema>;

export function isValidCommitFilesDownloadRequestObject(requestObject: CommitFilesDownloadRequest) {
  try {
    commitFilesDownloadRequestSchema.parse(requestObject);
  } catch {
    return false;
  }
  return true;
}
