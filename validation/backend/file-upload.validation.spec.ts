import { isEnvFileList } from "./file-upload.validation";

describe("isEnvFileList", () => {
  describe("引数にFileの配列でないものが渡る時", () => {
    test("Errorをthrowすること", () => {
      const result = isEnvFileList([]);
      expect(result).toThrow(Error);
    });
  });

  describe("引数にFileの配列であるものが渡る時", () => {
    describe("nameが.envから始まる、ファイルサイズが50KB以下である時", () => {
      test("引数が戻り値として返ってくること", () => {
        const result = isEnvFileList([new File(["hoge"], ".env")]);

        expect(result).toEqual([new File(["hoge"], ".env")]);
      });
    });

    describe("nameが.envから始まらない時", () => {
      test("Errorがthrowされること", () => {
        const result = isEnvFileList([new File(["hoge"], "image.png")]);

        expect(result).toThrow(Error);
      });
    });

    describe("ファイルサイズが50KBより大きい時", () => {
      test("Errorがthrowされること", () => {
        const sizeInByte = 1024 * 1024;
        const content = new Uint8Array(sizeInByte);
        const result = isEnvFileList([new File([content], "dummy.txt")]);

        expect(result).toThrow(Error);
      });
    });
  });
});
