'use client';

import { useState } from "react";

import SessionRequestsTable from "./SessionRequestsTable";


const SessionRequests = () => {
    const [reloadTable, setReloadTable] = useState(false);

    return (
        <>
            <div className="overflow-y-auto w-full h-full scrollbar-hide">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-lg">Session Requests</h2>
                </div>
                <SessionRequestsTable reload={reloadTable} />
            </div>
        </>
    );
};

export default SessionRequests;
