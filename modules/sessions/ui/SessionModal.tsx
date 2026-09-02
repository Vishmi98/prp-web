"use client";

import React, { useState } from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { createSessionRequest } from "../sessions.service";
import { CreateSessionRequestPayload, SessionModalProps } from "../sessions.types";
import { sessionFormInitialValues, sessionValidationSchema } from "../sessions.utils";


export default function SessionModal({ session, isOpen, onClose }: SessionModalProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const formik = useFormik<CreateSessionRequestPayload>({
        initialValues: sessionFormInitialValues,
        validationSchema: sessionValidationSchema,
        onSubmit: async (values, { resetForm }) => {
            if (!session) return;

            setIsSubmitting(true);
            try {
                const response = await createSessionRequest({
                    sessionId: session.id,
                    fullName: values.fullName,
                    email: values.email,
                    phone: values.phone,
                });

                if (response.success) {
                    toast.success(response.message || "Session request sent successfully!");
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

    if (!isOpen || !session) return null;

    const handleClose = () => {
        if (!isSubmitting) {
            formik.resetForm();
            onClose();
        }
    };

    return (
        <div
            onClick={handleClose}
            className="fixed inset-0 z-10001 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        >
            <div
                className="relative w-full max-w-lg rounded-xl border border-[#111111]/10 bg-white p-5 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    type="button"
                    onClick={handleClose}
                    disabled={isSubmitting}
                    className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-[#111111]/60 transition hover:bg-[#111111]/5 hover:text-[#111111] disabled:opacity-40"
                    aria-label="Close modal"
                >
                    ✕
                </button>

                <div className="group relative mt-10 mb-5 overflow-hidden rounded-2xl border border-[#111111]/15 bg-gradient-to-br from-[#fdfbf7] to-[#f5f1ea] p-4 shadow-sm transition-all duration-300 hover:border-[#8a6a12]/40 hover:shadow-xl">
                    <div className="flex items-center justify-between">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#8a6a12]/30 bg-[#8a6a12]/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-[#8a6a12]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#8a6a12]" />
                            Session Request
                        </span>
                        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-[#111111]/60">
                            {session.duration}
                        </p>
                    </div>

                    <div className="mt-2 flex flex-col justify-between gap-4 border-t border-[#111111]/10 md:flex-row md:items-end">
                        <div>
                            <h3 className="font-playfair md:text-lg font-semibold tracking-tight text-[#111111] transition-colors duration-200 group-hover:text-[#8a6a12]">
                                {session.name}
                            </h3>
                        </div>

                        <div className="flex items-baseline gap-1">
                            <span className="text-xs font-semibold text-[#8a6a12]">$</span>
                            <span className="font-playfair text-2xl font-bold tracking-tight text-[#111111]">
                                {Number(session.price ?? 0).toFixed(2)}
                            </span>
                        </div>
                    </div>
                </div>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2a2a2a]">
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

                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2a2a2a]">
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

                    <div>
                        <label className="mb-1 block text-xs font-semibold uppercase tracking-wider text-[#2a2a2a]">
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

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-full bg-[#0B0B0B] py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition hover:bg-[#D4AF37] hover:text-[#111111] disabled:opacity-50"
                        >
                            {isSubmitting ? "Submitting..." : "Request Session"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
