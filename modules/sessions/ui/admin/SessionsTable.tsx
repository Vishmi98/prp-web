"use client";

import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

import EditSessionModal from "./EditSessionModal";
import { SessionDataType } from "../../sessions.types";
import { getSessions, publishSession } from "../../sessions.service";

import { TableProps } from "@/constants/types";
import { ConfirmModal } from "@/components/ConfirmModal";
import CommonTable, { ColumnType } from "@/components/CommonTable";


const SessionsTable: React.FC<TableProps> = ({ reload }) => {
    const [sessions, setSessions] = useState<SessionDataType[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalRows, setTotalRows] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const [publishTarget, setPublishTarget] = useState<SessionDataType | null>(null);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

    const [selectedEditSession, setSelectedEditSession] = useState<SessionDataType | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const fetchData = async (paramPage?: number) => {
        setIsLoading(true);

        try {
            const currentPage = paramPage ?? page;
            const response = await getSessions(currentPage, limit);

            if (response.success) {
                setSessions(response.sessions);
                setTotalRows(response.totalSessions);
                setTotalPages(response.totalPages || Math.ceil(response.totalSessions / limit) || 1);
                setPage(currentPage);
            } else {
                setSessions([]);
            }
        } catch {
            setSessions([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(page);
    }, [reload, page, limit]);

    const handlePublishToggle = (session: SessionDataType) => {
        setPublishTarget(session);
        setIsPublishModalOpen(true);
    };

    const handleEditSession = (session: SessionDataType) => {
        setSelectedEditSession(session);
        setIsEditModalOpen(true);
    };

    const confirmPublishToggle = async () => {
        if (!publishTarget) return;

        try {
            const response = await publishSession(publishTarget.id, !publishTarget.isPublish);

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

    const columns: ColumnType<SessionDataType>[] = [
        {
            header: "Name",
            accessor: "name",
            render: (session) => (
                <div className="max-w-55">
                    <p className="line-clamp-2">{session.name}</p>
                </div>
            ),
        },
        {
            header: "Details",
            accessor: "details",
            render: (session) => (
                <div className="max-w-55">
                    <p className="line-clamp-2">{session.details}</p>
                </div>
            ),
        },
        {
            header: "Duration",
            accessor: "duration",
            render: (session) => (
                <span className="text-sm text-gray-600">{session.duration}</span>
            ),
        },
        {
            header: "Price ($)",
            accessor: "price",
            render: (session) => (
                <span className="font-semibold text-gray-900">{session.price.toFixed(2)}</span>
            ),
        },
        {
            header: "Publish",
            accessor: "isPublish",
            render: (session) => (
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={Boolean(session.isPublish)}
                        className="sr-only peer"
                        onChange={() => handlePublishToggle(session)}
                    />
                    <div className="relative w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-4 after:h-4 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
                </label>
            ),
        },
        {
            header: "Edit",
            accessor: "id",
            render: (session) => (
                <button
                    onClick={() => handleEditSession(session)}
                    className="text-primary hover:text-primary/80 transition-colors p-1"
                    title="Edit Session"
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
                data={sessions}
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
                message={`Are you sure you want to ${publishTarget?.isPublish ? "unpublish" : "publish"} this session?`}
            />

            {selectedEditSession && (
                <EditSessionModal
                    isOpen={isEditModalOpen}
                    onClose={() => {
                        setIsEditModalOpen(false);
                        setSelectedEditSession(null);
                    }}
                    reloadData={() => fetchData(page)}
                    initialValues={selectedEditSession}
                />
            )}
        </>
    );
};

export default SessionsTable;
