"use client";

import React, { useEffect, useState } from "react";

import { TeamDataType } from "@/modules/team/team.types";
import { getMembers } from "@/modules/team/team.service";
import MemberCardSkeleton from "@/modules/team/ui/MemberCardSkeleton";
import MemberCard from "@/modules/team/ui/MemberCard";
import ImageWithSkeleton from "@/components/ImageWithSkeleton";


const Team = () => {
    const [members, setMembers] = useState<TeamDataType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                setLoading(true);
                // Request limit set to 4 to match original grid layout
                const data = await getMembers(1, 4);

                if (data.success) {
                    // Filter out unpublished members if required
                    const publishedMembers = data.teamMembers.filter(
                        (member) => member.isPublish !== false
                    );
                    setMembers(publishedMembers);
                }
            } catch (error) {
                console.error("Failed to fetch team members:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, []);

    return (
        // <section className="py-20 text-black">
        //     <div className="w-[90%] xl:w-[85%] mx-auto flex flex-col md:flex-row md:gap-10">
        //         {/* Heading */}
        //         <div className="text-start mb-14 w-full md:w-[35%]">
        //             <h2 className="text-2xl md:text-3xl font-semibold leading-tight">
        //                 Meet Our Experts For Your Better Results.
        //             </h2>
        //             <p className="mt-4 max-w-2xl text-gray-600 text-sm md:text-base">
        //                 Our experienced medical professionals ensure safe, effective, and
        //                 personalized PRP treatments.
        //             </p>
        //         </div>

        //         {/* Grid */}
        //         <div className="grid grid-cols-2 gap-5 md:gap-10 w-full md:w-[65%] md:px-5">
        //             {loading ? (
        //                 Array.from({ length: 4 }).map((_, index) => (
        //                     <MemberCardSkeleton key={index} />
        //                 ))
        //             ) : members.length > 0 ? (
        //                 members.map((member) => (
        //                     <MemberCard key={member.id} member={member} />
        //                 ))
        //             ) : (
        //                 <div className="col-span-full text-center py-10 text-gray-500">
        //                     No team members found.
        //                 </div>
        //             )}
        //         </div>
        //     </div>
        // </section>
        <section className="py-20 md:py-28 text-black bg-gray-50">
            <div className="w-[90%] xl:w-[85%] mx-auto">

                {/* Section heading */}
                <div className="mb-10 md:mb-14">
                    <p className="text-sm font-medium tracking-widest uppercase text-gray-500">
                        Meet Your Doctor
                    </p>

                    <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
                        Expert Care. Personal Attention.
                    </h2>
                </div>

                {/* Doctor Image */}
                <div className="relative w-full h-[250px] sm:h-[400px] md:h-[550px] lg:h-[700px] 2xl:h-screen rounded-2xl overflow-hidden bg-gray-200">
                    <ImageWithSkeleton
                        src="/doctor.png"
                        alt="Our Doctor"
                        fill
                        className="object-cover"
                    />
                </div>

            </div>
        </section>
    );
};

export default Team;