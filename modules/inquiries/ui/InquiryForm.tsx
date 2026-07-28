/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

import { inquiryInitialValues, inquiryValidationSchema } from "../inquiries.utils";
import { createInquiry } from "../inquiries.service";


export const InquiryForm = () => {
    const formik = useFormik({
        initialValues: inquiryInitialValues,
        validationSchema: inquiryValidationSchema,
        onSubmit: async (values, { resetForm, setSubmitting }) => {
            const loadingToast = toast.loading("Sending message...");
            try {
                const response = await createInquiry(values);
                toast.dismiss(loadingToast);

                if (response.success) {
                    toast.success(
                        response.message || "Your inquiry has been sent successfully!"
                    );
                    resetForm();
                } else {
                    toast.error(
                        response.message || "Failed to send message. Please try again."
                    );
                }
            } catch (error: any) {
                toast.dismiss(loadingToast);
                toast.error(
                    error?.message || "An error occurred while submitting the form."
                );
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="bg-white rounded-lg p-5 md:p-8">
            <div className="mb-10">
                <p className="uppercase tracking-[4px] text-gold font-medium mb-2">
                    Send Message
                </p>
                <h2 className="text-3xl md:text-4xl font-semibold text-black">
                    Contact Us
                </h2>
            </div>

            <form onSubmit={formik.handleSubmit} className="md:space-y-7 space-y-5">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="text-xs uppercase tracking-[3px] text-gray-500 block mb-1 font-medium"
                        >
                            First Name
                        </label>
                        <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.firstName}
                            className={`w-full py-3 px-5 rounded-lg border ${formik.touched.firstName && formik.errors.firstName
                                ? "border-red-500"
                                : "border-gray-200"
                                } focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300`}
                        />
                        {formik.touched.firstName && formik.errors.firstName && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.firstName}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="text-xs uppercase tracking-[3px] text-gray-500 block mb-1 font-medium"
                        >
                            Last Name
                        </label>
                        <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.lastName}
                            className={`w-full py-3 px-5 rounded-lg border ${formik.touched.lastName && formik.errors.lastName
                                ? "border-red-500"
                                : "border-gray-200"
                                } focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300`}
                        />
                        {formik.touched.lastName && formik.errors.lastName && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.lastName}
                            </p>
                        )}
                    </div>
                </div>

                {/* Email + Phone Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                        <label
                            htmlFor="email"
                            className="text-xs uppercase tracking-[3px] text-gray-500 block mb-1 font-medium"
                        >
                            Email Address
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`w-full py-3 px-5 rounded-lg border ${formik.touched.email && formik.errors.email
                                ? "border-red-500"
                                : "border-gray-200"
                                } focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300`}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.email}
                            </p>
                        )}
                    </div>

                    <div>
                        <label
                            htmlFor="phoneNumber"
                            className="text-xs uppercase tracking-[3px] text-gray-500 block mb-1 font-medium"
                        >
                            Phone Number
                        </label>
                        <input
                            id="phoneNumber"
                            name="phoneNumber"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.phoneNumber}
                            className={`w-full py-3 px-5 rounded-lg border ${formik.touched.phoneNumber && formik.errors.phoneNumber
                                ? "border-red-500"
                                : "border-gray-200"
                                } focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300`}
                        />
                        {formik.touched.phoneNumber && formik.errors.phoneNumber && (
                            <p className="text-red-500 text-xs mt-1">
                                {formik.errors.phoneNumber}
                            </p>
                        )}
                    </div>
                </div>

                {/* Message Field */}
                <div>
                    <label
                        htmlFor="message"
                        className="text-xs uppercase tracking-[3px] text-gray-500 block mb-1 font-medium"
                    >
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows={5}
                        placeholder="Tell us about your goals or questions..."
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                        className={`w-full p-5 rounded-xl border ${formik.touched.message && formik.errors.message
                            ? "border-red-500"
                            : "border-gray-200"
                            } focus:outline-none focus:border-[#D4AF37] focus:ring-4 focus:ring-[#D4AF37]/10 transition-all duration-300 resize-none`}
                    />
                    {formik.touched.message && formik.errors.message && (
                        <p className="text-red-500 text-xs mt-1">
                            {formik.errors.message}
                        </p>
                    )}
                </div>

                <div className="pt-2">
                    <button
                        type="submit"
                        disabled={formik.isSubmitting}
                        className="px-4 py-2 text-sm bg-gold text-white font-semibold rounded-lg w-full md:w-[35%] cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {formik.isSubmitting ? "Sending..." : "Send Message"}
                    </button>
                </div>
            </form>
        </div>
    );
};