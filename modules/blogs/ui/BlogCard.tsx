"use client";

import React from "react";
import Link from "next/link";
import { FiArrowUpRight, FiCalendar } from "react-icons/fi";

import { BlogDataType } from "../blogs.types";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";


interface BlogCardProps {
    blog: BlogDataType;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    // Extract snippet from available paragraphs
    const previewText =
        blog.paragraph1 || blog.paragraph2 || blog.paragraph3 || "";

    return (
        <article className="group bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full">
            {/* Thumbnail Image */}
            <div className="relative w-full h-60 overflow-hidden bg-gray-100">
                {blog.thumbnailImagePath ? (
                    <ImageWithSkeleton
                        src={blog.thumbnailImagePath}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                        No Image Available
                    </div>
                )}
            </div>

            {/* Content Container */}
            <div className="p-5 flex flex-col flex-grow">
                {/* Date */}
                <div className="flex items-center gap-1.5 text-xs text-gold font-medium mb-2.5">
                    <FiCalendar className="w-3.5 h-3.5" />
                    <time dateTime={blog.date}>
                        {blog.date
                            ? new Date(blog.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })
                            : "Recent"}
                    </time>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#D4AF37] transition-colors line-clamp-2 leading-snug mb-2">
                    {blog.title}
                </h3>

                {/* Excerpt Paragraph */}
                {previewText && (
                    <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed mb-4 flex-grow">
                        {previewText}
                    </p>
                )}

                {/* Read Article Link */}
                <div className="pt-3 border-t border-gray-100 mt-auto">
                    <Link
                        href={`/blogs/${blog.url}`}
                        className="inline-flex items-center text-sm font-medium text-gray-900 group-hover:text-[#D4AF37] transition-colors gap-1"
                    >
                        Read Article
                        <FiArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </Link>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;