import React from 'react';

interface Props {
    query: string,
}

const LABEL_COLUMNS = [
    'Ujaran Kebencian',           // Hateful Speech
    'Bahasa Kasar',               // Abusive Language
    'Ujaran Kebencian Individu',  // Hateful Speech Individu
    'Ujaran Kebencian Grup',      // Hateful Speech Grup
    'Ujaran Kebencian Berdasarkan Agama', // Hateful Speech Agama
    'Ujaran Kebencian Berdasarkan Ras',   // Hateful Speech Ras
    'Ujaran Kebencian Berdasarkan Fisik', // Hateful Speech Fisik
    'Ujaran Kebencian Berdasarkan Gender', // Hateful Speech Gender
    'Ujaran Kebencian Lainnya',     // Hateful Speech Lainnya
    'Ujaran Kebencian Lemah',      // Hateful Speech Lemah
    'Ujaran Kebencian Sedang',     // Hateful Speech Sedang
    'Ujaran Kebencian Kuat'         // Hateful Speech Kuat
];

const PredictOutput = async ({query}: Props) => {

    const req = query ? await fetch(`${process.env.API_URL}/predict`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json', // Specify the request body format
        },
        body: JSON.stringify({
            comment: query
        }),
        cache: "no-store"
    }) : null

    let isPositive: boolean;
    let labels: number[];

    if (req && req.ok) {
        const resp = await req.json()
        labels = resp.message
        isPositive = resp.isPositive
    } else {
        labels = []
        isPositive = false
    }

    return (
        <div>
            {query && <div className={"mt-6 ml-4 font-bold font-sans text-lg"}>
                {isPositive ? <p className={"text-green-500"}>Tidak Termasuk Komentar Negatif</p> : <div>
                    <p className={"text-red-500"}>Komen Negatif</p>
                    <div className={"max-w-[780px]"}>
                        <p className={"text-black"}>Klasifikasi: </p>
                        <div className={"grid grid-cols-3 gap-4 mt-5"}>
                            {labels && labels.map((label, index) =>
                                label === 1 ? (
                                    <div key={index}>
                                        <div
                                            className="relative w-full max-w-64 h-20 flex flex-wrap items-center justify-center py-3 pl-4 pr-14 rounded-lg text-base font-medium [transition:all_0.5s_ease] border-solid border border-[#f85149] text-[#b22b2b] [&_svg]:text-[#b22b2b] group bg-[linear-gradient(#f851491a,#f851491a)]"
                                        >
                                            <p className="flex flex-row items-center mr-auto gap-x-2">
                                                <svg
                                                    stroke="currentColor"
                                                    fill="none"
                                                    strokeWidth="2"
                                                    viewBox="0 0 24 24"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    height="28"
                                                    width="28"
                                                    className="h-7 w-7"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
                                                    ></path>
                                                    <path d="M12 9v4"></path>
                                                    <path d="M12 17h.01"></path>
                                                </svg>
                                                {LABEL_COLUMNS[index]}
                                            </p>
                                        </div>
                                    </div>
                                ) : null
                            )}
                        </div>
                    </div>
                </div>}
                <div
                    className={"pl-8 py-3 flex justify-start items-center mt-8 mb-16 w-[780px] min-h-16 max-h-[270px] border-2 border-black rounded-2xl"}>
                    <p className={"text-black min-h-2/3 max-h-60 overflow-y-scroll"}>{query}</p>
                </div>
            </div>}
        </div>
    );
};

export default PredictOutput;