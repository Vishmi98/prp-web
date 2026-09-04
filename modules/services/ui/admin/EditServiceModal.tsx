"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Formik, Form, FormikProps, ErrorMessage, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { CgClose } from "react-icons/cg";

import { EditServiceModalProps, ServiceDataType } from "../../services.types";
import { updateService } from "../../services.service";
import { addServiceValidationSchema } from "../../services.utils";

import { MAX_SIZE_MB } from "@/constants/data";
import CropModal from "@/components/ImageCropper";


const EditServiceModal: React.FC<EditServiceModalProps> = ({ isOpen, onClose, initialValues, reloadData }) => {
    const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    // Crop modal state
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [tempImageFile, setTempImageFile] = useState<File | null>(null);
    const [cropFor, setCropFor] = useState<"thumbnail" | "cover">("thumbnail");

    // Image change handler
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>, type: "thumbnail" | "cover") => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_SIZE_MB) {
            toast.error(`Please upload ${type} image smaller than 1.1 MB.`);
            return;
        }

        setTempImageFile(file);
        setCropFor(type);
        setIsCropOpen(true);
    };

    // Cropping complete handler
    const handleCropComplete = (croppedFile: File) => {
        if (cropFor === "thumbnail") setThumbnailImage(croppedFile);

        setTempImageFile(null);
        setIsCropOpen(false);
    };

    const handleSubmit = async (
        values: ServiceDataType,
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        if (!initialValues) return;

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("serviceId", String(initialValues.id));
            formData.append("title", values.title);
            formData.append("description", values.description);

            if (thumbnailImage) {
                formData.append("thumbnailImage", thumbnailImage);
            }

            const response = await updateService(formData);

            if (response.success) {
                toast.success(response.message);
                resetForm();
                setThumbnailImage(null);
                setTimeout(() => {
                    onClose();
                    reloadData();
                }, 300);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("An error occurred while adding the service.");
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
                    validationSchema={addServiceValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ }: FormikProps<ServiceDataType>) => (
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
                                        rows={4}
                                        className="border border-gray-300 rounded-sm text-sm p-2 w-full h-24  resize-none"
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className="text-red-600 text-xs"
                                    />
                                </label>

                                {/* Thumbnail Image */}
                                <label className="text-sm flex flex-col">
                                    Thumbnail Image (≤ 1.1 MB)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, "thumbnail")}
                                        className="block w-full text-xs text-gray-900 file:mr-4 file:py-1 file:px-3
                      file:rounded-md file:border file:text-xs file:font-semibold
                      file:bg-gray-50 hover:file:bg-gray-100 file:border-gray-200 cursor-pointer"
                                    />
                                    {thumbnailImage ? (
                                        <Image
                                            src={URL.createObjectURL(thumbnailImage)}
                                            alt="Thumbnail Preview"
                                            width={150}
                                            height={150}
                                            className="mt-2"
                                        />
                                    ) : initialValues.thumbnailImagePath ? (
                                        <Image
                                            src={initialValues.thumbnailImagePath}
                                            alt="Thumbnail Preview"
                                            width={150}
                                            height={150}
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
                                    cropWidth={cropFor === "thumbnail" ? 320 : 1800}
                                    cropHeight={cropFor === "thumbnail" ? 350 : 900}
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
                                    {isLoading ? "Updating..." : "Update"}
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

export default EditServiceModal;