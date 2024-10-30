import React, {Suspense} from 'react';
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";

import HistoryTableBody from "@/app/admin/HistoryTableBody";
import Loading from "@/app/components/Loading";

const HistoryTable = ({search}: { search: string }) => {

    return (
        <Table className="table-auto mt-5 overflow-y-hidden">
            <TableHeader>
                <TableRow className={"border-none bg-[#FFD4CB] hover:bg-[#FFD4CB]"}>
                    <TableHead
                        className="hidden lg:table-cell pl-8 w-[100px] text-[#3F0F34] font-extrabold">No</TableHead>
                    <TableHead className="text-center w-2/6 text-[#3F0F34] font-extrabold">Komentar</TableHead>
                    <TableHead className="text-center text-[#3F0F34] font-extrabold">Sentimen</TableHead>
                    <TableHead
                        className="hidden sm:table-cell text-center w-2/6 text-[#3F0F34] font-extrabold">Klasifikasi</TableHead>
                    <TableHead className="text-center text-[#3F0F34] font-extrabold">
                        <h1 className={"hidden md:block"}>Aksi</h1>
                        <h1 className={"md:hidden"}></h1>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <Suspense key={search} fallback={<TableBody><TableRow><TableCell className={"col-span-3 sm:col-span-4 md:col-end-5 lg:col-span-6"}><Loading/></TableCell></TableRow></TableBody>}>
                <HistoryTableBody search={search}/>
            </Suspense>
        </Table>
    );
};

export default HistoryTable;