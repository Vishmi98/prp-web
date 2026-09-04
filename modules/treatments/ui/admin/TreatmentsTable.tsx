"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiEdit2Fill } from "react-icons/ri";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiPlus } from "react-icons/pi";
import { toast } from "react-toastify";

import { TreatmentDataType } from "../../treatments.types";
import {
  deleteTreatment,
  getTreatments,
  publishTreatment,
} from "../../treatments.service";
import EditTreatmentModal from "./EditTreatmentModal";
import AddTreatmentResultModal from "./AddTreatmentResultModal";

import { TableProps } from "@/constants/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import CommonTable, { ColumnType } from "@/components/CommonTable";


const TreatmentsTable: React.FC<TableProps> = ({ reload }) => {
  const [treatments, setTreatments] = useState<TreatmentDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);

  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [publishTarget, setPublishTarget] =
    useState<TreatmentDataType | null>(null);
  const [deleteTarget, setDeleteTarget] =
    useState<TreatmentDataType | null>(null);
  const [selectedEditTreatment, setSelectedEditTreatment] =
    useState<TreatmentDataType | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] =
    useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedResultTreatment, setSelectedResultTreatment] = useState<TreatmentDataType | null>(null);
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const fetchData = async (paramPage?: number) => {
    setIsLoading(true);
    try {
      const currentPage = paramPage ?? page;
      const response =
        await getTreatments(currentPage, limit);

      if (response.success) {
        setTreatments(response.treatments);
        setTotalRows(response.totalTreatments);
        setTotalPages(response.totalPages);
        setPage(currentPage);
      } else {
        setTreatments([]);
      }
    } catch {
      setTreatments([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [reload, page]);

  const handlePublishToggle = (
    treatment: TreatmentDataType
  ) => {
    setPublishTarget(treatment);
    setIsPublishModalOpen(true);
  };

  const confirmPublishToggle = async () => {
    if (!publishTarget) return;

    try {
      const response =
        await publishTreatment(
          publishTarget.id,
          !publishTarget.isPublish
        );

      if (response.success) {
        toast.success(response.message);
        fetchData(page);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error(
        "Error updating publish status"
      );
    } finally {
      setPublishTarget(null);
      setIsPublishModalOpen(false);
    }
  };

  const handleEditTreatment = (treatment: TreatmentDataType) => {
    setSelectedEditTreatment(treatment);
    setIsEditModalOpen(true);
  };

  const handleDeleteTreatment = (treatment: TreatmentDataType) => {
    setDeleteTarget(treatment);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteTreatment = async () => {
    if (!deleteTarget) return;

    try {
      const response = await deleteTreatment(deleteTarget.id);

      if (response.success) {
        toast.success(response.message);
        fetchData(page);
      } else {
        toast.error(response.message);
      }
    } catch {
      toast.error("Error deleting treatment");
    } finally {
      setDeleteTarget(null);
      setIsDeleteModalOpen(false);
    }
  };

  const columns: ColumnType<TreatmentDataType>[] = [
    {
      header: "Title",
      accessor: "title",
    },
    {
      header: "Treatments",
      accessor: "overview.numberOfTreatments",
      render: (treatment) =>
        `${treatment.overview.numberOfTreatments} Sessions`,
    },
    {
      header: "Price",
      accessor: "",
      render: (treatment) => (
        <div>
          {treatment.overview.pricing.amount
            ? `${treatment.overview.pricing.currency} ${treatment.overview.pricing.amount}`
            : "Contact Us"
          }
        </div>
      ),
    },
    {
      header: "Publish",
      accessor: "",
      render: (treatment) => (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={treatment.isPublish}
            className="sr-only peer"
            onChange={() => handlePublishToggle(treatment)}
          />

          <div className="relative w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
        </label>
      ),
    },
    {
      header: "Results",
      accessor: "",
      render: (treatment) => (
        <button
          onClick={() => {
            setSelectedResultTreatment(
              treatment
            );
            setIsResultModalOpen(true);
          }}
          className="bg-black text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <PiPlus /> Add
        </button>
      )
    },
    {
      header: "",
      accessor: "",
      render: (treatment) => (
        <div className="space-x-5">
          <button
            onClick={() => handleEditTreatment(treatment)}
            className="text-blue-500 hover:text-blue-700 transition-colors cursor-pointer"
          >
            <RiEdit2Fill className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleDeleteTreatment(treatment)}
            className="text-red-500 hover:text-red-700 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:text-red-500"
            title={treatment.isPublish ? "Published treatments cannot be deleted" : "Delete Treatment"}
            disabled={treatment.isPublish}
          >
            <RiDeleteBin6Line className="w-4 h-4" />
          </button>
        </div>
      ),
    }
  ];

  return (
    <>
      <CommonTable
        columns={columns}
        data={treatments}
        isLoading={isLoading}
        expandable
        page={page}
        limit={limit}
        totalRows={totalRows}
        totalPages={totalPages}
        onPageChange={(newPage) => {
          fetchData(newPage);
        }}
        renderExpandedRow={(treatment) => (
          <div
            className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
            p-4
            "
          >
            {/* Images */}
            <div className="space-y-5">
              {
                treatment.thumbnailImagePath &&
                <div>
                  <h3 className="font-semibold mb-2">
                    Thumbnail
                  </h3>

                  <Image
                    src={
                      treatment.thumbnailImagePath
                    }
                    alt={treatment.title}
                    width={200}
                    height={120}
                    className="
                    rounded-lg
                    border
                    object-cover
                    "
                  />
                </div>
              }

              {
                treatment.coverImagePath &&
                <div>
                  <h3 className="font-semibold mb-2">
                    Cover Image
                  </h3>

                  <Image
                    src={
                      treatment.coverImagePath
                    }
                    alt={treatment.title}
                    width={400}
                    height={200}
                    className="
                    rounded-lg
                    border
                    object-cover
                    "
                  />
                </div>
              }

              {/* Before After */}
              {
                treatment.results?.length > 0 &&
                <div>
                  <h3 className="font-semibold mb-3">
                    Before / After Results
                  </h3>

                  <div
                    className="
                    grid
                    grid-cols-2
                    gap-3
                    "
                  >
                    {
                      treatment.results.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="space-y-2"
                          >
                            <Image
                              src={
                                item.beforeImagePath
                              }
                              alt="Before"
                              width={150}
                              height={100}
                              className="
                              rounded
                              border
                              object-cover
                              "
                            />
                          </div>
                        )
                      )
                    }
                  </div>
                </div>
              }
            </div>

            {/* Details */}
            <div className="space-y-4">
              <div>
                <span className="font-semibold">
                  Slug:
                </span>
                <p className="text-blue-600">
                  {treatment.slug}
                </p>
              </div>

              <div>
                <span className="font-semibold">
                  Short Description:
                </span>
                <p>
                  {treatment.shortDescription}
                </p>
              </div>

              <div>
                <span className="font-semibold">
                  Treatment Time:
                </span>
                <p>
                  {treatment.overview.treatmentTime || "-"}
                </p>
              </div>

              <div>
                <span className="font-semibold">
                  Recovery Time:
                </span>
                <p>
                  {treatment.overview.recoveryTime || "-"}
                </p>
              </div>

              <div>
                <span className="font-semibold">
                  Benefits:
                </span>

                <ul className="list-disc ml-5">
                  {
                    treatment.benefits.map(
                      (item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )
                  }
                </ul>
              </div>

              <div>
                <span className="font-semibold">
                  Procedure Steps:
                </span>

                <ol className="list-decimal ml-5">
                  {
                    treatment.procedureSteps.map(
                      (item, index) => (
                        <li key={index}>
                          {item}
                        </li>
                      )
                    )
                  }
                </ol>
              </div>
            </div>
          </div>
        )}
      />

      {/* Publish Modal */}
      <ConfirmModal
        isOpen={isPublishModalOpen}
        onClose={() => {
          setIsPublishModalOpen(false);
          setPublishTarget(null);
        }}
        onConfirm={confirmPublishToggle}
        message={`Are you sure you want to ${publishTarget?.isPublish ? "unpublish" : "publish"
          } this treatment?`}
      />

      {/* Delete Modal - Cleaned up and moved to root JSX level */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeleteTarget(null);
        }}
        onConfirm={confirmDeleteTreatment}
        message={`Are you sure you want to delete ${deleteTarget?.title || "this treatment"
          }?`}
      />

      {selectedEditTreatment && (
        <EditTreatmentModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEditTreatment(null);
          }}
          reloadData={fetchData}
          initialValues={selectedEditTreatment}
        />
      )}

      {selectedResultTreatment && (
        <AddTreatmentResultModal
          isOpen={isResultModalOpen}
          treatment={selectedResultTreatment}
          onClose={() => {
            setIsResultModalOpen(false);
            setSelectedResultTreatment(null);
          }}
          reload={() => fetchData(page)}
        />
      )
      }
    </>
  );

};

export default TreatmentsTable;