'use client';

import { useState } from "react";

import GiftCardRequestsTable from "./GiftCardRequestsTable";


const GiftCardRequests = () => {
    const [reloadTable, setReloadTable] = useState(false);

    return (
        <>
            <div className="overflow-y-auto w-full h-full scrollbar-hide">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-lg">Gift Card Requests</h2>
                </div>
                <GiftCardRequestsTable reload={reloadTable} />
            </div>
        </>
    );
};

export default GiftCardRequests;
