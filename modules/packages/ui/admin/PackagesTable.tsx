"use client";

import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

import { PackageDataType } from "../../packages.types";
import { getPackages, publishPackage } from "../../packages.service";

import { TableProps } from "@/constants/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import CommonTable, { ColumnType } from "@/components/CommonTable";
import EditPackageModal from "./EditPackageModal";


const PackagesTable: React.FC<TableProps> = ({ reload }) => {
  const [packages, setPAckages] = useState<PackageDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [publishTarget, setPublishTarget] = useState<PackageDataType | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const [selectedEditPackage, setSelectedEditPackage] =
    useState<PackageDataType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async (paramPage?: number) => {
    setIsLoading(true);

    try {
      const currentPage = paramPage ?? page;
      const response = await getPackages(currentPage, limit);

      // PackagesTable.tsx
      if (response.success) {
        setPAckages(response.packages);
        const total = response.totalPackages || 0;
        setTotalRows(total);
        // Guarantee totalPages is derived correctly:
        setTotalPages(response.totalPages || Math.ceil(total / limit) || 1);
        setPage(currentPage);
      } else {
        setPAckages([]);
      }
    } catch {
      setPAckages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [reload, page, limit]);

  const handlePublishToggle = (service: PackageDataType) => {
    setPublishTarget(service);
    setIsPublishModalOpen(true);
  };

  const handleEditPackage = (service: PackageDataType) => {
    setSelectedEditPackage(service);
    setIsEditModalOpen(true);
  };

  const confirmPublishToggle = async () => {
    if (!publishTarget) return;

    try {
      const response = await publishPackage(
        publishTarget.id,
        !publishTarget.isPublish
      );

      if (response.success) {
        toast.success(response.message);
        fetchData(page);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating publish status");
    } finally {
      setPublishTarget(null);
      setIsPublishModalOpen(false);
    }
  };

  const columns: ColumnType<PackageDataType>[] = [
    {
      header: "Title",
      accessor: "title",
      render: (pkg) => (
        <div className="max-w-[220px]">
          <p className="line-clamp-2">{pkg.name}</p>
        </div>
      ),
    },
    {
      header: "Category",
      accessor: "category",
      render: (pkg) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {pkg.category || "N/A"}
        </span>
      ),
    },
    {
      header: "Price ($)",
      accessor: "price",
      render: (pkg) => (
        <span className="font-semibold text-gray-900">{pkg.price.toFixed(2)}</span>
      ),
    },
    {
      header: "Sessions",
      accessor: "sessionsCount",
      render: (pkg) => (
        <span className="text-sm text-gray-600">
          {pkg.sessionsCount ? `${pkg.sessionsCount}` : "-"}
        </span>
      ),
    },
    {
      header: "Link",
      accessor: "link",
      render: (pkg) =>
        pkg.link ? (
          <a
            href={pkg.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-600 hover:underline max-w-[150px] truncate block"
          >
            {pkg.link}
          </a>
        ) : (
          <span className="text-xs text-gray-400">N/A</span>
        ),
    },
    {
      header: "Publish",
      accessor: "isPublish",
      render: (pkg) => (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={Boolean(pkg.isPublish)}
            className="sr-only peer"
            onChange={() => handlePublishToggle(pkg)}
          />
          <div className="relative w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
        </label>
      ),
    },
    {
      header: "Edit",
      accessor: "id",
      render: (pkg) => (
        <button
          onClick={() => handleEditPackage(pkg)}
          className="text-primary hover:text-primary/80 transition-colors p-1"
          title="Edit Package"
        >
          <RiEdit2Fill className="w-5 h-5" />
        </button>
      ),
    },
  ];

  return (
    <>
      <CommonTable
        columns={columns}
        data={packages}
        isLoading={isLoading}
        expandable
        page={page}
        limit={limit}
        totalRows={totalRows}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          fetchData(newPage);
        }}
      />

      <ConfirmModal
        isOpen={isPublishModalOpen}
        onClose={() => {
          setIsPublishModalOpen(false);
          setPublishTarget(null);
        }}
        onConfirm={confirmPublishToggle}
        message={`Are you sure you want to ${publishTarget?.isPublish ? "unpublish" : "publish"
          } this package?`}
      />

      {selectedEditPackage && (
        <EditPackageModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEditPackage(null);
          }}
          reloadData={() => fetchData(page)}
          initialValues={selectedEditPackage}
        />
      )}
    </>
  );
};

export default PackagesTable;