import { isValidRepositoryId } from "./get-commit-list.validation";

describe("isValidRepositoryId", () => {
  test("引数に適切な値が渡される時、trueが返る", () => {
    const repositoryId = "833812345";
    const result = isValidRepositoryId(repositoryId);

    expect(result).toBe(true);
  });

  test("引数に空文字が渡される時、falseが返る", () => {
    const repositoryId = "";
    const result = isValidRepositoryId(repositoryId);

    expect(result).toBe(false);
  });

  test("引数に文字が混ざった値が渡される時、falseが返る", () => {
    const repsositoryId = "093283abc";
    const result = isValidRepositoryId(repsositoryId);

    expect(result).toBe(false);
  });

  test("引数に文字列以外が渡される時、falseが返る", () => {
    const repositoryId = 833812345;
    const result = isValidRepositoryId(repositoryId as unknown as string);

    expect(result).toBe(false);
  });
});
