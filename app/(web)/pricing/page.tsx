import Link from "next/link";

import Button from "@/components/Button";

const pricingLinks = [
  {
    title: "Single Sessions",
    description: "Transparent pricing for one-off consultations and treatment sessions.",
    href: "/pricing/single-sessions",
  },
  {
    title: "Packages & Savings",
    description: "Value-packed series plans and treatment bundles for better results.",
    href: "/pricing/packages",
  },
];

export default function PricingOverviewPage() {
  return (
    <main className="min-h-screen pt-32 pb-20">
      <div className="mx-auto w-[90%] xl:w-[85%]">
        <div className="mb-10">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.32em] text-[#D4AF37]">
            Pricing
          </p>
          <h1 className="font-playfair text-4xl font-semibold md:text-6xl">
            Choose the plan that fits your treatment goals.
          </h1>
          <p className="mt-5 max-w-2xl text-sm text-gray-700 md:text-base">
            Personalized regenerative care with premium clinical standards, transparent fees,
            and tailored packages designed to deliver long-term results.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {pricingLinks.map((item) => (
            <div
              key={item.title}
              className="rounded-[28px] border border-[#D4AF37]/40 bg-white/5 p-8 shadow-[0_25px_50px_rgba(0,0,0,0.2)] backdrop-blur-sm"
            >
              <div className="mb-4 inline-flex rounded-full border border-[#D4AF37]/60 bg-[#D4AF37]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">
                Treatment pricing
              </div>
              <h2 className="font-playfair text-3xl font-semibold">
                {item.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-gray-800">{item.description}</p>

              <div className="mt-8">
                <Link href={item.href}>
                  <Button className="w-full rounded-full bg-gold px-6 py-3 text-sm font-semibold text-[#0B0B0B] hover:bg-[#F5D86B]">
                    View {item.title}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
