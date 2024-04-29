"use client";

import { useDropzone } from "react-dropzone";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import { isEnvFiles } from "../functions/isEnvFile";
import { fileUpload } from "../functions/fileUpload";


export default function DragAndDropZone() {
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
         const response = await fileUpload(files);

         if(response.isError) {
            return toast.error(response.message, {
                theme: "colored",
                autoClose: 2000
            })
         }
         
         toast.success(response.message, {
            theme: "colored",
            autoClose: 20000
         });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <>
        <ToastContainer />
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