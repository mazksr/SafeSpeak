import React from 'react';
import Link from "next/link";
import HistoryButton from "@/app/components/HistoryButton";

const Navbar = () => {

    return (
        <div className="px-14 bg-[#3F0F34] flex justify-between items-center w-screen h-14 fixed top-0 z-10">
            <Link href="/" className="flex">
                <h1 className={"text-xl text-[#FFD4CB] font-bold font-sans"}>Safe</h1>
                <h1 className={"text-xl text-[#FFD4CB] font-sans"}>Speak</h1>
            </Link>
            <HistoryButton/>
        </div>
    );
};

export default Navbar;