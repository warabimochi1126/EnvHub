interface ResponseJson {
  isError: boolean;
  message: string;
}

// old
export const fileUpload = async (
  files: File[],
  repoId: string
): Promise<ResponseJson> => {
  const formData = new FormData();

  files.forEach((file) => {
    formData.append("file", file);
  });

  formData.append("repoId", repoId);

  const response = await fetch("/files", {
    method: "POST",
    body: formData,
  });

  const responseJson: ResponseJson = await response.json();
  return responseJson;
};
