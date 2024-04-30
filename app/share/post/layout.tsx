import ShowRepositories from "@/app/components/show-repositories";
import { fetchAuthenticatedUserRepositoryNames } from "@/datas/fetchAuthUserRespositories";
import React from "react";
import { ToastContainer } from "react-toastify";

export default async function PostLayout({ children }: { children: React.ReactNode }) {
    const repoNames = await fetchAuthenticatedUserRepositoryNames();

    return (
        
        <div className="flex">
            <ToastContainer />
            <ShowRepositories repoNames={repoNames}/>
            { children }
        </div>
    )
}