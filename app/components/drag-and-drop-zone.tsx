"use client";

import { useDropzone } from "react-dropzone";

export default function DragAndDropZone() {
    const onDrop = (files: File[]) => {
        console.log(files);
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return (
        <div {...getRootProps()} className={ isDragActive ?
        "border-2 border-dotted border-red-400 flex-grow h-80 mx-10" :
        "border-2 border-dotted border-dropbox-border flex-grow h-80 mx-10"}>
            <input {...getInputProps()} />
            <p className={ isDragActive ?
            "flex justify-center items-center h-full text-gray-500" :
            "flex justify-center items-center h-full text-gray-400"}>ここにファイルをドラッグ&ドロップしてください。</p>
        </div>
    )
}