"use client";

import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

import { isEnvFiles } from "../functions/isEnvFile";
import { fileUpload } from "../functions/fileUpload";

interface DragAndDropZoneProps {
    repositoryId: string
}

export default function DragAndDropZone({ repositoryId }: DragAndDropZoneProps) {
    const router = useRouter();

    const onDrop = async (files: File[]) => {
        const { isError, messages } = isEnvFiles(files);
        
        if(isError) {
            return messages.forEach(message => toast.error(message, { 
                theme: "colored",
                autoClose: 2000  
            }));
        }

        messages.forEach(message => toast.info(message, { 
            theme: "colored",
            autoClose: 2000
         }));


         // アップロード処理はバックエンド側で実装する
         const response = await fileUpload(files, repositoryId);

         if(response.isError) {
            return toast.error(response.message, {
                theme: "colored",
                autoClose: 2000
            })
         }
         
         toast.success(response.message, {
            theme: "colored",
            autoClose: 2000
         });

         router.refresh();
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
            <div {...getRootProps()} className={ isDragActive ?
            "border-2 border-dotted border-red-400 flex-grow h-80 mx-10" :
            "border-2 border-dotted border-dropbox-border flex-grow h-80 mx-10"}>
                <input {...getInputProps()} />
                <p className={ isDragActive ?
                "flex justify-center items-center h-full text-gray-500" :
                "flex justify-center items-center h-full text-gray-400"}>ここにファイルをドラッグ&ドロップしてください。</p>
            </div>
        </>
    )
}