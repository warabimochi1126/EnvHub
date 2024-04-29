interface ResponseJson {
    isError: boolean,
    message: string
}

export const fileUpload = async (files: File[]): Promise<ResponseJson> => {
    const formData = new FormData();

    files.forEach(file => {
        formData.append("file", file);
    });

    const response = await fetch("/files", {
        method: "POST",
        body: formData
     });

     const responseJson: ResponseJson = await response.json();
     return responseJson;
}