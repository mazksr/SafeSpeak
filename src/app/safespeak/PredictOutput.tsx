import React from 'react';

interface Props {
    query: string,
}

const PredictOutput = async ({query}: Props) => {

    const req = query? await fetch("http://127.0.0.1:8000/predict", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // Specify the request body format
            },
            body: JSON.stringify({
                comment: query
            }),
            cache: "no-store"
        }): null

    let isPositive = false;

    if (req && req.ok) {
        const resp = await req.json()
        isPositive = resp.message == 0
        console.log(isPositive)
    } else {
        isPositive = false
    }

    return (
        <div>
            {query && <div className={"mt-6 ml-4 font-bold font-sans text-lg"}>
                {isPositive ? <p className={"text-green-500"}>Tidak Termasuk Komentar Negatif</p> : <div>
                    <p className={"text-red-500"}>Komen Negatif</p>
                    <div className={"flex"}>
                        <p className={"text-black"}>Klasifikasi: </p>
                        <p className={"ml-2 text-red-500"}>Hate Speech</p>
                    </div>
                </div>}
                <div
                    className={"pl-8 flex justify-start items-center mt-8 w-[780px] h-16 border-2 border-black rounded-2xl"}>
                    <p className={"text-black overflow-scroll"}>{query}</p>
                </div>
            </div>}
        </div>
    );
};

export default PredictOutput;