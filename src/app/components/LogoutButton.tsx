"use client"
import React from 'react';
import {logOut} from "@/app/ServerActions";

const LogoutButton = () => {
    return (
        <button onClick={() => logOut()} className={"text-[#FFD4CB] font-bold font-sans ml-2 sm:ml-4"}>Logout</button>
    );
};

export default LogoutButton;