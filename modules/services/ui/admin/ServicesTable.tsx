"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiEdit2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

import EditServiceModal from "./EditServiceModal";
import { ServiceDataType } from "../../services.types";
import { getServices, publishService } from "../../services.service";

import { TableProps } from "@/constants/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import CommonTable, { ColumnType } from "@/components/CommonTable";


const ServicesTable: React.FC<TableProps> = ({ reload }) => {
  const [services, setServices] = useState<ServiceDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [publishTarget, setPublishTarget] = useState<ServiceDataType | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const [selectedEditService, setSelectedEditService] =
    useState<ServiceDataType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async (paramPage?: number) => {
    setIsLoading(true);

    try {
      const currentPage = paramPage ?? page;
      const response = await getServices(currentPage, limit);

      if (response.success) {
        setServices(response.services);
        setTotalRows(response.totalServices);
        setTotalPages(response.totalPages);
        setPage(currentPage);
      } else {
        setServices([]);
      }
    } catch {
      setServices([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [reload, page, limit]);

  const handlePublishToggle = (service: ServiceDataType) => {
    setPublishTarget(service);
    setIsPublishModalOpen(true);
  };

  const handleEditService = (service: ServiceDataType) => {
    setSelectedEditService(service);
    setIsEditModalOpen(true);
  };

  const confirmPublishToggle = async () => {
    if (!publishTarget) return;

    try {
      const response = await publishService(
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

  const columns: ColumnType<ServiceDataType>[] = [
    {
      header: "Image",
      accessor: "thumbnailImagePath",
      render: (service) => (
        <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
          {service.thumbnailImagePath ? (
            <Image
              src={service.thumbnailImagePath}
              alt={service.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No Image
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Title",
      accessor: "title",
      render: (service) => (
        <div className="max-w-[220px]">
          <p className="line-clamp-2 font-medium text-gray-900">{service.title}</p>
        </div>
      ),
    },
    {
      header: "Description",
      accessor: "description",
      render: (service) => (
        <div className="max-w-[320px]">
          <p className="line-clamp-2 text-sm text-gray-600">{service.description}</p>
        </div>
      ),
    },
    {
      header: "Publish",
      accessor: "",
      render: (service) => (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={service.isPublish}
            className="sr-only peer"
            onChange={() => handlePublishToggle(service)}
          />
          <div className="relative w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
        </label>
      ),
    },
    {
      header: "Edit",
      accessor: "",
      render: (service) => (
        <button
          onClick={() => handleEditService(service)}
          className="text-primary hover:text-primary/80 transition-colors p-1"
          title="Edit Service"
        >
          <RiEdit2Fill className="w-5 h-5" />
        </button>
      ),
    },
  ];

  // Render expanded row details
  const renderExpandedRow = (service: ServiceDataType) => (
    <div className="p-4 bg-gray-50/80 rounded-lg flex gap-4 text-sm text-gray-700">
      {service.thumbnailImagePath && (
        <div className="relative w-28 h-28 rounded-md overflow-hidden flex-shrink-0 border border-gray-200">
          <Image
            src={service.thumbnailImagePath}
            alt={service.title}
            fill
            className="object-cover"
          />
        </div>
      )}
      <div className="space-y-2">
        <p className="font-semibold text-gray-900">{service.title}</p>
        <p className="text-gray-600 leading-relaxed">{service.description}</p>
      </div>
    </div>
  );

  return (
    <>
      <CommonTable
        columns={columns}
        data={services}
        isLoading={isLoading}
        expandable
        renderExpandedRow={renderExpandedRow}
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
          } this service?`}
      />

      {selectedEditService && (
        <EditServiceModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEditService(null);
          }}
          reloadData={() => fetchData(page)}
          initialValues={selectedEditService}
        />
      )}
    </>
  );
};

export default ServicesTable;