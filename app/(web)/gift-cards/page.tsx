import Image from "next/image";
import Link from "next/link";

const giftCards = [
  {
    id: "classic",
    amount: 550,
    title: "Classic Gift Card",
    description: "Perfect for a single premium PRP or skin treatment session.",
    imageSrc: "/g1.png",
    badge: "AUD",
  },
  {
    id: "signature",
    amount: 1500,
    title: "Signature Gift Card",
    description: "A thoughtful choice for a fuller treatment plan or package upgrade.",
    imageSrc: "/g2.png",
    badge: "AUD",
  },
  {
    id: "luxury",
    amount: 2000,
    title: "Luxury Gift Card",
    description: "Ideal for multi-session care, advanced packages, and premium results.",
    imageSrc: "/g3.png",
    badge: "AUD",
  },
];

export default function GiftCardsPage() {
  return (
    <main className="min-h-screen bg-[#f5f1ea] pt-32 pb-20 text-[#111111]">
      <div className="mx-auto w-[90%] xl:w-[85%]">
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

        <div className="grid gap-8 lg:grid-cols-3">
          {giftCards.map((card) => (
            <div
              key={card.id}
              className="group flex flex-col justify-between overflow-hidden border border-[#111111]/10 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_60px_rgba(0,0,0,0.12)]"
            >
              <div>
                {/* Image Preview Container */}
                <div className="relative h-56 w-full overflow-hidden bg-stone-100 flex items-center justify-center p-4">
                  <div className="relative h-full w-full transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={card.imageSrc}
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
                    <span className="text-lg font-bold text-[#111111]">${card.amount}</span>
                  </div>

                  <p className="mb-5 text-sm leading-6 text-[#2a2a2a]">{card.description}</p>
                </div>
              </div>

              <div className="bg-[#f9f6f1] px-6 pb-6">
                <button
                  className="inline-flex w-full items-center justify-center rounded-full bg-[#0B0B0B] px-5 py-3 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#D4AF37] hover:text-[#111111]"
                >
                  Buy ${card.amount} Gift Card
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}