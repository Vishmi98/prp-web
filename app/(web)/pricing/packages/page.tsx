import Link from "next/link";

import ContactPractitionerSection from "@/modules/pricing/ui/ContactPractitionerSection";

const packages = [
  {
    name: "PRP Therapy — Scalp -3 Sessions",
    price: "$1,500.00",
  },
  {
    name: "PRP Therapy — Skin - 3 Sessions",
    price: "$1,500.00",
  },
  {
    name: "PRF Therapy — Scalp -3 seasons",
    price: "$1,500.00",
  },
  {
    name: "PRF Therapy — Skin - 3 sessions",
    price: "$1,500.00",
  },
  {
    name: "PRP Therapy Scalp + Novobio Red Light (LED) Hair Cap",
    price: "$1,975.00",
    link: "https://www.novobio.com.au/led-hair-cap",
  },
  {
    name: "PRF Therapy Scalp + Novobio Red Light (LED) Hair Cap",
    price: "$1,975.00",
    link: "https://www.novobio.com.au/led-hair-cap",
  },
];

export default function PackagesPage() {
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
                </tr>
              </thead>
              <tbody>
                {packages.map((item, index) => (
                  <tr
                    key={`${item.name}-${index}`}
                    className={index % 2 === 0 ? "bg-white/60" : "bg-[#f5f1ea]"}
                  >
                    <td className="border-t border-[#111111]/10 px-5 py-5 align-top text-base text-[#111111]">
                      {item.link ? (
                        <div className="flex flex-col gap-2">
                          <span>{item.name}</span>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm text-[#8a6a12] underline decoration-[#8a6a12]/60 underline-offset-4 transition hover:text-[#111111]"
                          >
                            {item.link}
                          </a>
                        </div>
                      ) : (
                        item.name
                      )}
                    </td>
                    <td className="border-t border-[#111111]/10 px-5 py-5 text-right align-top text-base font-semibold text-[#111111]">
                      ${item.price.replace("$", "")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <ContactPractitionerSection />
      </div>
    </main>
  );
}