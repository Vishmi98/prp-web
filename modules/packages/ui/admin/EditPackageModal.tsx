"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { toast } from "react-toastify";
import { CgClose } from "react-icons/cg";

import { EditPackageModalProps, PackageType } from "../../packages.types";
import { updatePackage } from "../../packages.service";
import { addPackageValidationSchema } from "../../packages.utils";

const CATEGORY_OPTIONS = ["Hair", "Skin", "Scalp", "Face"];

const EditPackageModal: React.FC<EditPackageModalProps> = ({
    isOpen,
    onClose,
    initialValues,
    reloadData,
}) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (
        values: PackageType,
        {
            resetForm,
            setSubmitting,
        }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            setIsLoading(true);
            const response = await updatePackage(values);

            if (response.success) {
                toast.success(response.message || "Package updated successfully");
                resetForm();
                setTimeout(() => {
                    onClose();
                    reloadData();
                }, 300);
            } else {
                toast.error(response.message || "Failed to update package");
            }
        } catch (error) {
            toast.error("An error occurred while updating the package.");
            console.error(error);
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    // Fallback default values if initialValues is not provided
    const defaultFormValues: PackageType = {
        id: initialValues?.id ?? 0,
        name: initialValues?.name || "",
        price: initialValues?.price ?? 0,
        sessionsCount: initialValues?.sessionsCount ?? 1,
        category: initialValues?.category || [],
        link: initialValues?.link || "",
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center cursor-pointer p-4"
        >
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col mx-3">
                <div className="flex justify-between items-center p-4">
                    <h2 className="font-semibold">Update Package</h2>
                    <CgClose className="w-4 h-4 cursor-pointer" onClick={onClose} />
                </div>

                {/* Form Body */}
                <Formik
                    initialValues={defaultFormValues}
                    enableReinitialize
                    validationSchema={addPackageValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, setFieldValue, values }) => (
                        <Form>
                            <div className="flex flex-col gap-4 h-auto overflow-y-auto p-4">
                                {/* Name */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                                        Package Name <span className="text-red-500">*</span>
                                    </label>
                                    <Field
                                        id="name"
                                        name="name"
                                        type="text"
                                        placeholder="e.g. PRP Therapy"
                                        className="border border-gray-300 rounded-md text-sm p-2 w-full focus:ring-1 focus:ring-black focus:outline-none"
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className="text-red-600 text-xs"
                                    />
                                </div>

                                {/* Grid for Price and Sessions */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Price */}
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="price" className="text-sm font-medium text-gray-700">
                                            Price ($) <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            id="price"
                                            name="price"
                                            type="number"
                                            step="0.01"
                                            placeholder="0.00"
                                            className="border border-gray-300 rounded-md text-sm p-2 w-full focus:ring-1 focus:ring-black focus:outline-none"
                                        />
                                        <ErrorMessage
                                            name="price"
                                            component="div"
                                            className="text-red-600 text-xs"
                                        />
                                    </div>

                                    {/* Sessions Count */}
                                    <div className="flex flex-col gap-1">
                                        <label htmlFor="sessionsCount" className="text-sm font-medium text-gray-700">
                                            Sessions Count
                                        </label>
                                        <Field
                                            id="sessionsCount"
                                            name="sessionsCount"
                                            type="number"
                                            placeholder="1"
                                            className="border border-gray-300 rounded-md text-sm p-2 w-full focus:ring-1 focus:ring-black focus:outline-none"
                                        />
                                        <ErrorMessage
                                            name="sessionsCount"
                                            component="div"
                                            className="text-red-600 text-xs"
                                        />
                                    </div>
                                </div>

                                {/* Categories Multi-select Badges */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm font-medium text-gray-700">
                                        Categories <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex flex-wrap gap-2 pt-1">
                                        {CATEGORY_OPTIONS.map((cat) => {
                                            const isSelected = (values.category || []).includes(cat);
                                            return (
                                                <button
                                                    key={cat}
                                                    type="button"
                                                    onClick={() => {
                                                        const currentCategories = values.category || [];
                                                        const updated = isSelected
                                                            ? currentCategories.filter((c) => c !== cat)
                                                            : [...currentCategories, cat];
                                                        setFieldValue("category", updated);
                                                    }}
                                                    className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${isSelected
                                                        ? "bg-black text-white border-black"
                                                        : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
                                                        }`}
                                                >
                                                    {cat} {isSelected ? "✓" : "+"}
                                                </button>
                                            );
                                        })}
                                    </div>
                                    <ErrorMessage
                                        name="category"
                                        component="div"
                                        className="text-red-600 text-xs pt-1"
                                    />
                                </div>

                                {/* External Link */}
                                <div className="flex flex-col gap-1">
                                    <label htmlFor="link" className="text-sm font-medium text-gray-700">
                                        External Link
                                    </label>
                                    <Field
                                        id="link"
                                        name="link"
                                        type="url"
                                        placeholder="https://example.com/package"
                                        className="border border-gray-300 rounded-md text-sm p-2 w-full focus:ring-1 focus:ring-black focus:outline-none"
                                    />
                                    <ErrorMessage
                                        name="link"
                                        component="div"
                                        className="text-red-600 text-xs"
                                    />
                                </div>
                            </div>

                            {/* Action Buttons */}
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
                                    {isLoading || isSubmitting ? "Updating..." : "Update"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default EditPackageModal;