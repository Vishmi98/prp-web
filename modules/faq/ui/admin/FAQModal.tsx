"use client";

import React, { FC, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CgClose } from "react-icons/cg";
import { toast } from "react-toastify";

import { createFAQ } from "../../faq.service";
import { faqInitialValues, faqValidationSchema } from "../../faq.utils";
import { FAQFormValues } from "../../faq.types";

import { AddModalProps } from "@/constants/types";


const FAQModal: FC<AddModalProps> = ({ isOpen, onClose, handleReload }) => {
    const [loading, setLoading] = useState(false);
    if (!isOpen) return null;

    const submit = async (
        values: FAQFormValues, 
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            setLoading(true);
            const response = await createFAQ(values);
            if (!response.success) return toast.error(response.message || "Failed to create FAQ");
            toast.success(response.message || "FAQ created successfully");
            resetForm();
            onClose();
            handleReload();
        } catch {
            toast.error("An error occurred while adding the FAQ.");
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div onClick={(event) => event.stopPropagation()} className="w-full max-w-xl rounded-lg bg-white">
                <div className="flex items-center justify-between p-4">
                    <h2 className="font-semibold">Add New FAQ</h2>
                    <button type="button" onClick={onClose} aria-label="Close"><CgClose /></button>
                </div>
                <Formik initialValues={faqInitialValues} validationSchema={faqValidationSchema} onSubmit={submit}>
                    {({ isSubmitting }) => <Form className="space-y-4 p-4">
                        <FAQFields />
                        <div className="flex gap-2">
                            <button type="button" onClick={onClose} className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm">Cancel</button>
                            <button type="submit" disabled={loading || isSubmitting} className="w-full rounded-lg bg-black px-4 py-2 text-sm text-white">{loading ? "Adding..." : "Add"}</button>
                        </div>
                    </Form>}
                </Formik>
            </div>
        </div>
    );
};

export const FAQFields = () => <>
    <div className="flex flex-col gap-1">
        <label htmlFor="question" className="text-sm font-medium text-gray-700">Question <span className="text-red-500">*</span></label>
        <Field id="question" name="question" className="w-full rounded-md border border-gray-300 p-2 text-sm" />
        <ErrorMessage name="question" component="div" className="text-xs text-red-600" />
    </div>
    <div className="flex flex-col gap-1">
        <label htmlFor="answer" className="text-sm font-medium text-gray-700">Answer <span className="text-red-500">*</span></label>
        <Field as="textarea" id="answer" name="answer" rows={5} className="w-full resize-none rounded-md border border-gray-300 p-2 text-sm" />
        <ErrorMessage name="answer" component="div" className="text-xs text-red-600" />
    </div>
</>;

export default FAQModal;