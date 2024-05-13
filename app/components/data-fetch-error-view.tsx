"use client";

import { toast } from "react-toastify"

interface DataFetchErrorViewProps {
    errorMessage: string;
}

export default function DataFetchErrorView({ errorMessage }: DataFetchErrorViewProps) {
    if(errorMessage) {
        toast.error(errorMessage, {
            theme: "colored",
            autoClose: 2000
        })
    }
    return <div className="flex justify-center items-center w-screen">{ errorMessage }</div>
}