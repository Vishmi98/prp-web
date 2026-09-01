"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import GiftCardModal from "@/modules/pricing/ui/GiftCardModal";
import { GiftCardDataType } from "@/modules/pricing/pricing.types";
import { getGiftCards } from "@/modules/pricing/pricing.service";
import GiftCardSkeleton from "@/modules/pricing/ui/GiftCardSkeleton";


export default function GiftCardsPage() {
  const [giftCards, setGiftCards] = useState<GiftCardDataType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination states
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const limit = 6;

  // Modal states
  const [selectedCard, setSelectedCard] = useState<GiftCardDataType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCards = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getGiftCards(page, limit);
        if (isMounted) {
          if (response.success) {
            setGiftCards(response.cards);
            setTotalPages(response.totalPages);
          } else {
            setError(response.message || "Failed to fetch gift cards.");
          }
        }
      } catch (err) {
        if (isMounted) {
          setError("An error occurred while fetching gift cards.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCards();

    return () => {
      isMounted = false;
    };
  }, [page]);

  const handleSelectCard = (card: GiftCardDataType) => {
    setSelectedCard(card);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCard(null);
  };
  return (
    <main className="min-h-screen bg-[#f5f1ea] pt-32 pb-20 text-[#111111]">
      <div className="mx-auto w-[90%] xl:w-[85%]">
        {/* Header Section */}
        <div className="mb-10 max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-[#8a6a12]">
            Gift Cards
          </p>
          <h1 className="font-playfair text-4xl font-semibold text-[#111111] md:text-5xl">
            Give the gift of confidence.
          </h1>
          <p className="mt-4 text-sm leading-7 text-[#2a2a2a] md:text-base">
            Share a premium self-care experience with a beautifully designed treatment gift card.
            Redeemable toward advanced PRP, skin, and hair restoration services.
          </p>
        </div>

        {/* Error Handling */}
        {error && (
          <div className="mb-8 rounded-md bg-red-50 p-4 text-sm text-red-700 border border-red-200">
            {error}
          </div>
        )}

        {/* Grid Section: Skeletons vs Data */}
        <div className="grid gap-8 lg:grid-cols-3">
          {loading
            ? Array.from({ length: limit }).map((_, index) => (
              <GiftCardSkeleton key={index} />
            ))
            : giftCards.map((card) => (
              <div
                key={card.id}
                className="group flex flex-col justify-between overflow-hidden border border-[#111111]/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(0,0,0,0.12)]"
              >
                <div>
                  {/* Image Preview Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-stone-100 flex items-center justify-center p-4">
                    <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={card.imagePath || "/placeholder-card.png"}
                        alt={`${card.title} - $${card.amount}`}
                        fill
                        className="object-contain drop-shadow-md"
                        priority
                      />
                    </div>
                  </div>

                  {/* Card Details */}
                  <div className="bg-[#f9f6f1] p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="inline-flex rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#7a5d12]">
                        {card.title}
                      </div>
                      <span className="text-lg font-bold text-[#111111]">
                        ${card.amount}
                      </span>
                    </div>

                    <p className="mb-5 text-sm leading-6 text-[#2a2a2a]">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="bg-[#f9f6f1] px-6 pb-6">
                  <button
                    onClick={() => handleSelectCard(card)}
                    className="inline-flex w-full items-center justify-center rounded-full bg-[#0B0B0B] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#D4AF37] hover:text-[#111111]"
                  >
                    Buy ${card.amount} Gift Card
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Empty State */}
        {!loading && giftCards.length === 0 && !error && (
          <div className="py-20 text-center text-stone-500">
            No gift cards available at the moment.
          </div>
        )}

        {/* Optional Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="mt-12 flex justify-center items-center gap-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="rounded-full border border-[#111111]/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#111111] disabled:opacity-40"
            >
              Previous
            </button>
            <span className="text-sm font-medium">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="rounded-full border border-[#111111]/20 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#111111] disabled:opacity-40"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Modal Component */}
      <GiftCardModal
        card={selectedCard}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </main>
  );
}