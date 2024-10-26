import React from 'react';
import Link from "next/link";
import HistoryButton from "@/app/components/HistoryButton";

const Navbar = () => {

    return (
        <div className="px-14 bg-[#3F0F34] flex justify-between items-center w-screen h-14 fixed top-0 z-10">
            <div className={"flex justify-between w-full"}>
                <div className={"flex items-center"}>
                    <Link href="/" className="flex">
                        <h1 className={"text-xl text-[#FFD4CB] font-bold font-sans"}>Safe</h1>
                        <h1 className={"text-xl text-[#FFD4CB] font-sans"}>Speak</h1>
                    </Link>
                    <a className={"text-[#FFD4CB] font-sans ml-36 font-bold text-[12px]"}
                       href={"/"}>About</a>
                    <a className={"text-[#FFD4CB] font-sans ml-12 font-bold text-[12px]"}
                       href={"/safespeak"}>Klasifikasi</a>
                </div>
                <HistoryButton/>
            </div>
        </div>
    );
};

export default Navbar;