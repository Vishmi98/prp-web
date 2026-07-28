"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { Formik, Form, FormikProps, ErrorMessage, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { RiStarFill } from "react-icons/ri";

import { MAX_SIZE_MB } from "@/constants/data";
import CropModal from "@/components/ImageCropper";
import { AddModalProps } from "@/constants/types";
import { StoryDataType } from "@/modules/story/story.types";
import { createStory } from "@/modules/story/story.service";
import {
    addStoryInitialValues,
    addStoryValidationSchema,
} from "@/modules/story/story.utils";


const AddStoryModal: FC<AddModalProps> = ({ isOpen, onClose, handleReload }) => {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Crop modal state
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [tempImageFile, setTempImageFile] = useState<File | null>(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_SIZE_MB) {
            toast.error("Please upload a profile image smaller than 1.1 MB.");
            return;
        }

        setTempImageFile(file);
        setIsCropOpen(true);
    };

    const handleCropComplete = (croppedFile: File) => {
        setProfileImage(croppedFile);
        setTempImageFile(null);
        setIsCropOpen(false);
    };

    const handleSubmit = async (
        values: StoryDataType,
        {
            resetForm,
            setSubmitting,
        }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("clientName", values.clientName);
            formData.append("treatmentName", values.treatmentName);
            formData.append("comment", values.comment);
            formData.append("rating", String(values.rating));
            formData.append("isPublish", String(values.isPublish ?? false));

            if (profileImage) {
                formData.append("profileImage", profileImage);
            }

            const response = await createStory(formData);

            if (response?.success) {
                toast.success(response.message || "Story added successfully!");
                resetForm();
                setProfileImage(null);
                setTimeout(() => {
                    onClose();
                    handleReload();
                }, 300);
            } else {
                toast.error(response?.message || "Failed to add story.");
            }
        } catch (error) {
            toast.error("An error occurred while adding the story.");
            console.error(error);
        } finally {
            setSubmitting(false);
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center cursor-pointer">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col mx-3">
                <div className="flex justify-between items-center p-4">
                    <h2 className="font-semibold">Add New Success Story</h2>
                    <CgClose className="w-4 h-4 cursor-pointer" onClick={onClose} />
                </div>

                <Formik
                    initialValues={addStoryInitialValues}
                    validationSchema={addStoryValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, setFieldValue }: FormikProps<StoryDataType>) => (
                        <Form>
                            <div className="flex flex-col gap-4 overflow-y-auto p-4 max-h-[60vh]">
                                {/* Client Name */}
                                <label className="text-sm">
                                    Client Name
                                    <Field
                                        name="clientName"
                                        type="text"
                                        className="border border-gray-300 rounded-sm text-sm p-2 w-full "
                                    />
                                    <ErrorMessage
                                        name="clientName"
                                        component="div"
                                        className="text-red-600 text-xs"
                                    />
                                </label>

                                {/* Treatment Name */}
                                <label className="text-sm">
                                    Treatment Name
                                    <Field
                                        name="treatmentName"
                                        type="text"
                                        className="border border-gray-300 rounded-sm text-sm p-2 w-full "
                                    />
                                    <ErrorMessage
                                        name="treatmentName"
                                        component="div"
                                        className="text-red-600 text-xs"
                                    />
                                </label>

                                {/* Rating Input */}
                                <div className="flex flex-col gap-1">
                                    <label className="text-sm">
                                        Rating
                                    </label>
                                    <div className="flex items-center gap-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <button
                                                key={star}
                                                type="button"
                                                onClick={() => setFieldValue("rating", star)}
                                                className="p-1 focus:outline-none"
                                            >
                                                <RiStarFill
                                                    className={`w-6 h-6 transition-colors ${star <= values.rating
                                                        ? "text-amber-400"
                                                        : "text-gray-200"
                                                        }`}
                                                />
                                            </button>
                                        ))}
                                        <span className="text-xs text-gray-500 ml-2">
                                            ({values.rating} / 5)
                                        </span>
                                    </div>
                                    <ErrorMessage
                                        name="rating"
                                        component="div"
                                        className="text-red-600 text-xs"
                                    />
                                </div>

                                {/* Story / Comment */}
                                <div className="flex flex-col">
                                    <label className="text-sm">
                                        Comment / Story
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="comment"
                                        rows={4}
                                        placeholder="Share client story (at least 100 characters)..."
                                        className="border border-gray-300 rounded-md text-sm p-2 w-full focus:outline-none focus:ring-2 focus:ring-black/5 resize-none"
                                    />
                                    <div className="flex justify-between items-center mt-0.5">
                                        <ErrorMessage
                                            name="comment"
                                            component="div"
                                            className="text-red-600 text-xs"
                                        />
                                        <span
                                            className={`text-xs ml-auto ${values.comment.length < 100
                                                ? "text-amber-600"
                                                : "text-green-600"
                                                }`}
                                        >
                                            {values.comment.length} / 200 min chars
                                        </span>
                                    </div>
                                </div>

                                {/* Profile Image Input */}
                                <label className="text-sm flex flex-col">
                                    Profile Image (≤ 1.1 MB)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="block w-full text-xs text-gray-900 file:mr-4 file:py-1 file:px-3
                                                      file:rounded-md file:border file:text-xs file:font-semibold
                                                      file:bg-gray-50 hover:file:bg-gray-100 file:border-gray-200 cursor-pointer"
                                    />
                                    {profileImage && (
                                        <Image
                                            src={URL.createObjectURL(profileImage)}
                                            alt="Thumbnail Preview"
                                            width={150}
                                            height={150}
                                            className="mt-2"
                                        />
                                    )}
                                </label>
                            </div>

                            {/* Action Buttons */}
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
                                    {isLoading ? "Saving..." : "Add Story"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>

                {/* Image Cropper Modal */}
                {isCropOpen && tempImageFile && (
                    <CropModal
                        imageFile={tempImageFile}
                        onCropComplete={handleCropComplete}
                        onClose={() => setIsCropOpen(false)}
                        cropWidth={300}
                        cropHeight={300}
                    />
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddStoryModal;