"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiEdit2Fill, RiStarFill } from "react-icons/ri";
import { toast } from "react-toastify";

import EditStoryModal from "./EditStoryModal";

import { TableProps } from "@/constants/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import CommonTable, { ColumnType } from "@/components/CommonTable";
import { StoryDataType } from "@/modules/story/story.types";
import { getStories, publishStory } from "@/modules/story/story.service";


const StoriesTable: React.FC<TableProps> = ({ reload }) => {
  const [stories, setStories] = useState<StoryDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [publishTarget, setPublishTarget] = useState<StoryDataType | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const [selectedEditStory, setSelectedEditStory] =
    useState<StoryDataType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async (paramPage?: number) => {
    setIsLoading(true);

    try {
      const currentPage = paramPage ?? page;
      const response = await getStories(currentPage, limit);

      if (response.success) {
        setStories(response.successStories);
        setTotalRows(response.totalStories);
        setTotalPages(response.totalPages);
        setPage(currentPage);
      } else {
        setStories([]);
      }
    } catch {
      setStories([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [reload, page, limit]);

  const handlePublishToggle = (service: StoryDataType) => {
    setPublishTarget(service);
    setIsPublishModalOpen(true);
  };

  const handleEditMember = (member: StoryDataType) => {
    setSelectedEditStory(member);
    setIsEditModalOpen(true);
  };

  const confirmPublishToggle = async () => {
    if (!publishTarget) return;

    try {
      const response = await publishStory(
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

  const columns: ColumnType<StoryDataType>[] = [
    {
      header: "Profile",
      accessor: "profileImagePath",
      render: (member) => (
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
          {member.profileImagePath ? (
            <Image
              src={member.profileImagePath}
              alt={member.clientName || "Client Profile"}
              fill
              sizes="48px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[10px] text-gray-400">
              No Image
            </div>
          )}
        </div>
      ),
    },
    {
      header: "Client Name",
      accessor: "clientName",
      render: (member) => (
        <div className="max-w-[200px]">
          <p className="font-medium text-gray-900 truncate">
            {member.clientName}
          </p>
          <p className="text-xs text-gray-500 truncate">
            {member.treatmentName}
          </p>
        </div>
      ),
    },
    {
      header: "Rating",
      accessor: "rating",
      render: (member) => (
        <div className="flex items-center gap-1 text-amber-500">
          <RiStarFill className="w-4 h-4" />
          <span className="text-sm font-medium text-gray-700">
            {member.rating ?? 0}
          </span>
        </div>
      ),
    },
    {
      header: "Publish",
      accessor: "isPublish",
      render: (member) => (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={member.isPublish ?? false}
            className="sr-only peer"
            onChange={() => handlePublishToggle(member)}
          />
          <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-green-500" />
        </label>
      ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (member) => (
        <button
          onClick={() => handleEditMember(member)}
          className="text-gray-600 hover:text-primary transition-colors p-1.5 rounded-md hover:bg-gray-100"
          title="Edit Story"
        >
          <RiEdit2Fill className="w-5 h-5" />
        </button>
      ),
    },
  ];

  // Render content for expanded table rows
  const renderExpandedRow = (story: StoryDataType) => (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
          Treatment:
        </span>
        <span className="text-sm text-gray-800 font-medium">
          {story.treatmentName || "N/A"}
        </span>
      </div>
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-gray-500 block mb-1">
          Comment / Story:
        </span>
        <p className="text-sm text-gray-600 bg-white p-3 rounded-md border border-gray-200 leading-relaxed whitespace-pre-line">
          {story.comment || "No comment provided."}
        </p>
      </div>
    </div>
  );

  return (
    <>
      <CommonTable
        columns={columns}
        data={stories}
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
          } this story?`}
      />

      {selectedEditStory && (
        <EditStoryModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEditStory(null);
          }}
          reloadData={() => fetchData(page)}
          initialValues={selectedEditStory}
        />
      )}
    </>
  );
};

export default StoriesTable;