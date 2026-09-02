"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import ContactPractitionerSection from "@/modules/pricing/ui/ContactPractitionerSection";
import SessionModal from "@/modules/sessions/ui/SessionModal";
import { getSessions } from "@/modules/sessions/sessions.service";
import { SessionDataType } from "@/modules/sessions/sessions.types";

export default function SingleSessionsPage() {
  const [sessions, setSessions] = useState<SessionDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedSession, setSelectedSession] = useState<SessionDataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchSessionsData = async () => {
      try {
        setLoading(true);
        const response = await getSessions();
        if (response.success) {
          setSessions(response.sessions);
        }
      } catch (error) {
        console.error("Failed to fetch sessions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionsData();
  }, []);

  const handleSelectSession = (session: SessionDataType) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };

  return (
    <main className="min-h-screen bg-[#D4AF37]/10 pt-32 pb-20 text-[#111111]">
      <div className="mx-auto w-[90%] xl:w-[85%]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6a12]">
              Pricing
            </p>
            <h1 className="font-playfair text-4xl font-semibold text-[#111111] md:text-5xl">
              Single Sessions
            </h1>
          </div>

          <Link
            href="/pricing"
            className="inline-flex items-center text-sm font-medium text-[#8a6a12] transition hover:text-[#111111]"
          >
            ← Back to pricing
          </Link>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-[#111111]/15 bg-[#f9f6f1] shadow-[0_20px_45px_rgba(0,0,0,0.06)]">
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead>
                <tr className="bg-[#0B0B0B] text-white">
                  <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">
                    Session
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">
                    Details
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">
                    Duration
                  </th>
                  <th className="px-5 py-4 text-right text-sm font-semibold uppercase tracking-[0.12em]">
                    Price
                  </th>
                  <th className="px-5 py-4 text-right text-sm font-semibold uppercase tracking-[0.12em]">
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <tr
                      key={`skeleton-${index}`}
                      className={index % 2 === 0 ? "bg-white/60" : "bg-[#f5f1ea]"}
                    >
                      <td className="border-t border-[#111111]/10 px-5 py-5 align-top">
                        <div className="flex flex-col gap-2">
                          <div className="h-5 w-48 animate-pulse rounded bg-gray-300/70" />
                          <div className="h-4 w-32 animate-pulse rounded bg-gray-200/80" />
                        </div>
                      </td>
                      <td className="border-t border-[#111111]/10 px-5 py-5 align-top">
                        <div className="h-4 w-52 animate-pulse rounded bg-gray-200/80" />
                      </td>
                      <td className="border-t border-[#111111]/10 px-5 py-5 align-top">
                        <div className="h-4 w-24 animate-pulse rounded bg-gray-200/80" />
                      </td>
                      <td className="border-t border-[#111111]/10 px-5 py-5 text-right align-top">
                        <div className="ml-auto h-5 w-20 animate-pulse rounded bg-gray-300/70" />
                      </td>
                      <td className="border-t border-[#111111]/10 px-5 py-5 text-right align-top">
                        <div className="ml-auto h-8 w-24 animate-pulse rounded-full bg-gray-300/70" />
                      </td>
                    </tr>
                  ))
                ) : sessions.length > 0 ? (
                  sessions.map((item, index) => (
                    <tr
                      key={item.id ?? `${item.name}-${index}`}
                      className={index % 2 === 0 ? "bg-white/60" : "bg-[#f5f1ea]"}
                    >
                      <td className="border-t border-[#111111]/10 px-5 py-5 align-top text-base font-medium text-[#111111]">
                        {item.name}
                      </td>
                      <td className="border-t border-[#111111]/10 px-5 py-5 align-top text-base text-[#111111]">
                        {item.details}
                      </td>
                      <td className="border-t border-[#111111]/10 px-5 py-5 align-top text-base text-[#111111]">
                        {item.duration}
                      </td>
                      <td className="border-t border-[#111111]/10 px-5 py-5 text-right align-top text-base font-semibold text-[#111111]">
                        ${Number(item.price ?? 0).toFixed(2)}
                      </td>
                      <td className="border-t border-[#111111]/10 px-5 py-5 text-right align-top">
                        <button
                          type="button"
                          onClick={() => handleSelectSession(item)}
                          className="inline-flex w-full items-center justify-center rounded-full bg-[#0B0B0B] px-3 py-1.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#D4AF37] hover:text-[#111111]"
                        >
                          Request
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="border-t border-[#111111]/10 px-5 py-8 text-center text-sm text-gray-500"
                    >
                      No sessions available at the moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <ContactPractitionerSection />
      </div>

      <SessionModal
        session={selectedSession}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}