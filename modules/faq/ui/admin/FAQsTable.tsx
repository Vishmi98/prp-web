"use client";

import React, { useEffect, useState } from "react";
import { RiEdit2Fill } from "react-icons/ri";
import { toast } from "react-toastify";

import { FAQDataType } from "../../faq.types";
import { getFAQs, publishFAQ } from "../../faq.service";
import EditFAQModal from "./EditFAQModal";

import CommonTable, { ColumnType } from "@/components/CommonTable";
import { ConfirmModal } from "@/components/ConfirmModal";
import { TableProps } from "@/constants/types";


const FAQsTable: React.FC<TableProps> = ({ reload }) => {
    const [faqs, setFaqs] = useState<FAQDataType[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const limit = 5;
    const [totalRows, setTotalRows] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [publishTarget, setPublishTarget] = useState<FAQDataType | null>(null);
    const [editTarget, setEditTarget] = useState<FAQDataType | null>(null);
    const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

    const fetchData = async (nextPage = page) => {
        setLoading(true);
        try {
            const response = await getFAQs(nextPage, limit);
            setFaqs(response.faqs);
            setTotalRows(response.totalFaqs);
            setTotalPages(response.totalPages || 1);
            setPage(nextPage);
        } catch { setFaqs([]); } finally { setLoading(false); }
    };

    useEffect(() => {
        fetchData(page);
    }, [reload, page, limit]);

    const handlePublishToggle = (
        faq: FAQDataType
    ) => {
        setPublishTarget(faq);
        setIsPublishModalOpen(true);
    };

    const columns: ColumnType<FAQDataType>[] = [
        { header: "Question", accessor: "question", render: (faq) => <p className="max-w-80 line-clamp-2">{faq.question}</p> },
        { header: "Answer", accessor: "answer", render: (faq) => <p className="max-w-120 line-clamp-2">{faq.answer}</p> },
        {
            header: "Publish", accessor: "isPublish", render: (faq) => (
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={faq.isPublish}
                        className="sr-only peer"
                        onChange={() => handlePublishToggle(faq)}
                    />

                    <div className="relative w-9 h-5 bg-gray-200 rounded-full peer-checked:bg-green-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:w-4 after:h-4 after:bg-white after:border after:border-gray-300 after:rounded-full after:transition-all peer-checked:after:translate-x-full" />
                </label>
            )
        },
        { header: "Edit", accessor: "id", render: (faq) => <button type="button" onClick={() => setEditTarget(faq)} title="Edit FAQ"><RiEdit2Fill className="h-5 w-5" /></button> },
    ];

    const confirmPublish = async () => {
        if (!publishTarget) return;

        try {
            const response =
                await publishFAQ(
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

    return (
        <>
            <CommonTable
                columns={columns}
                data={faqs}
                isLoading={loading}
                expandable
                page={page}
                limit={limit}
                totalRows={totalRows}
                totalPages={totalPages}
                onPageChange={(newPage) => {
                    fetchData(newPage);
                }}
                renderExpandedRow={(faq) => (
                    <div>
                        <p className="font-semibold">Answer:</p>
                        <p>{faq.answer}</p>
                    </div>
                )}
            />
            <ConfirmModal
                isOpen={isPublishModalOpen}
                onClose={() => {

                    setIsPublishModalOpen(false);
                    setPublishTarget(null);

                }}
                onConfirm={confirmPublish}
                message={`
          Are you sure you want to 
          ${publishTarget?.isPublish
                        ? "unpublish"
                        : "publish"
                    }
          this FAQ?
        `}
            />
            <EditFAQModal isOpen={Boolean(editTarget)} onClose={() => setEditTarget(null)} reloadData={() => fetchData(page)} initialValues={editTarget} />
        </>
    );
};

export default FAQsTable;