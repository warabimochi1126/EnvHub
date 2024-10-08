import {
  CommitFilesDownloadRequest,
  isValidCommitFilesDownloadRequestObject,
} from "./commit-files-download.validation";

describe("isValidCommitFilesDownloadRequestObject", () => {
  const requestObject = {
    repositoryId: "833812345",
    commitUuid: "48ed4e4b-2b7b-47a3-a786-1254be79deb1",
  };

  const craeteRequestObject = (overRideProps: Partial<CommitFilesDownloadRequest> = {}) => ({
    ...requestObject,
    ...overRideProps,
  });

  test("引数に正しい値が渡る時、trueを返すこと", () => {
    const result = isValidCommitFilesDownloadRequestObject(requestObject);

    expect(result).toBe(true);
  });

  describe("repositoryIdに", () => {
    test("空文字が渡される時、falseが返る", () => {
      const result = isValidCommitFilesDownloadRequestObject(craeteRequestObject({ repositoryId: "" }));

      expect(result).toBe(false);
    });

    test("文字が混ざった値が渡される時、falseが返る", () => {
      const result = isValidCommitFilesDownloadRequestObject(
        craeteRequestObject({ repositoryId: "833812abc" })
      );

      expect(result).toBe(false);
    });

    test("文字列以外が渡される時、falseが返る", () => {
      const result = isValidCommitFilesDownloadRequestObject("abc" as unknown as CommitFilesDownloadRequest);

      expect(result).toBe(false);
    });
  });

  describe("commitUuidに", () => {
    test("文字列以外の値が渡される時、falseを返すこと", () => {
      const result = isValidCommitFilesDownloadRequestObject(
        craeteRequestObject({ commitUuid: 123 } as unknown as CommitFilesDownloadRequest)
      );

      expect(result).toBe(false);
    });

    test("uuidでない文字列が渡る時、falseを返すこと", () => {
      const result = isValidCommitFilesDownloadRequestObject(craeteRequestObject({ commitUuid: "abc" }));

      expect(result).toBe(false);
    });
  });
});
