import { isValidEnvFileList, isValidMetaData, MetaData } from "./file-upload.validation";

// TODO:テストしたい関数を親になるdescribeブロックで宣言する
describe("isValidEnvFileList", () => {
  describe("引数にFileの配列でないものが渡る時", () => {
    test("falseを返すこと", () => {
      const result = isValidEnvFileList([]);

      expect(result).toBe(false);
    });
  });

  describe("引数にFileの配列であるものが渡る時", () => {
    describe("nameが.envから始まる、ファイルサイズが50KB以下である時", () => {
      test("trueを返すこと", () => {
        const result = isValidEnvFileList([new File(["hoge"], ".env")]);

        expect(result).toBe(true);
      });
    });

    describe("nameが.envから始まらない時", () => {
      test("falseを返すこと", () => {
        const result = isValidEnvFileList([new File(["hoge"], "image.png")]);

        expect(result).toBe(false);
      });
    });

    describe("ファイルサイズが50KBより大きい時", () => {
      test("falseを返すこと", () => {
        const sizeInByte = 1024 * 1024;
        const content = new Uint8Array(sizeInByte);
        const result = isValidEnvFileList([new File([content], "dummy.txt")]);

        expect(result).toBe(false);
      });
    });
  });
});

describe("isValidMetaData", () => {
  describe("引数にmetaData型以外の値が渡る時", () => {
    test("falseを返すこと", () => {
      const result = isValidMetaData("hoge" as unknown as MetaData);
      expect(result).toBe(false);
    });
  });

  describe("引数にmetaData型の値が渡る時", () => {
    const validMetaData: MetaData = {
      repo_name: "EnvHub",
      repo_id: 123456789,
      commit_message: "feat(postpage): supabaseとの接続を追加する",
    };

    const createMetaData = (overRideProps: Partial<MetaData> = {}): MetaData => ({
      ...validMetaData,
      ...overRideProps,
    });

    describe("repo_name,repo_id,commit_messageに適切な値が渡る時", () => {
      test("trueが返ること", () => {
        const result = isValidMetaData(createMetaData());

        expect(result).toBe(true);
      });
    });

    describe("repo_nameが空文字である時", () => {
      test("falseが返ること", () => {
        const result = isValidMetaData(createMetaData({ repo_name: "" }));

        expect(result).toBe(false);
      });
    });

    describe("repo_idが0である場合", () => {
      test("falseが返ること", () => {
        const result = isValidMetaData(createMetaData({ repo_id: 0 }));

        expect(result).toBe(false);
      });
    });

    describe("commit_messageが空文字である場合", () => {
      test("trueが返ること", () => {
        const result = isValidMetaData(createMetaData({ commit_message: "" }));

        expect(result).toBe(true);
      });
    });
  });
});
