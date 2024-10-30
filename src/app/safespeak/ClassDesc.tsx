import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

interface Class {
    name: string,
    desc: string
}

const classes: Class[] = [
    {
        name: "Ujaran Kebencian",
        desc: "Perilaku, tulisan, ataupun pertunjukan yang dilarang karena dapat memicu terjadinya tindakan kekerasan dan sikap prasangka entah dari pihak pelaku, pernyataan tersebut, atau korban dari tindakan tersebut."
    },
    {
        name: "Bahasa Kasar",
        desc: "Perilaku atau bahasa yang bersifat kasar, menghina, atau merugikan orang lain, baik secara fisik maupun verbal."
    },
    {
        name: "Ujaran Kebencian terhadap individu",
        desc: "Ujaran kebencian yang ditujukan kepada satu orang tertentu, biasanya berdasarkan sifat pribadi atau identitasnya."
    },
    {
        name: "Ujaran Kebencian terhadap grup",
        desc: "Ujaran kebencian yang ditujukan kepada sekelompok orang berdasarkan atribut bersama, seperti etnisitas, kebangsaan, atau kepercayaan."
    },
    {
        name: "Ujaran Kebencian terhadap agama",
        desc: "Ujaran kebencian yang menargetkan agama tertentu, termasuk keyakinan atau praktiknya."
    },
    {
        name: "Ujaran Kebencian terhadap ras",
        desc: "Ujaran kebencian yang menargetkan seseorang atau kelompok berdasarkan ras mereka."
    },
    {
        name: "Ujaran Kebencian terhadap fisik",
        desc: "Ujaran kebencian yang menargetkan penampilan fisik atau kondisi tubuh seseorang, seperti warna kulit, bentuk tubuh, atau penampilan lainnya."
    },
    {
        name: "Ujaran Kebencian terhadap gender",
        desc: "Ujaran kebencian yang menargetkan seseorang berdasarkan jenis kelamin atau kelompok gender mereka."
    },
    {
        name: "Ujaran Kebencian Lainnya",
        desc: "Bentuk ujaran kebencian yang tidak termasuk dalam kategori spesifik seperti agama, ras, gender, atau fisik, namun tetap memiliki tujuan merendahkan, menghina, atau menyerang individu atau kelompok."
    },
    {
        name: "Tingkat Ujaran Kebencian",
        desc: "Klasifikasi berdasarkan intensitas ujaran kebencian: kuat, sedang, dan lemah. 'Kuat' mengacu pada ujaran dengan ancaman serius atau serangan tajam, 'Sedang' menunjukkan penghinaan atau ketidaksenangan tanpa ancaman eksplisit, dan 'Lemah' mencakup sindiran atau komentar negatif ringan."
    }
];


const ClassDesc = () => {
    return (
        <Accordion type="single" collapsible>
            {classes.map((c, i) =>
                <AccordionItem key={i} value={i.toString()}>
                    <AccordionTrigger className={"text-left font-bold text-md sm:text-lg hover:no-underline"}>{c.name}</AccordionTrigger>
                    <AccordionContent className={"px-4"}>
                        {c.desc}
                    </AccordionContent>
                </AccordionItem>
            )}
        </Accordion>

    );
};

export default ClassDesc;