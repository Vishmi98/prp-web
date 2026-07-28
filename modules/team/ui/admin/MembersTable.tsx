"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { RiEdit2Fill } from "react-icons/ri";
import { toast } from "react-toastify";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";

import EditMemberModal from "./EditMemberModal";
import { TeamDataType } from "../../team.types";
import { getMembers, publishMember } from "../../team.service";

import { TableProps } from "@/constants/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import CommonTable, { ColumnType } from "@/components/CommonTable";


const MembersTable: React.FC<TableProps> = ({ reload }) => {
  const [members, setMembers] = useState<TeamDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [publishTarget, setPublishTarget] = useState<TeamDataType | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const [selectedEditMember, setSelectedEditMember] =
    useState<TeamDataType | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const fetchData = async (paramPage?: number) => {
    setIsLoading(true);

    try {
      const currentPage = paramPage ?? page;
      const response = await getMembers(currentPage, limit);

      if (response.success) {
        setMembers(response.teamMembers);
        setTotalRows(response.totalMembers);
        setTotalPages(response.totalPages);
        setPage(currentPage);
      } else {
        setMembers([]);
      }
    } catch {
      setMembers([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [reload, page, limit]);

  const handlePublishToggle = (service: TeamDataType) => {
    setPublishTarget(service);
    setIsPublishModalOpen(true);
  };

  const handleEditMember = (member: TeamDataType) => {
    setSelectedEditMember(member);
    setIsEditModalOpen(true);
  };

  const confirmPublishToggle = async () => {
    if (!publishTarget) return;

    try {
      const response = await publishMember(
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

  const columns: ColumnType<TeamDataType>[] = [
    {
      header: "Profile",
      accessor: "profileImagePath",
      render: (member) => (
        <div className="relative w-12 h-12 rounded-full overflow-hidden bg-gray-100 border border-gray-200 flex-shrink-0">
          {member.profileImagePath ? (
            <Image
              src={member.profileImagePath}
              alt={`${member.firstName} ${member.lastName || ""}`}
              fill
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
      header: "Name",
      accessor: "firstName",
      render: (member) => (
        <div className="max-w-[200px]">
          <p className="font-medium text-gray-900">
            {member.title} {member.firstName} {member.lastName || ""}
          </p>
        </div>
      ),
    },
    {
      header: "Specialization",
      accessor: "specialization",
      render: (member) => (
        <div className="max-w-[200px]">
          <p className="text-sm text-gray-600 line-clamp-1">
            {member.specialization}
          </p>
        </div>
      ),
    },
    {
      header: "Social Links",
      accessor: "",
      render: (member) => (
        <div className="flex items-center gap-2 text-gray-500">
          {member.socialLinks?.linkedin && (
            <a
              href={member.socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-600 transition-colors"
              title="LinkedIn"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
          )}
          {member.socialLinks?.instagram && (
            <a
              href={member.socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-600 transition-colors"
              title="Instagram"
            >
              <FaInstagram className="w-4 h-4" />
            </a>
          )}
          {member.socialLinks?.facebook && (
            <a
              href={member.socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-800 transition-colors"
              title="Facebook"
            >
              <FaFacebook className="w-4 h-4" />
            </a>
          )}
          {!member.socialLinks?.linkedin &&
            !member.socialLinks?.instagram &&
            !member.socialLinks?.facebook && (
              <span className="text-xs text-gray-400">None</span>
            )}
        </div>
      ),
    },
    {
      header: "Publish",
      accessor: "",
      render: (member) => (
        <label className="inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={member.isPublish ?? false}
            className="sr-only peer"
            onChange={() => handlePublishToggle(member)}
          />
          <div className="relative w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
        </label>
      ),
    },
    {
      header: "Edit",
      accessor: "",
      render: (member) => (
        <button
          onClick={() => handleEditMember(member)}
          className="text-primary hover:text-primary/80 transition-colors p-1"
          title="Edit Member"
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
        data={members}
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
          } this member?`}
      />

      {selectedEditMember && (
        <EditMemberModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedEditMember(null);
          }}
          reloadData={() => fetchData(page)}
          initialValues={selectedEditMember}
        />
      )}
    </>
  );
};

export default MembersTable;