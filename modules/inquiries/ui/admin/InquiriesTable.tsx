"use client";

import React, { useEffect, useState } from "react";

import { InquiryDataType } from "../../inquiries.types";
import { getInquiries } from "../../inquiries.service";

import { TableProps } from "@/constants/types";
import CommonTable, { ColumnType } from "@/components/CommonTable";


const InquiriesTable: React.FC<TableProps> = ({ reload }) => {
  const [inquiries, setInquiries] = useState<InquiryDataType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalRows, setTotalRows] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (paramPage?: number) => {
    setIsLoading(true);

    try {
      const currentPage = paramPage ?? page;

      const response = await getInquiries(currentPage, limit);

      if (response.success) {
        setInquiries(response.inquiries);
        setTotalRows(response.totalInquiries);
        setTotalPages(response.totalPages);
        setPage(currentPage);
      } else {
        setInquiries([]);
      }
    } catch {
      setInquiries([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [reload, page, limit]);

  const columns: ColumnType<InquiryDataType>[] = [
    {
      header: "#ID",
      accessor: "id",
      render: (row) => (
        <span className="font-semibold text-gray-700">#{row.id}</span>
      ),
    },
    {
      header: "Name",
      accessor: "firstName",
      render: (row) => (
        <div className="max-w-[200px]">
          <p className="line-clamp-1 font-medium text-gray-900">
            {row.firstName} {row.lastName}
          </p>
        </div>
      ),
    },
    {
      header: "Email",
      accessor: "email",
      render: (row) => (
        <a
          href={`mailto:${row.email}`}
          className="text-blue-600 hover:underline"
        >
          {row.email}
        </a>
      ),
    },
    {
      header: "Phone Number",
      accessor: "phoneNumber",
      render: (row) => (
        <a
          href={`tel:${row.phoneNumber}`}
          className="text-gray-700 hover:text-black"
        >
          {row.phoneNumber}
        </a>
      ),
    },
    {
      header: "Message",
      accessor: "message",
      render: (row) => (
        <div className="max-w-[300px]">
          <p className="line-clamp-2 text-sm text-gray-600" title={row.message}>
            {row.message}
          </p>
        </div>
      ),
    },
  ];

  return (
    <>
      <CommonTable
        columns={columns}
        data={inquiries}
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
    </>
  );
};

export default InquiriesTable;