"use client"

import React, {useEffect, useState} from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {handleEdit} from "@/app/history/Actions";
import {useFormState} from "react-dom";

interface History {
    Id: number
    Komentar: string
    Sentimen: string
    Klasifikasi: string
}

const intialState = {
    message: "",
    success: true
}

const EditButton = (history: History) => {
    const [state, formAction] = useFormState(handleEdit, intialState);
    const [open, setOpen] = useState(false)

    useEffect(() => {
        state.message = "";
    }, [open]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className={"h-8 w-24 bg-[#FAE599] rounded-lg"}>Edit</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <div>
                            <div className={"flex justify-center items-center"}>
                                <svg xmlns="http://www.w3.org/2000/svg" height="48px" viewBox="0 -960 960 960"
                                     width="48px" fill="#000000">
                                    <path
                                        d="M180-180h44l472-471-44-44-472 471v44Zm-60 60v-128l575-574q8-8 19-12.5t23-4.5q11 0 22 4.5t20 12.5l44 44q9 9 13 20t4 22q0 11-4.5 22.5T823-694L248-120H120Zm659-617-41-41 41 41Zm-105 64-22-22 44 44-22-22Z"/>
                                </svg>
                            </div>
                        </div>
                    </DialogTitle>
                    <DialogDescription className={"flex justify-center items-center"}>
                        <form action={formAction} className="flex flex-col">
                            <input value={history.Id} name={"id"} className={"invisible"}/>
                            <label htmlFor="komentar" className={"mt-2"}>Komentar:</label>
                            <textarea name="komentar" id="komentar"
                                      className="mt-1 resize-none w-[355px] bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                      placeholder="Komentar">{history.Komentar}</textarea>

                            <label htmlFor="sentimen" className={""}>Sentimen:</label>
                            <div className={"flex items-center"}>
                                <select id={"sentimen"} name={"sentimen"}
                                        className="w-[355px] mt-1 bg-white h-10 appearance-none border-2 border-gray-300 px-4">
                                    <option value={"Positive"} selected={history.Sentimen == "Positive"}>Positive
                                    </option>
                                    <option value={"Negative"} selected={history.Sentimen == "Negative"}>Negative
                                    </option>
                                </select>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px" fill="#000000">
                                    <path d="M480-360 280-560h400L480-360Z"/>
                                </svg>
                            </div>

                            <label htmlFor="hateSpeechLabels" className={"mt-2"}>Klasifikasi:</label>
                            <div className={"flex items-center"}>
                                <select id="hateSpeechLabels" name="hateSpeechLabels"
                                        className="w-[355px] mt-1 bg-white h-10 appearance-none border-2 border-gray-300 px-4">
                                    <option value="None" selected={!history.Klasifikasi}>None</option>
                                    <option value="HS" selected={history.Klasifikasi == 'HS'}>Hate Speech</option>
                                    <option value="Abusive" selected={history.Klasifikasi == 'Abusive'}>Abusive Language
                                    </option>
                                    <option value="HS_Individual" selected={history.Klasifikasi == 'HS_Individual'}>Hate
                                        Speech Targeted to an Individual
                                    </option>
                                    <option value="HS_Group" selected={history.Klasifikasi == 'HS_Group'}>Hate Speech
                                        Targeted to a Group
                                    </option>
                                    <option value="HS_Religion" selected={history.Klasifikasi == 'HS_Religion'}>Hate
                                        Speech
                                        Related to Religion/Creed
                                    </option>
                                    <option value="HS_Race" selected={history.Klasifikasi == 'HS_Race'}>Hate Speech
                                        Related
                                        to Race/Ethnicity
                                    </option>
                                    <option value="HS_Physical" selected={history.Klasifikasi == 'HS_Physical'}>Hate
                                        Speech
                                        Related to Physical/Disability
                                    </option>
                                    <option value="HS_Gender" selected={history.Klasifikasi == 'HS_Gender'}>Hate Speech
                                        Related to Gender/Sexual Orientation
                                    </option>
                                    <option value="HS_Other" selected={history.Klasifikasi == 'HS_Other'}>Hate Speech
                                        Related to Other Invective/Slander
                                    </option>
                                    <option value="HS_Weak" selected={history.Klasifikasi == 'HS_Weak'}>Weak Hate Speech
                                    </option>
                                    <option value="HS_Moderate" selected={history.Klasifikasi == 'HS_Moderate'}>Moderate
                                        Hate Speech
                                    </option>
                                    <option value="HS_Strong" selected={history.Klasifikasi == 'HS_Strong'}>Strong Hate
                                        Speech
                                    </option>
                                </select>
                                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960"
                                     width="24px" fill="#000000">
                                    <path d="M480-360 280-560h400L480-360Z"/>
                                </svg>
                            </div>
                            <div className={"flex justify-center items-center w-full mt-12"}>
                                <button
                                    className={"rounded-xl h-9 w-24 font-bold text-white bg-green-500"}>Simpan
                                </button>
                            </div>
                        </form>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    {state.message && <p className={"font-bold text-black "}>{state.message}</p>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditButton;