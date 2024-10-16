import React from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import DeleteButton from "@/app/history/DeleteButton";
import EditButton from "@/app/history/EditButton";
import {cookies} from "next/headers";


interface History {
    Id: number
    Komentar: string
    Sentimen: string
    Klasifikasi: string
}

const HistoryTable = async() => {
    const url = "http://127.0.0.1:8000/history";
    const post = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${cookies().get("access_token")?.value}`
        },
        cache: "no-store"
    })
    const history: History[] = await post.json();

    return (
        <Table className="table-auto mt-5">
            <TableHeader>
                <TableRow className={"border-none bg-[#FFD4CB] hover:bg-[#FFD4CB]"}>
                    <TableHead className="pl-8 w-[100px] text-[#3F0F34] font-extrabold">No</TableHead>
                    <TableHead className="text-center w-2/5 text-[#3F0F34] font-extrabold">Komentar</TableHead>
                    <TableHead className="text-center text-[#3F0F34] font-extrabold">Sentimen</TableHead>
                    <TableHead className="text-center text-[#3F0F34] font-extrabold">Klasifikasi</TableHead>
                    <TableHead className="text-center text-[#3F0F34] font-extrabold">Aksi</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {history ? history.map((h, i) => (
                    <TableRow key={h.Id}>
                        <TableCell className="font-medium pl-8">{i + 1}</TableCell>
                        <TableCell className={"text-center"}>{h.Komentar}</TableCell>
                        <TableCell className="text-center">{h.Sentimen}</TableCell>
                        <TableCell className="text-center">{h.Klasifikasi}</TableCell>
                        <TableCell className="text-center">
                            <div className={"flex justify-center items-center"}>
                                <div className={"mr-1"}>
                                    <EditButton Id={h.Id} Komentar={h.Komentar} Sentimen={h.Sentimen}
                                                Klasifikasi={h.Klasifikasi}/>
                                </div>
                                <div className={"ml-1"}>
                                    <DeleteButton id={h.Id} komentar={h.Komentar}/>
                                </div>
                            </div>
                        </TableCell>
                    </TableRow>
                )) : <TableRow/>}
                <TableRow/>
            </TableBody>

        </Table>
    );
};

export default HistoryTable;