import React from "react";
import Image from "next/image";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

import { TeamDataType } from "../team.types";


interface MemberCardProps {
    member: TeamDataType;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
    const fullName = `${member.title} ${member.firstName} ${member.lastName || ""}`.trim();
    const imageUrl = member.profileImagePath || "/placeholder-avatar.jpg";

    const { facebook, instagram, linkedin } = member.socialLinks || {};
    const hasSocials = Boolean(facebook || instagram || linkedin);

    return (
        <div className="group overflow-hidden hover:scale-[1.02] transition duration-300">
            {/* Image Container */}
            <div className="relative h-48 md:h-64 w-full overflow-hidden bg-gray-100 rounded-sm">
                <Image
                    src={imageUrl}
                    alt={fullName}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover group-hover:scale-110 transition duration-500 object-top"
                />

                {/* Overlay Social Icons */}
                {hasSocials && (
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3 md:gap-4 p-2">
                        {facebook && (
                            <a
                                href={facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook Profile"
                                className="bg-white text-black p-2 rounded-full hover:bg-black hover:text-white transition-colors"
                            >
                                <FaFacebookF size={14} />
                            </a>
                        )}
                        {instagram && (
                            <a
                                href={instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram Profile"
                                className="bg-white text-black p-2 rounded-full hover:bg-black hover:text-white transition-colors"
                            >
                                <FaInstagram size={14} />
                            </a>
                        )}
                        {linkedin && (
                            <a
                                href={linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn Profile"
                                className="bg-white text-black p-2 rounded-full hover:bg-black hover:text-white transition-colors"
                            >
                                <FaLinkedinIn size={14} />
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="py-3 text-start">
                <h3 className="text-base md:text-lg font-semibold text-black truncate">
                    {fullName}
                </h3>
                <p className="text-gray-500 text-sm mt-1 truncate">
                    {member.specialization}
                </p>
            </div>
        </div>
    );
};

export default MemberCard;