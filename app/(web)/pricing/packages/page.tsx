"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

import ContactPractitionerSection from "@/modules/pricing/ui/ContactPractitionerSection";
import { PackageDataType } from "@/modules/packages/packages.types";
import { getPackages } from "@/modules/packages/packages.service";
import PackageModal from "@/modules/packages/ui/PackageModal";

export default function PackagesPage() {
  const [packages, setPackages] = useState<PackageDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPackage, setSelectedPackage] = useState<PackageDataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchPackagesData = async () => {
      try {
        setLoading(true);
        const response = await getPackages();
        if (response.success) {
          setPackages(response.packages);
        }
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackagesData();
  }, []);

  const handleSelectPackage = (pkg: PackageDataType) => {
    setSelectedPackage(pkg);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage(null);
  };

  return (
    <main className="min-h-screen bg-[#D4AF37]/10 pt-32 pb-20 text-[#111111]">
      <div className="mx-auto w-[90%] xl:w-[85%]">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6a12]">
              Packages
            </p>
            <h1 className="font-playfair text-4xl font-semibold text-[#111111] md:text-5xl">
              Package & Save
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
                    Package
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
                      <td className="border-t border-[#111111]/10 px-5 py-5 text-right align-top">
                        <div className="ml-auto h-5 w-20 animate-pulse rounded bg-gray-300/70" />
                      </td>
                      <td className="border-t border-[#111111]/10 px-5 py-5 text-right align-top">
                        <div className="ml-auto h-5 w-20 animate-pulse rounded bg-gray-300/70" />
                      </td>
                    </tr>
                  ))
                ) : packages.length > 0 ? (
                  packages.map((item, index) => {
                    const categoriesString = item.category?.length
                      ? `- ${item.category.join(", ")}`
                      : null;
                    const sessionsText = item.sessionsCount
                      ? `- ${item.sessionsCount} session${item.sessionsCount > 1 ? "s" : ""}`
                      : "";

                    return (
                      <tr
                        key={item.id ?? `${item.name}-${index}`}
                        className={index % 2 === 0 ? "bg-white/60" : "bg-[#f5f1ea]"}
                      >
                        <td className="border-t border-[#111111]/10 px-5 py-5 align-top text-base text-[#111111]">
                          <div className="flex flex-col gap-1">
                            <span className="font-medium">
                              {item.name}
                              {categoriesString && ` ${categoriesString}`}
                              {` ${sessionsText}`}
                            </span>

                            {item.link && (
                              <a
                                href={item.link}
                                target="_blank"
                                rel="noreferrer"
                                className="text-sm text-[#8a6a12] underline decoration-[#8a6a12]/60 underline-offset-4 transition hover:text-[#111111]"
                              >
                                {item.link}
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="border-t border-[#111111]/10 px-5 py-5 text-right align-top">
                          <div className="flex flex-col items-end gap-3">
                            <span className="text-base font-semibold text-[#111111]">
                              ${Number(item.price ?? 0).toFixed(2)}
                            </span>
                          </div>
                        </td>
                        <td className="border-t border-[#111111]/10 px-5 py-5 text-right align-top">
                          <div className="flex flex-col items-end gap-3">
                            <button
                              type="button"
                              onClick={() => handleSelectPackage(item)}
                              className="inline-flex w-full items-center justify-center rounded-full bg-[#0B0B0B] px-3 md:px-1 py-1.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#D4AF37] hover:text-[#111111]"
                            >
                              Request
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td
                      colSpan={2}
                      className="border-t border-[#111111]/10 px-5 py-8 text-center text-sm text-gray-500"
                    >
                      No packages available at the moment.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <ContactPractitionerSection />
      </div>

      <PackageModal
        pack={selectedPackage}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}