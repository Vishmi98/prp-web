'use client';

import { useState } from "react";
import { BiPlus } from "react-icons/bi";

import AddSessionModal from "./AddSessionModal";
import SessionsTable from "./SessionsTable";


const Sessions = () => {
    const [open, setOpen] = useState(false);
    const [reloadTable, setReloadTable] = useState(false);

    const handleReload = () => setReloadTable((prev) => !prev);

    return (
        <>
            <div className="overflow-y-auto w-full h-full scrollbar-hide">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-lg">Sessions</h2>
                    <div className="flex justify-end">
                        <button
                            onClick={() => setOpen(true)}
                            className="flex items-center gap-2 bg-black hover:bg-black/80 cursor-pointer text-white text-sm px-3 py-1 rounded-md shadow"
                        >
                            <BiPlus className="w-5 h-5" />
                            Add Session
                        </button>
                        <AddSessionModal
                            isOpen={open}
                            onClose={() => setOpen(false)}
                            handleReload={handleReload}
                        />
                    </div>
                </div>
                <SessionsTable reload={reloadTable} />
            </div>
        </>
    );
};

export default Sessions;
