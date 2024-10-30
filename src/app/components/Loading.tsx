import React from 'react';
import "./styles.css"
import {TableBody, TableCell, TableRow} from "@/components/ui/table";

const LoadingAnim = () => {
    return (
        <div className="flex flex-row gap-2">
            <div className="animate-pulse bg-gray-300 w-12 h-12 rounded-full"></div>
            <div className="flex flex-col gap-2">
                <div className="animate-pulse bg-gray-300 w-28 h-5 rounded-full"></div>
                <div className="animate-pulse bg-gray-300 w-36 h-5 rounded-full"></div>
            </div>
        </div>

    )
}

const Loading = () => {
    const array = [1, 2, 3, 4, 5]

    return (
        <TableBody>
            {array.map(e =>
                <TableRow key={e}>
                    <TableCell className="hidden lg:table-cell font-medium pl-8"><LoadingAnim/></TableCell>
                    <TableCell className="text-center"><LoadingAnim/></TableCell>
                    <TableCell className="text-center"><LoadingAnim/></TableCell>
                    <TableCell className="hidden sm:table-cell px-10 text-center"><LoadingAnim/></TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                        <LoadingAnim/>
                    </TableCell>
                    <TableCell className="text-center md:hidden">
                        <LoadingAnim/>
                    </TableCell>
                </TableRow>
            )}
        </TableBody>


    );
};


import ActionPopover from "@/app/admin/ActionPopover";

export default Loading;