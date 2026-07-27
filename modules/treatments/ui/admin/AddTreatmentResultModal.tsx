"use client";

import React, { FC, useState, useEffect } from "react";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { CgClose } from "react-icons/cg";

import { AddTreatmentResultModalProps } from "../../treatments.types";
import { addResults } from "../../treatments.service";

import { MAX_SIZE_MB } from "@/constants/data";
import CropModal from "@/components/ImageCropper";


const AddTreatmentResultModal: FC<AddTreatmentResultModalProps> = ({
    isOpen,
    onClose,
    treatment,
    reload
}) => {
    const [beforeImage, setBeforeImage] = useState<File | null>(null);
    const [afterImage, setAfterImage] = useState<File | null>(null);
    const [beforePreview, setBeforePreview] = useState<string | null>(null);
    const [afterPreview, setAfterPreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Crop modal states
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [tempImageFile, setTempImageFile] = useState<File | null>(null);
    const [cropFor, setCropFor] = useState<"before" | "after">("before");

    // Handle initial file selection & file size check
    const handleImageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        type: "before" | "after"
    ) => {
        const file = event.target.files?.[0];
        if (!file) return;

        if (file.size > MAX_SIZE_MB) {
            toast.error(`Please upload ${type} image smaller than 1.1 MB.`);
            return;
        }

        setTempImageFile(file);
        setCropFor(type);
        setIsCropOpen(true);

        // Reset the input value so selecting the same file consecutively triggers onChange
        event.target.value = "";
    };

    // Crop completed handler
    const handleCropComplete = (croppedFile: File) => {
        if (cropFor === "before") setBeforeImage(croppedFile);
        else setAfterImage(croppedFile);

        setTempImageFile(null);
        setIsCropOpen(false);
    };

    // Clean up memory leaks from object URLs when images change or component unmounts
    useEffect(() => {
        if (!beforeImage) {
            setBeforePreview(null);
            return;
        }
        const url = URL.createObjectURL(beforeImage);
        setBeforePreview(url);
        return () => URL.revokeObjectURL(url);
    }, [beforeImage]);

    useEffect(() => {
        if (!afterImage) {
            setAfterPreview(null);
            return;
        }
        const url = URL.createObjectURL(afterImage);
        setAfterPreview(url);
        return () => URL.revokeObjectURL(url);
    }, [afterImage]);

    const handleSubmit = async () => {
        if (!beforeImage || !afterImage) {
            toast.error("Both images are required");
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("treatmentId", String(treatment.id));
            formData.append("beforeImage", beforeImage);
            formData.append("afterImage", afterImage);

            const response = await addResults(formData);

            if (response.success) {
                toast.success(response.message);
                setBeforeImage(null);
                setAfterImage(null);
                setTimeout(() => {
                    onClose();
                    reload();
                }, 500);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("Failed to add result");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div onClick={onClose} className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div onClick={(e) => e.stopPropagation()} className="flex max-h-[90vh] w-full max-w-lg flex-col rounded-lg bg-white shadow-xl cursor-default">
                {/* Header */}
                <div className="flex justify-between items-center p-4">
                    <h2 className="font-semibold">Add New Treatment Result</h2>
                    <CgClose className="w-4 h-4 cursor-pointer" onClick={onClose} />
                </div>

                {/* Content Body */}
                <div className="flex flex-1 flex-col justify-between space-y-6 overflow-y-auto p-5">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Before Image Input */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">Before Image (≤ 1.1 MB)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, "before")}
                                className="block w-full text-xs text-gray-900 file:mr-3 file:cursor-pointer file:rounded-md file:border file:border-gray-200 file:bg-gray-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold hover:file:bg-gray-100"
                            />
                            {beforePreview && (
                                <div className="relative mt-2 h-58 w-full overflow-hidden rounded border border-gray-200">
                                    <Image
                                        src={beforePreview}
                                        alt="before preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        {/* After Image Input */}
                        <div className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">After Image (≤ 1.1 MB)</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleImageChange(e, "after")}
                                className="block w-full text-xs text-gray-900 file:mr-3 file:cursor-pointer file:rounded-md file:border file:border-gray-200 file:bg-gray-50 file:px-3 file:py-1.5 file:text-xs file:font-semibold hover:file:bg-gray-100"
                            />
                            {afterPreview && (
                                <div className="relative mt-2 h-58 w-full overflow-hidden rounded border border-gray-200">
                                    <Image
                                        src={afterPreview}
                                        alt="after preview"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Action Button */}

                    <div className="flex justify-end space-x-2">
                        <button
                            type="button"
                            className="px-4 py-2 text-sm bg-gray-300 rounded-lg w-full cursor-pointer"
                            onClick={onClose}
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading}
                            onClick={handleSubmit}
                            type="submit"
                            className="px-4 py-2 text-sm bg-black text-white rounded-lg w-full cursor-pointer"
                        >
                            {loading ? "Saving..." : "Add Result"}
                        </button>
                    </div>
                </div>

                {/* Crop Modal */}
                {isCropOpen && tempImageFile && (
                    <CropModal
                        imageFile={tempImageFile}
                        onCropComplete={handleCropComplete}
                        onClose={() => setIsCropOpen(false)}
                        cropWidth={500}
                        cropHeight={500}
                    />
                )}

                <ToastContainer />
            </div>
        </div>
    );
};

export default AddTreatmentResultModal;