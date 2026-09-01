"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiEdit2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

import EditGiftCardModal from "./EditGiftCardModal";
import { GiftCardDataType } from "../../pricing.types";
import { getGiftCards, publishGiftCard } from "../../pricing.service";

import { TableProps } from "@/constants/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import CommonTable, { ColumnType } from "@/components/CommonTable";


const GiftCardsTable: React.FC<TableProps> = ({ reload }) => {
  const [giftCards, setGiftCards] = useState<GiftCardDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [publishTarget, setPublishTarget] = useState<GiftCardDataType | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const [selectedEditCard, setSelectedEditCard] =
    useState<GiftCardDataType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async (paramPage?: number) => {
    setIsLoading(true);

    try {
      const currentPage = paramPage ?? page;
      const response = await getGiftCards(currentPage, limit);

      if (response.success) {
        setGiftCards(response.cards);
        setTotalRows(response.totalCards);
        setTotalPages(response.totalPages);
        setPage(currentPage);
      } else {
        setGiftCards([]);
      }
    } catch {
      setGiftCards([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [reload, page, limit]);

  const handlePublishToggle = (service: GiftCardDataType) => {
    setPublishTarget(service);
    setIsPublishModalOpen(true);
  };

  const handleEditService = (service: GiftCardDataType) => {
    setSelectedEditCard(service);
    setIsEditModalOpen(true);
  };

  const confirmPublishToggle = async () => {
    if (!publishTarget) return;

    try {
      const response = await publishGiftCard(
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

  const columns: ColumnType<GiftCardDataType>[] = [
    {
      header: "Image",
      accessor: "imagePath",
      render: (giftCard) => (
        <div className="relative w-30 h-15 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
          {giftCard.imagePath ? (
            <Image
              src={giftCard.imagePath}
              alt={giftCard.title}
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
      render: (giftCard) => (
        <div className="max-w-[220px]">
          <p className="line-clamp-2 font-medium text-gray-900">{giftCard.title}</p>
        </div>
      ),
    },
    {
      header: "Description",
      accessor: "description",
      render: (giftCard) => (
        <div className="max-w-[320px]">
          <p className="line-clamp-2 text-sm text-gray-600">{giftCard.description}</p>
        </div>
      ),
    },
    {
      header: "Publish",
      accessor: "",
      render: (giftCard) => (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={giftCard.isPublish}
            className="sr-only peer"
            onChange={() => handlePublishToggle(giftCard)}
          />
          <div className="relative w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
        </label>
      ),
    },
    {
      header: "Edit",
      accessor: "",
      render: (giftCard) => (
        <button
          onClick={() => handleEditService(giftCard)}
          className="text-primary hover:text-primary/80 transition-colors p-1"
          title="Edit Service"
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
        data={giftCards}
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
        isOpen={isPublishModalOpen}
        onClose={() => {
          setIsPublishModalOpen(false);
          setPublishTarget(null);
        }}
        onConfirm={confirmPublishToggle}
        message={`Are you sure you want to ${publishTarget?.isPublish ? "unpublish" : "publish"
          } this gift card?`}
      />

      {selectedEditCard && (
        <EditGiftCardModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEditCard(null);
          }}
          reloadData={() => fetchData(page)}
          initialValues={selectedEditCard}
        />
      )}
    </>
  );
};

export default GiftCardsTable;