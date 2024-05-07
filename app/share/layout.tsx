import ShowRepositories from "@/app/components/show-repositories";
import { fetchAuthenticatedUserRepositoryNames } from "@/datas/fetchAuthUserRespositories";
import React from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default async function ShareLayout({ children }: { children: React.ReactNode }) {
    const repoNames = await fetchAuthenticatedUserRepositoryNames();

    return (
        <div className="flex">
            <ToastContainer />
            <ShowRepositories repoNames={repoNames}/>
            { children }
        </div>
    )
}