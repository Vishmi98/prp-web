"use client";

import React, { FC, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { CgClose } from "react-icons/cg";
import { toast } from "react-toastify";

import { EditFAQModalProps } from "../../faq.types";
import { updateFAQ } from "../../faq.service";
import { faqValidationSchema } from "../../faq.utils";


const EditFAQModal: FC<EditFAQModalProps> = ({ isOpen, onClose, reloadData, initialValues }) => {
    const [loading, setLoading] = useState(false);
    if (!isOpen || !initialValues) return null;

    const submit = async (values: typeof initialValues, { setSubmitting }: any) => {
        try {
            setLoading(true);
            const response = await updateFAQ(values);
            if (!response.success) return toast.error(response.message || "Failed to update FAQ");
            toast.success(response.message || "FAQ updated successfully");
            onClose();
            reloadData();
        } catch {
            toast.error("An error occurred while updating the FAQ.");
        } finally {
            setLoading(false);
            setSubmitting(false);
        }
    };

    return <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
        <div onClick={(event) => event.stopPropagation()} className="w-full max-w-xl rounded-lg bg-white">
            <div className="flex items-center justify-between p-4"><h2 className="font-semibold">Edit FAQ</h2><button type="button" onClick={onClose} aria-label="Close"><CgClose /></button></div>
            <Formik initialValues={initialValues} enableReinitialize validationSchema={faqValidationSchema} onSubmit={submit}>
                {({ isSubmitting }) => <Form className="space-y-4 p-4">
                    <div className="flex flex-col gap-1"><label htmlFor="question" className="text-sm font-medium text-gray-700">Question <span className="text-red-500">*</span></label><Field id="question" name="question" className="w-full rounded-md border border-gray-300 p-2 text-sm" /><ErrorMessage name="question" component="div" className="text-xs text-red-600" /></div>
                    <div className="flex flex-col gap-1"><label htmlFor="answer" className="text-sm font-medium text-gray-700">Answer <span className="text-red-500">*</span></label><Field as="textarea" id="answer" name="answer" rows={5} className="w-full resize-none rounded-md border border-gray-300 p-2 text-sm" /><ErrorMessage name="answer" component="div" className="text-xs text-red-600" /></div>
                    <div className="flex gap-2"><button type="button" onClick={onClose} className="w-full rounded-lg bg-gray-200 px-4 py-2 text-sm">Cancel</button><button type="submit" disabled={loading || isSubmitting} className="w-full rounded-lg bg-black px-4 py-2 text-sm text-white">{loading ? "Updating..." : "Update"}</button></div>
                </Form>}
            </Formik>
        </div>
    </div>;
};

export default EditFAQModal;