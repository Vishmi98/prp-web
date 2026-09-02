"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";

import { PackageRequestDataType } from "../../packages.types";
import { getPackageRequests, updatePackageRequestStatus } from "../../packages.service";

import { TableProps } from "@/constants/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import CommonTable, { ColumnType } from "@/components/CommonTable";


const STATUS_SEQUENCE: Record<PackageRequestDataType["status"], PackageRequestDataType["status"][]> = {
  pending: ["contacted", "cancelled"],
  contacted: ["completed", "cancelled"],
  completed: [],
  cancelled: [],
};

const STATUS_COLOR_CLASSES: Record<PackageRequestDataType["status"], string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-300",
  contacted: "bg-blue-100 text-blue-800 border-blue-300",
  completed: "bg-emerald-100 text-emerald-800 border-emerald-300",
  cancelled: "bg-rose-100 text-rose-800 border-rose-300",
};

const PackageRequestsTable: React.FC<TableProps> = ({ reload }) => {
  const [requests, setRequests] = useState<PackageRequestDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedRequest, setSelectedRequest] = useState<PackageRequestDataType | null>(null);
  const [targetStatus, setTargetStatus] = useState<PackageRequestDataType["status"] | null>(null);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchData = async (paramPage?: number) => {
    setIsLoading(true);

    try {
      const currentPage = paramPage ?? page;
      const response = await getPackageRequests(currentPage, limit);

      if (response.success) {
        setRequests(response.requests);
        setTotalRows(response.totalRequests);
        setTotalPages(response.totalPages);
        setPage(currentPage);
      } else {
        setRequests([]);
      }
    } catch {
      setRequests([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [reload, page, limit]);

  const handleOpenStatusModal = (
    request: PackageRequestDataType,
    newStatus: PackageRequestDataType["status"]
  ) => {
    setSelectedRequest(request);
    setTargetStatus(newStatus);
    setIsStatusModalOpen(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedRequest || !targetStatus) return;

    setIsSubmitting(true);
    try {
      const response = await updatePackageRequestStatus(selectedRequest.id, targetStatus);

      if (response.success) {
        toast.success(`Request status updated to ${targetStatus}`);
        fetchData(page);
      } else {
        toast.error(response.message || "Failed to update status");
      }
    } catch {
      toast.error("Error updating request status.");
    } finally {
      setIsSubmitting(false);
      setIsStatusModalOpen(false);
      setSelectedRequest(null);
      setTargetStatus(null);
    }
  };

  const columns: ColumnType<PackageRequestDataType>[] = [
    {
      header: "Package",
      accessor: "packageId",
      render: (req) => (
        <div className="flex items-center gap-3">
          {req.packageInfo?.link && (
            <div className="relative h-20 w-20 overflow-hidden shrink-0 rounded-md border bg-white">
              <Image
                src={req.packageInfo.link || "/images/default-package.png"}
                alt={req.packageInfo.name || "Package"}
                fill
                className="object-cover p-1"
              />
            </div>
          )}
          <div>
            <p className="font-medium text-gray-900">{req.packageInfo?.name || "Package"}</p>
            <p className="text-xs text-gray-500">#{req.packageId}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Customer",
      accessor: "fullName",
      render: (req) => (
        <div>
          <p className="font-medium text-gray-900">{req.fullName}</p>
          <p className="text-xs text-gray-500">{req.phone}</p>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      render: (req) => (
        <p className="text-sm text-gray-600 truncate max-w-50">{req.email}</p>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (req) => (
        <span
          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${STATUS_COLOR_CLASSES[req.status]}`}
        >
          {req.status}
        </span>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (req) => {
        const availableNextStatuses = STATUS_SEQUENCE[req.status];

        if (availableNextStatuses.length === 0) {
          return <span className="text-xs text-gray-400 italic">No actions</span>;
        }

        return (
          <div className="flex items-center gap-2">
            {availableNextStatuses.map((nextStatus) => (
              <button
                key={nextStatus}
                onClick={() => handleOpenStatusModal(req, nextStatus)}
                className={`rounded px-2.5 py-1 text-xs font-medium border transition-colors ${nextStatus === "cancelled"
                  ? "border-rose-200 text-rose-600 hover:bg-rose-50"
                  : "border-slate-300 text-slate-700 hover:bg-slate-100"
                  }`}
              >
                Mark as {nextStatus}
              </button>
            ))}
          </div>
        );
      },
    },
  ];

  return (
    <>
      <CommonTable
        columns={columns}
        data={requests}
        isLoading={isLoading}
        expandable={false}
        page={page}
        limit={limit}
        totalRows={totalRows}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          fetchData(newPage);
        }}
      />

      <ConfirmModal
        isOpen={isStatusModalOpen}
        onClose={() => {
          if (!isSubmitting) {
            setIsStatusModalOpen(false);
            setSelectedRequest(null);
            setTargetStatus(null);
          }
        }}
        onConfirm={confirmStatusChange}
        message={`Are you sure you want to change the status of ${selectedRequest?.fullName}'s request to "${targetStatus}"?`}
      />
    </>
  );
};

export default PackageRequestsTable;
