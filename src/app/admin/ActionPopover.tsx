import React from 'react';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import EditButton from "@/app/admin/EditButton";
import DeleteButton from "@/app/admin/DeleteButton";

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

const ActionPopover = (item: Prop) => {
    const h = item.history

    return (
        <Popover>
            <PopoverTrigger asChild className={"md:hidden"}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"
                     fill="#000000">
                    <path
                        d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
                </svg>
            </PopoverTrigger>
            <PopoverContent className="w-auto">
                <div className={"justify-center items-center"}>
                    <div className={"mb-1"}>
                        <EditButton history={h}/>
                    </div>
                    <div className={"mt-1"}>
                        <DeleteButton id={h.Id} komentar={h.Komentar}/>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
};

export default ActionPopover;