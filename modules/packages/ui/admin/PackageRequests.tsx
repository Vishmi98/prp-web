'use client';

import { useState } from "react";

import PackageRequestsTable from "./PackageRequestsTable";


const PackageRequests = () => {
    const [reloadTable, setReloadTable] = useState(false);

    return (
        <>
            <div className="overflow-y-auto w-full h-full scrollbar-hide">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="font-semibold text-lg">Package Requests</h2>
                </div>
                <PackageRequestsTable reload={reloadTable} />
            </div>
        </>
    );
};

export default PackageRequests;
