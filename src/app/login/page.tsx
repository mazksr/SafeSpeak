import React from 'react';
import Navbar from "@/app/components/Navbar";
import LoginForm from "@/app/login/LoginForm";

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'SafeSpeak - Login',
}

const Page = () => {
    return (
        <div>
            <Navbar/>
            <div className="animate-jump animate-once flex h-screen justify-center items-center">
                <div className="lg:px-10 md:px-5 sm:px-5 px-5">
                    <div className='flex'>
                        <div className='w-fit max-w-screen-sm'>
                            <h1 className='font-bold text-black text-4xl'>Login</h1>
                            <p className='mt-3 text-gray-500 text-justify'>
                                Silahkan Masukkan username dan password
                            </p>
                        </div>
                    </div>
                    <div className="w-full max-w-sm p-5 bg-white rounded-lg font-mono">
                        <LoginForm/>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Page;