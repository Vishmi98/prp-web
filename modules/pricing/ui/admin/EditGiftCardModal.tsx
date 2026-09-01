"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Formik, Form, FormikProps, ErrorMessage, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { CgClose } from "react-icons/cg";

import { EditGiftCardModalProps, GiftCardDataType } from "../../pricing.types";

import { MAX_SIZE_MB } from "@/constants/data";
import CropModal from "@/components/ImageCropper";
import { updateGiftCard } from "../../pricing.service";
import { addGiftCardValidationSchema } from "../../pricing.utils";


const EditGiftCardModal: React.FC<EditGiftCardModalProps> = ({ isOpen, onClose, initialValues, reloadData }) => {
    const [image, setImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    // Crop modal state
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [tempImageFile, setTempImageFile] = useState<File | null>(null);

    // Image change handler
    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = event.target.files?.[0];

        if (!file) return;

        if (file.size > MAX_SIZE_MB) {
            toast.error(
                "Please upload cover image smaller than 1.1 MB."
            );
            return;
        }

        setTempImageFile(file);
        setIsCropOpen(true);
    };

    // Cropping complete handler
    const handleCropComplete = (croppedFile: File) => {
        setImage(croppedFile);

        setTempImageFile(null);
        setIsCropOpen(false);
    };

    const handleSubmit = async (
        values: GiftCardDataType,
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        if (!initialValues) return;

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("giftCardId", String(initialValues.id));
            formData.append("title", values.title);
            formData.append("description", values.description);

            if (image) {
                formData.append("image", image);
            }

            const response = await updateGiftCard(formData);

            if (response.success) {
                toast.success(response.message);
                resetForm();
                setImage(null);
                setTimeout(() => {
                    onClose();
                    reloadData();
                }, 300);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("An error occurred while updating the gift card.");
            console.error(error);
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };

    if (!isOpen || !initialValues) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center cursor-pointer">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col mx-3">
                <div className="flex justify-between items-center p-4">
                    <h2 className="font-semibold">Edit Service</h2>
                    <CgClose className="w-4 h-4 cursor-pointer" onClick={onClose} />
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={addGiftCardValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ }: FormikProps<GiftCardDataType>) => (
                        <Form>
                            <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto p-4">
                                <label className="text-sm">
                                    Title
                                    <Field name="title" type="text" className="border border-gray-300 rounded-sm text-sm p-2 w-full " />
                                    <ErrorMessage name="title" component="div" className="text-red-600 text-xs" />
                                </label>

                                <label className="text-sm">
                                    Description
                                    <Field
                                        name="description"
                                        as="textarea"
                                        rows={2}
                                        className="border border-gray-300 rounded-sm text-sm p-2 w-full h-16 resize-none"
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="text-red-600 text-xs"
                                    />
                                </label>

                                <label className="text-sm">
                                    Amount
                                    <Field name="amount" type="number" className="border border-gray-300 rounded-sm text-sm p-2 w-full " />
                                    <ErrorMessage name="amount" component="div" className="text-red-600 text-xs" />
                                </label>

                                {/* Thumbnail Image */}
                                <label className="text-sm flex flex-col">
                                    Image (≤ 1.1 MB)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-xs text-gray-900 file:mr-4 file:py-1 file:px-3
                      file:rounded-md file:border file:text-xs file:font-semibold
                      file:bg-gray-50 hover:file:bg-gray-100 file:border-gray-200 cursor-pointer"
                                    />
                                    {image ? (
                                        <Image
                                            src={URL.createObjectURL(image)}
                                            alt="Thumbnail Preview"
                                            width={278}
                                            height={154}
                                            className="mt-2"
                                        />
                                    ) : initialValues.imagePath ? (
                                        <Image
                                            src={initialValues.imagePath}
                                            alt="Thumbnail Preview"
                                            width={278}
                                            height={154}
                                            className="mt-2"
                                        />
                                    ) : null}
                                </label>
                            </div>
                            {/* Crop modal */}
                            {isCropOpen && tempImageFile && (
                                <CropModal
                                    imageFile={tempImageFile}
                                    onCropComplete={handleCropComplete}
                                    onClose={() => setIsCropOpen(false)}
                                    cropWidth={1328}
                                    cropHeight={800}
                                />
                            )}
                            <div className="flex justify-end space-x-2 p-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 text-sm bg-gray-300 rounded-lg w-full cursor-pointer"
                                    onClick={onClose}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={isLoading}
                                    type="submit"
                                    className="px-4 py-2 text-sm bg-black text-white rounded-lg w-full cursor-pointer"
                                >
                                    Update
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditGiftCardModal;