import React, {Suspense} from 'react';
import Navbar from "@/app/components/Navbar";
import CommentInput from "@/app/safespeak/CommentInput";
import PredictOutput from "@/app/safespeak/PredictOutput";
import type {Metadata} from 'next'


export async function generateMetadata(props: {searchParams?: Promise<{ c?: string | ""; }> }): Promise<Metadata> {
        const searchParams = await props.searchParams;
        const comment = searchParams?.c ?? "";

        if (comment) {
            return {
                title: `Deteksi Komentar: ${comment}`
            }
        } else {
            return {
                title: `Deteksi Komentar`
            }
        }
    }

const Page = async (props: {searchParams?: Promise<{ c?: string | ""; }> }) => {
    const searchParams = await props.searchParams;
    const comment = searchParams?.c ?? "";

    return (
        <div>
            <Navbar/>
            <div className={"mt-20"}>
                <div className={"flex justify-center items-center"}>
                    <div>
                        <h1 className={"mt-12 font-sans text-3xl text-[#3F0F34] font-extrabold inline-flex"}>
                            Pendeteksi Komen
                            <span
                                className="ml-2 font-sans text-3xl text-[#DF5454] font-extrabold"> {/* ml-2 adds left margin */}
                                Negatif
                            </span>
                        </h1>
                        <h2 className={"text-black text-center mt-4"}>Tata Kolom Komentar, Bawa Energi Positif</h2>
                    </div>
                </div>

                <div className={"mt-20 flex justify-center items-center"}>
                    <div>
                        <CommentInput query={comment}/>
                        <Suspense key={comment} fallback={<p className={"text-black text-lg font-bold font-sans mt-8"}>Loading Classification</p>}>
                            <PredictOutput query={comment}/>
                        </Suspense>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;