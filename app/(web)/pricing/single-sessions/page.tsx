import ContactPractitionerSection from "@/modules/pricing/ui/ContactPractitionerSection";
import Link from "next/link";

const singleSessions = [
  {
    name: "Skin initial Assessment",
    details: "Discuss/assess the suitability for the treatment",
    duration: "30 minutes",
    fee: "$0.00",
  },
  {
    name: "Hair Initial Assessment",
    details: "Discuss/assess the suitability for the treatment",
    duration: "30 minutes",
    fee: "$0.00",
  },
  {
    name: "PRP treatment",
    details: "On focused area",
    duration: "60-90 minutes",
    fee: "$550.00",
  },
  {
    name: "Skin x1 session",
    details: "as per the assessment",
    duration: "60-90 minutes",
    fee: "$550.00",
  },
  {
    name: "PRP treatment",
    details: "On focused area",
    duration: "60-90 minutes",
    fee: "$550.00",
  },
  {
    name: "Hair x1 session",
    details: "as per the assessment",
    duration: "60-90 minutes",
    fee: "$550.00",
  },
  {
    name: "PRF treatment",
    details: "On focused area",
    duration: "60-90 minutes",
    fee: "$550.00",
  },
  {
    name: "Skin x1 session",
    details: "as per the assessment",
    duration: "60-90 minutes",
    fee: "$550.00",
  },
  {
    name: "PRF treatment",
    details: "On focused area",
    duration: "60-90 minutes",
    fee: "$550.00",
  },
  {
    name: "Hair x1 session",
    details: "as per the assessment",
    duration: "60-90 minutes",
    fee: "$550.00",
  },
  {
    name: "Novobio Red Light (LED) Hair Cap",
    details: "To use alongside the hair treatments to promote hair restoration",
    duration: "On going use",
    fee: "$525.00",
  },
];

export default function SingleSessionsPage() {
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
                    Consultation
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">
                    Details
                  </th>
                  <th className="px-5 py-4 text-left text-sm font-semibold uppercase tracking-[0.12em]">
                    Duration
                  </th>
                  <th className="px-5 py-4 text-right text-sm font-semibold uppercase tracking-[0.12em]">
                    Fee
                  </th>
                </tr>
              </thead>
              <tbody>
                {singleSessions.map((item, index) => (
                  <tr
                    key={`${item.name}-${index}`}
                    className={index % 2 === 0 ? "bg-white/60" : "bg-[#f5f1ea]"}
                  >
                    <td className="border-t border-[#111111]/10 px-5 py-4 align-top text-base font-medium text-[#111111]">
                      {item.name}
                    </td>
                    <td className="border-t border-[#111111]/10 px-5 py-4 align-top text-base text-[#111111]">
                      {item.details}
                    </td>
                    <td className="border-t border-[#111111]/10 px-5 py-4 align-top text-base text-[#111111]">
                      {item.duration}
                    </td>
                    <td className="border-t border-[#111111]/10 px-5 py-4 align-top text-right text-base font-semibold text-[#111111]">
                      {item.fee}
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