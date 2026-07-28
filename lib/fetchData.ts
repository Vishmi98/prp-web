import { getTreatmentBySlug } from "@/modules/treatments/treatments.service";
import { TreatmentDataType } from "@/modules/treatments/treatments.types";


export async function fetchTreatment(slug: string): Promise<TreatmentDataType | null> {
    try {
        const res = await getTreatmentBySlug({ slug });
        if (!res.success || !res.treatment) {
            return null;
        }
        return res.treatment;
    } catch (error) {
        console.error("Error fetching treatment data:", error);
        return null;
    }
}