"use client"

import React, {useEffect, useState, useActionState} from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {handleEdit} from "@/app/admin/Actions";
import toast from "react-hot-toast";
import {revalidatePath} from "next/cache";

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

interface Prop {
    history: History
}

const intialState = {
    message: "",
    success: false
}

const EditButton = (item: Prop) => {
    const [state, formAction, loading] = useActionState(handleEdit, intialState);
    const [open, setOpen] = useState(false)
    const history = item.history
    const [isPositive, setPositive] = useState(history.Sentimen == "Positive")

    useEffect(() => {
        state.message = "";
        state.success = false;
        setPositive(history.Sentimen == "Positive")
    }, [open]);

    useEffect(() => {
        if (loading) {
            toast.dismiss()
            toast.loading("Menyimpan perubahan...")
        }
        if (state.message && state.success) {
            toast.dismiss()
            toast.success("Berhasil mengubah")
        } else if (state.message && !state.success) {
            toast.dismiss()
            toast.error("Gagal mengubah")
        }
    }, [loading]);

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
                        <form action={formAction} className="flex flex-col w-full">
                            <input defaultValue={history.Id} name={"id"} className={"invisible"}/>
                            <label htmlFor="komentar" className={"mt-2"}>Komentar:</label>
                            <textarea name="komentar" id="komentar"
                                      className="mt-1 resize-none w-full bg-gray-100 text-gray-800 border-0 rounded-md p-2 mb-4 focus:bg-gray-200 focus:outline-none focus:ring-1 focus:ring-blue-500 transition ease-in-out duration-150"
                                      placeholder="Komentar"
                                      defaultValue={history.Komentar}/>

                            <label htmlFor="sentimen" className={""}>Sentimen:</label>
                            <div className={"flex items-center"}>
                                <select id={"sentimen"} name={"Sentimen"}
                                        onChange={e => setPositive(e.target.value == "Positive")}
                                        className="w-full mt-1 bg-white h-10 appearance-none border-2 border-gray-300 px-4">
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
                                <div className="space-y-2 w-full">

                                    <label
                                        className={`${!isPositive && "hidden"} has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow`}
                                    >
                                        <div className="flex items-center space-x-5">
                                            <div className="flex items-center">
                                                <span> None </span>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            value="None"
                                            className="checked:border-indigo-500 h-5 w-5"
                                            checked={isPositive} readOnly={true}
                                        />
                                    </label>

                                    {!isPositive &&
                                        <div className={"h-60 sm:h-72 overflow-y-auto px-2 pt-2 grid grid-cols-2 gap-4"}>
                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Hate Speech </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="HS"
                                                    value="HS"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.HS}
                                                />
                                            </label>


                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Abusive Language </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="Abusive"
                                                    value="Abusive"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.Abusive}
                                                />
                                            </label>


                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Hate Speech Targeted to an Individual </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="HS_Individual"
                                                    value="HS_Individual"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.HS_Individual}
                                                />
                                            </label>


                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Hate Speech Targeted to a Group </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="HS_Group"
                                                    value="HS_Group"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.HS_Group}
                                                />
                                            </label>


                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Hate Speech to Religion/Creed </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="HS_Religion"
                                                    value="HS_Religion"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.HS_Religion}
                                                />
                                            </label>


                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Hate Speech to Race/Ethnicity </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="HS_Race"
                                                    value="HS_Race"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.HS_Race}
                                                />
                                            </label>


                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Hate Speech to Physical/Disability </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="HS_Physical"
                                                    value="HS_Physical"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.HS_Physical}
                                                />
                                            </label>


                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Hate Speech to Gender/Sexual Orientation </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="HS_Gender"
                                                    value="HS_Gender"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.HS_Gender}
                                                />
                                            </label>


                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Hate Speech to Other Invective/Slander </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="HS_Other"
                                                    value="HS_Other"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.HS_Other}
                                                />
                                            </label>


                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Weak Hate Speech </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="HS_Weak"
                                                    value="HS_Weak"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.HS_Weak}
                                                />
                                            </label>


                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Moderate Hate Speech </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="HS_Moderate"
                                                    value="HS_Moderate"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.HS_Moderate}
                                                />
                                            </label>


                                            <label
                                                className="has-[:checked]:bg-white/30 has-[:checked]:text-indigo-900 has-[:checked]:ring-indigo-200 has-[:checked]:ring-2 cursor-pointer bg-white/40 hover:bg-white/20 w-full p-4 rounded-md flex justify-between items-center shadow"
                                            >
                                                <div className="flex items-center space-x-5">
                                                    <div className="flex items-center">
                                                        <span> Strong Hate Speech </span>
                                                    </div>
                                                </div>
                                                <input
                                                    type="checkbox"
                                                    name="HS_Strong"
                                                    value="HS_Strong"
                                                    className="checked:border-indigo-500 h-5 w-5"
                                                    defaultChecked={history.HS_Strong}
                                                />
                                            </label></div>}
                                </div>
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