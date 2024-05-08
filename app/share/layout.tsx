import React, { Suspense } from "react";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import ShowRepositoriesWrapper from "../components/show-repositories-wrapper";
import ShowRepositoriesFallback from "../components/show-repositories-fallback";


export default async function ShareLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className="flex">
            <ToastContainer />
            <Suspense fallback={<ShowRepositoriesFallback />}>
                <ShowRepositoriesWrapper />
            </Suspense>
            { children }
        </div>
    )
}