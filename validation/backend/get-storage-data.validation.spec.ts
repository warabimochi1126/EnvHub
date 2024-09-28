import { GetStorageDataRequest, isValidStorageDataRequestObject } from "./get-storage-data.validation";

describe("isValidStorageDataRequestObject", () => {
  const requestObject = {
    repositoryId: "833812345",
    commitUuid: "48ed4e4b-2b7b-47a3-a786-1254be79deb1",
  };

  const craeteRequestObject = (overRideProps: Partial<GetStorageDataRequest> = {}) => ({
    ...requestObject,
    ...overRideProps,
  });

  test("引数に正しい値が渡る時、trueを返すこと", () => {
    const result = isValidStorageDataRequestObject(craeteRequestObject());

    expect(result).toBe(true);
  });

  describe("repositoryIdに", () => {
    test("空文字が渡される時、falseが返る", () => {
      const result = isValidStorageDataRequestObject(craeteRequestObject({ repositoryId: "" }));

      expect(result).toBe(false);
    });

    test("文字が混ざった値が渡される時、falseが返る", () => {
      const result = isValidStorageDataRequestObject(craeteRequestObject({ repositoryId: "833812abc" }));

      expect(result).toBe(false);
    });

    test("文字列以外が渡される時、falseが返る", () => {
      const result = isValidStorageDataRequestObject("abc" as unknown as GetStorageDataRequest);

      expect(result).toBe(false);
    });
  });

  describe("commitUuidに", () => {
    test("latestが渡される時、trueを返すこと", () => {
      const result = isValidStorageDataRequestObject(craeteRequestObject({ commitUuid: "latest" }));

      expect(result).toBe(true);
    });

    test("文字列以外の値が渡される時、falseを返すこと", () => {
      const result = isValidStorageDataRequestObject(
        craeteRequestObject({ commitUuid: 123 } as unknown as GetStorageDataRequest)
      );

      expect(result).toBe(false);
    });

    test("uuidでない文字列が渡る時、falseを返すこと", () => {
      const result = isValidStorageDataRequestObject(craeteRequestObject({ commitUuid: "abc" }));

      expect(result).toBe(false);
    });
  });
});
