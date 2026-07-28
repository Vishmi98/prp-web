"use client";

import React, { useEffect, useState, useCallback } from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

import BlogCardSkeleton from "./BlogCardSkeleton";
import BlogCard from "./BlogCard";
import { BlogDataType } from "../blogs.types";
import { getBlogs } from "../blogs.service";


const Blogs = () => {
    const [blogs, setBlogs] = useState<BlogDataType[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Pagination state
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const limit = 6;

    const fetchBlogsData = useCallback(async (pageToFetch: number) => {
        setIsLoading(true);
        try {
            const response = await getBlogs(pageToFetch, limit);

            if (response.success && response.blogs) {
                // Render only published blogs if client-side validation is required
                const publishedBlogs = response.blogs.filter(
                    (b) => b.isPublish !== false
                );
                setBlogs(publishedBlogs);
                setTotalPages(response.totalPages || 1);
            } else {
                setBlogs([]);
            }
        } catch (error) {
            console.error("Failed to fetch blogs:", error);
            setBlogs([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogsData(currentPage);
    }, [currentPage, fetchBlogsData]);

    const handlePageChange = (newPage: number) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setCurrentPage(newPage);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    return (
        <main className="min-h-screen bg-gray-50/50 py-12 md:py-20">
            <div className="w-[90%] xl:w-[85%] mx-auto">
                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {isLoading ? (
                        // Skeletons count matches limit parameter
                        Array.from({ length: limit }).map((_, index) => (
                            <BlogCardSkeleton key={index} />
                        ))
                    ) : blogs.length > 0 ? (
                        blogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
                    ) : (
                        // Empty state fallback
                        <div className="col-span-full py-16 text-center bg-white rounded-lg border border-gray-100">
                            <p className="text-gray-500 text-lg">No articles found.</p>
                        </div>
                    )}
                </div>

                {/* Pagination Controls */}
                {!isLoading && totalPages > 1 && (
                    <div className="mt-12 flex items-center justify-center gap-3">
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="p-2 md:px-3 md:py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-sm font-medium"
                            aria-label="Previous Page"
                        >
                            <BiChevronLeft size={20} />
                            <span className="hidden sm:inline">Previous</span>
                        </button>

                        {/* Page number indicators */}
                        <div className="flex items-center gap-1.5 px-2">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                                (page) => (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`w-9 h-9 text-sm font-medium rounded-md transition-colors ${currentPage === page
                                            ? "bg-black text-white"
                                            : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
                                            }`}
                                    >
                                        {page}
                                    </button>
                                )
                            )}
                        </div>

                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="p-2 md:px-3 md:py-2 rounded-md border border-gray-200 bg-white hover:bg-gray-50 text-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors flex items-center gap-1 text-sm font-medium"
                            aria-label="Next Page"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <BiChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Blogs;