import React from 'react';
import Navbar from "@/app/components/Navbar";
import HistoryTable from "@/app/admin/HistoryTable";

import type { Metadata } from 'next'
import SearchField from "@/app/components/SearchField";

export const metadata: Metadata = {
  title: 'SafeSpeak - History',
}

const Page = async(props: { searchParams?: Promise<{ search?: string | ""; }> }) => {
    const searchPar = await props.searchParams
    const searchString = searchPar?.search || ""

    return (
        <div>
            <Navbar/>
            <div className={"mt-20 mb-16"}>
                <div className={"flex justify-between"}>
                    <div className={"ml-4 lg:ml-24"}>
                        <SearchField/>
                    </div>
                    <a target="_blank" href={`${process.env.API_URL}/download-csv`}
                        className="mr-4 lg:mr-24 cursor-pointer bg-gray-800 px-3 py-2 rounded-md text-white tracking-wider shadow-xl hover:scale-110 animate-none">
                        <svg
                            className="w-5 h-5"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
                                strokeLinejoin="round"
                                strokeLinecap="round"></path>
                        </svg>
                    </a>
                </div>
                <div className={"flex justify-center items-center w-full px-3 lg:px-20"}>
                    <HistoryTable search={searchString}/>
                </div>
            </div>

        </div>
    );
};

export default Page;