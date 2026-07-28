import { getBlogByUrl } from "@/modules/blogs/blogs.service";
import { BlogDataType } from "@/modules/blogs/blogs.types";
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

export async function fetchBlog(url: string): Promise<BlogDataType | null> {
    try {
        const res = await getBlogByUrl({ url });
        if (!res.success || !res.blog) {
            return null;
        }
        return res.blog;
    } catch (error) {
        console.error("Error fetching blog data:", error);
        return null;
    }
}