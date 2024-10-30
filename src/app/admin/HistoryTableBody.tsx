import React from 'react';
import {TableBody, TableCell, TableRow} from "@/components/ui/table";
import EditButton from "@/app/admin/EditButton";
import DeleteButton from "@/app/admin/DeleteButton";
import ActionPopover from "@/app/admin/ActionPopover";
import {cookies} from "next/headers";

interface History {
    Id: number
    Komentar: string
    Sentimen: string
    HS?: boolean
    Abusive?: boolean
    HS_Individual?: boolean
    HS_Group?: boolean
    HS_Religion?: boolean
    HS_Race?: boolean
    HS_Physical?: boolean
    HS_Gender?: boolean
    HS_Other?: boolean
    HS_Weak?: boolean
    HS_Moderate?: boolean
    HS_Strong?: boolean
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

const HistoryTableBody = async ({search}: { search: string }) => {
    const url = `${process.env.API_URL}/history`;
    const cookie = (await cookies()).get("access_token");
    const post = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${cookie?.value}`
        },
        cache: "no-store"
    })
    const history: History[] = await post.json();

    return (
        <TableBody>
            {history && history.filter(h => h.Komentar.toLowerCase().includes(search.toLowerCase())).map((h, i) => {
                const labels = [
                    h.HS ? LABEL_COLUMNS[0] : null,
                    h.Abusive ? LABEL_COLUMNS[1] : null,
                    h.HS_Individual ? LABEL_COLUMNS[2] : null,
                    h.HS_Group ? LABEL_COLUMNS[3] : null,
                    h.HS_Religion ? LABEL_COLUMNS[4] : null,
                    h.HS_Race ? LABEL_COLUMNS[5] : null,
                    h.HS_Physical ? LABEL_COLUMNS[6] : null,
                    h.HS_Gender ? LABEL_COLUMNS[7] : null,
                    h.HS_Other ? LABEL_COLUMNS[8] : null,
                    h.HS_Weak ? LABEL_COLUMNS[9] : null,
                    h.HS_Moderate ? LABEL_COLUMNS[10] : null,
                    h.HS_Strong ? LABEL_COLUMNS[11] : null
                ].filter(Boolean).join('  ;  ');
                return (
                    <TableRow key={h.Id}>
                        <TableCell className="hidden lg:table-cell font-medium pl-8">{i + 1}</TableCell>
                        <TableCell className="text-center">{h.Komentar}</TableCell>
                        <TableCell className="text-center">{h.Sentimen}</TableCell>
                        <TableCell className="hidden sm:table-cell px-10 text-center">{labels}</TableCell>
                        <TableCell className="text-center hidden md:table-cell">
                            <div>
                                <div className={"flex justify-center items-center"}>
                                    <div className={"mr-1"}>
                                        <EditButton history={h}/>
                                    </div>
                                    <div className={"ml-1"}>
                                        <DeleteButton id={h.Id} komentar={h.Komentar}/>
                                    </div>
                                </div>
                            </div>
                        </TableCell>
                        <TableCell className="text-center md:hidden">
                            <ActionPopover history={h}/>
                        </TableCell>
                    </TableRow>
                );
            })}
            <TableRow/>
        </TableBody>
    );
};

export default HistoryTableBody;