import Image from "next/image";
import Link from "next/link";
import { BiCalendar, BiArrowBack } from "react-icons/bi";

import { BlogDataType } from "../blogs.types";

interface Props {
    blog: BlogDataType;
}

const BlogOverview = ({ blog }: Props) => {
    return (
        <article className="bg-white">

            {/* Hero */}
            <section className="pt-30 md:pt-32 pb-10 md:pb-16">
                <div className="w-[90%] xl:w-[75%] mx-auto">
                    <Link
                        href="/blogs"
                        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-black transition mb-8"
                    >
                        <BiArrowBack />
                        Back to Blogs
                    </Link>

                    <div className="flex items-center gap-3 text-sm text-gray-700 mb-5">
                        <BiCalendar />
                        <span>{blog.date}</span>
                    </div>

                    <h1 className="text-3xl md:text-5xl font-semibold max-w-5xl">
                        {blog.title}
                    </h1>
                </div>
            </section>

            {/* Cover Image */}
            <section>
                <div className="w-[90%] xl:w-[75%] mx-auto">

                    <div className="relative w-full aspect-[16/7] rounded-xl md:rounded-3xl overflow-hidden shadow-xl">

                        <Image
                            src={blog.coverImagePath}
                            alt={blog.title}
                            fill
                            priority
                            className="object-cover"
                        />

                    </div>

                </div>
            </section>

            {/* Content */}
            <section className="py-10 md:py-20">
                <div className="w-[90%] xl:w-[75%] mx-auto">

                    <div
                        className="
                        md:leading-8
                        text-md
                        md:text-lg
                        space-y-8
                    "
                    >

                        {blog.paragraph1 && (
                            <p>{blog.paragraph1}</p>
                        )}

                        {blog.paragraph2 && (
                            <p>{blog.paragraph2}</p>
                        )}

                        {blog.paragraph3 && (
                            <p>{blog.paragraph3}</p>
                        )}

                    </div>

                </div>
            </section>

        </article>
    );
};

export default BlogOverview;