import React, {Suspense} from 'react';
import Navbar from "@/app/components/Navbar";
import type {Metadata} from 'next'
import CommentInput from "@/app/safespeak/CommentInput";
import PredictOutput from "@/app/safespeak/PredictOutput";
import ClassDesc from "@/app/safespeak/ClassDesc";

const badWords = [
    "anjing", "bajingan", "bangsat", "brengsek", "brengsik",
    "cok", "goblok", "idiot",
    "jancok", "jembut", "keparat", "k*nt*l", "l*nte",
    "maling", "ng*nt*t", "p*nt*k", "puki",
    "p*k*mak", "setan", "sialan", "sund*l", "tai",
    "telaso", "tengik", "titit", "tolol",
    "bego", "biadab", "blok", "budek", "cebol",
    "brengsek", "kampret", "kocak", "koplak", "malas",
    "mampus", "miskin", "murahan", "najis", "norak",
    "pecundang", "pelacur", "preman", "sampah", "zalim",
    "aseng", "babi", "bacot", "bahenol", "bangke",
    "banci", "barua", "bedebah", "bego", "bengis",
    "berandal", "b*nal", "blangsak", "brengsek",
    "busuk", "capruk", "cebong", "cino", "cucok",
    "dableg", "dungu", "edan", "gila", "hina",
    "jijik", "jongos", "kampungan", "katro", "keledai",
    "kerupuk", "kotor", "lemes", "l*nte", "malingsia",
    "manja", "menjijikan", "monyet", "nyolot", "odong",
    "pantek", "pecundang", "pepek", "pengemis", "perawan",
    "rongsokan", "sarap", "setres"
];
const allBadWords = badWords.join(" - ");

export async function generateMetadata(props: { searchParams?: Promise<{ c?: string | ""; }> }): Promise<Metadata> {
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

const Page = async(props: { searchParams?: Promise<{ c?: string | ""; }> }) => {
    const searchParams = await props.searchParams;
    const comment = searchParams?.c ?? "";

    return (
        <div>
            <Navbar/>
            <div className={"mt-20"}>
                <div className={"flex justify-center items-center"}>
                    <div className={"scale-75 sm:scale-100"}>
                        <h1 className={"mt-12 font-sans text-3xl text-[#3F0F34] font-extrabold inline-flex"}>
                            Pendeteksi Komen
                            <span
                                className="ml-2 font-sans text-3xl text-[#DF5454] font-extrabold">
                                Negatif
                            </span>
                        </h1>
                        <h2 className={"text-black text-center mt-4"}>Tata Kolom Komentar, Bawa Energi Positif</h2>
                    </div>
                </div>

                <div className={"mt-20 flex justify-center items-center"}>
                    <div>
                        <CommentInput query={comment}/>
                        <Suspense key={comment}
                                  fallback={<p className={"text-black text-lg font-bold font-sans mt-8"}>Loading
                                      Classification...</p>}>
                            <PredictOutput query={comment}/>
                        </Suspense>
                    </div>
                </div>
                <div className={"w-full mt-14 flex justify-center items-center mb-20"}>
                    <div className={"w-[280px] sm:w-[580px] md:w-[780px]"}>
                        <h1 className={"mt-12 font-sans text-2xl sm:text-3xl text-[#3F0F34] font-extrabold inline-flex"}>
                            Klasifikasi Komentar Negatif</h1>
                        <div className={"mt-5"}>
                            <ClassDesc/>
                        </div>

                        <h1 className={"mt-12 font-sans text-2xl sm:text-3xl text-[#3F0F34] font-extrabold inline-flex"}>
                            Contoh Kata-Kata Negatif</h1>
                        <p className={"text-justify mt-5"}>
                            {allBadWords}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;