"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { createGiftCardRequest } from "../pricing.service";
import { CreateGiftCardRequestPayload, GiftCardModalProps } from "../pricing.types";
import { giftCardFormInitialValues, giftCardValidationSchema } from "../pricing.utils";


export default function GiftCardModal({ card, isOpen, onClose }: GiftCardModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik<CreateGiftCardRequestPayload>({
        initialValues: giftCardFormInitialValues,
        validationSchema: giftCardValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!card) return;

            setIsSubmitting(true);
            try {
                const response = await createGiftCardRequest({
                    giftCardId: card.id,
                    fullName: values.fullName,
                    email: values.email,
                    phone: values.phone,
                });

                if (response.success) {
                    toast.success(response.message || "Gift card request sent successfully!");
                    resetForm();
                    onClose();
                } else {
                    toast.error(response.message || "Failed to submit request.");
                }
            } catch {
                toast.error("An unexpected error occurred. Please try again.");
            } finally {
                setIsSubmitting(false);
            }
        },
    });

    if (!isOpen || !card) return null;

    const handleClose = () => {
        if (!isSubmitting) {
            formik.resetForm();
            onClose();
        }
    };

    return (
        <div
            onClick={handleClose}
            className="fixed inset-0 z-[10001] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
            <div
                className="relative w-full max-w-lg rounded-xl border border-[#111111]/10 bg-white p-5 shadow-2xl md:p-8"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#111111]/60 transition hover:bg-[#111111]/5 hover:text-[#111111] disabled:opacity-40"
                    aria-label="Close modal"
                >
                    ✕
                </button>

                {/* Selected Card Overview */}
                <div className="mb-6 flex items-center gap-4 border-b border-[#111111]/10 pb-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden">
                        <Image
                            src={card.imagePath || "/placeholder-card.png"}
                            alt={card.title}
                            fill
                            className="object-contain"
                        />
                    </div>
                    <div>
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8a6a12]">
                            {card.title}
                        </span>
                        <h3 className="text-xl font-bold text-[#111111]">${card.amount}</h3>
                    </div>
                </div>

                {/* Request Form */}
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Full Name */}
                    <div>
                        <label className="block mb-1 text-xs font-semibold uppercase tracking-wider text-[#2a2a2a]">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="fullName"
                            placeholder="John Doe"
                            value={formik.values.fullName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={isSubmitting}
                            className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-[#111111] outline-none transition ${formik.touched.fullName && formik.errors.fullName
                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                : "border-[#111111]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                                }`}
                        />
                        {formik.touched.fullName && formik.errors.fullName && (
                            <p className="mt-1 text-xs text-red-500">{formik.errors.fullName}</p>
                        )}
                    </div>

                    {/* Email Address */}
                    <div>
                        <label className="block mb-1 text-xs font-semibold uppercase tracking-wider text-[#2a2a2a]">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={isSubmitting}
                            className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-[#111111] outline-none transition ${formik.touched.email && formik.errors.email
                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                : "border-[#111111]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                                }`}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="mt-1 text-xs text-red-500">{formik.errors.email}</p>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div>
                        <label className="block mb-1 text-xs font-semibold uppercase tracking-wider text-[#2a2a2a]">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="+61400000000"
                            value={formik.values.phone}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            disabled={isSubmitting}
                            className={`w-full rounded-md border bg-white px-4 py-2.5 text-sm text-[#111111] outline-none transition ${formik.touched.phone && formik.errors.phone
                                ? "border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500"
                                : "border-[#111111]/20 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                                }`}
                        />
                        {formik.touched.phone && formik.errors.phone && (
                            <p className="mt-1 text-xs text-red-500">{formik.errors.phone}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-full bg-[#0B0B0B] py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#D4AF37] hover:text-[#111111] disabled:opacity-50"
                        >
                            {isSubmitting ? "Submitting..." : "Request"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}