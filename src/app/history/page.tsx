import React from 'react';
import Navbar from "@/app/components/Navbar";
import HistoryTable from "@/app/history/HistoryTable";


const Page = () => {
    return (
        <div>
            <Navbar/>
            <div className={"flex justify-center items-center w-full px-20 mt-20"}>
                <HistoryTable/>
            </div>

        </div>
    );
};

export default Page;