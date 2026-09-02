"use client";

import React, { FC, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";

import { SessionType } from "../../sessions.types";
import { createSession } from "../../sessions.service";
import { addSessionInitialValues, addSessionValidationSchema } from "../../sessions.utils";

import { AddModalProps } from "@/constants/types";



const AddSessionModal: FC<AddModalProps> = ({ isOpen, onClose, handleReload }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (
        values: SessionType,
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            setIsLoading(true);
            const response = await createSession(values);

            if (response.success) {
                toast.success(response.message || "Session created successfully");
                resetForm();
                setTimeout(() => {
                    onClose();
                    handleReload();
                }, 300);
            } else {
                toast.error(response.message || "Failed to create session");
            }
        } catch (error) {
            toast.error("An error occurred while adding the session.");
            console.error(error);
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center cursor-pointer p-4"
        >
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col mx-3">
                <div className="flex justify-between items-center p-4">
                    <h2 className="font-semibold">Add New Session</h2>
                    <CgClose className="w-4 h-4 cursor-pointer" onClick={onClose} />
                </div>

                <Formik
                    initialValues={addSessionInitialValues}
                    validationSchema={addSessionValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className="flex flex-col gap-4 h-auto overflow-y-auto p-4">
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                        Session Name <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="e.g. PRP Consultation"
                                        className="border border-gray-300 rounded-md text-sm p-2 w-full focus:ring-1 focus:ring-black focus:outline-none"
                                    />
                                    <ErrorMessage name="name" component="div" className="text-red-600 text-xs" />
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                        Session Details <span className="text-red-500">*</span>
                                    </label>
                                    <Field as="textarea" name="details" className="border border-gray-300 rounded-sm text-sm p-2 w-full h-15 resize-none" />
                                    <ErrorMessage name="details" component="div" className="text-red-600 text-xs" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="price" className="text-sm font-medium text-gray-700">
                                            Price ($)
                                        </label>
                                        <Field
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            className="border border-gray-300 rounded-md text-sm p-2 w-full focus:ring-1 focus:ring-black focus:outline-none"
                                        />
                                        <ErrorMessage name="price" component="div" className="text-red-600 text-xs" />
                                    </div>

                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="duration" className="text-sm font-medium text-gray-700">
                                            Duration <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            id="duration"
                                            name="duration"
                                            type="text"
                                            placeholder="60 minutes"
                                            className="border border-gray-300 rounded-md text-sm p-2 w-full focus:ring-1 focus:ring-black focus:outline-none"
                                        />
                                        <ErrorMessage name="duration" component="div" className="text-red-600 text-xs" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end space-x-2 p-4">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={isLoading || isSubmitting}
                                    className="px-4 py-2 text-sm bg-gray-300 rounded-lg w-full cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading || isSubmitting}
                                    className="px-4 py-2 text-sm bg-black text-white rounded-lg w-full cursor-pointer"
                                >
                                    {isLoading || isSubmitting ? "Adding..." : "Add"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default AddSessionModal;
