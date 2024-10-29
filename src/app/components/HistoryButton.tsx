import React from 'react';
import {checkLoggedIn} from "@/app/ServerActions";
import LogoutButton from "@/app/components/LogoutButton";

const HistoryButton = async() => {
    const isLoggedIn = await checkLoggedIn()

    return (
        <>
        {isLoggedIn.logged_in && <div className={"flex justify-center items-center"}>
            <a className={"text-[#FFD4CB] font-bold font-sans mr-2 sm:mr-4"} href={"/history" }>History</a>
            <LogoutButton/>
        </div>}
        </>
    );
};

export default HistoryButton;