"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { Formik, Form, FormikProps, ErrorMessage, Field, FieldArray } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { CgClose } from "react-icons/cg";
import { FiDelete } from "react-icons/fi";

import { EditTreatmentModalProps, TreatmentDataType } from "../../treatments.types";
import { addTreatmentValidationSchema } from "../../treatments.utils";
import { updateTreatment } from "../../treatments.service";

import { MAX_SIZE_MB } from "@/constants/data";
import CropModal from "@/components/ImageCropper";


const EditTreatmentModal: FC<EditTreatmentModalProps> = ({ isOpen, onClose, initialValues, reloadData }) => {
    const [thumbnailImage, setThumbnailImage] = useState<File | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);
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
        else setCoverImage(croppedFile);

        setTempImageFile(null);
        setIsCropOpen(false);
    };

    const handleSubmit = async (
        values: TreatmentDataType,
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        if (!initialValues) return;

        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("treatmentId", String(initialValues.id));
            formData.append("title", values.title);
            formData.append("slug", values.slug);
            formData.append("shortDescription", values.shortDescription);
            formData.append("description", values.description);
            formData.append("numberOfTreatments", String(values.overview.numberOfTreatments));
            formData.append("treatmentTime", values.overview.treatmentTime || "");
            formData.append("recoveryTime", values.overview.recoveryTime || "");
            formData.append("maximumResults", values.overview.maximumResults || "");
            formData.append("priceAmount", String(values.overview.pricing.amount ?? 0));
            formData.append("currency", values.overview.pricing.currency);
            formData.append("priceDescription", values.overview.pricing.description || "");
            formData.append("benefits", JSON.stringify(values.benefits));
            formData.append("procedureSteps", JSON.stringify(values.procedureSteps));

            if (thumbnailImage) {
                formData.append("thumbnailImage", thumbnailImage);
            }

            if (coverImage) {
                formData.append("coverImage", coverImage);
            }

            const response = await updateTreatment(formData);

            if (response.success) {
                toast.success(response.message);
                resetForm();
                setThumbnailImage(null);
                setCoverImage(null);
                setTimeout(() => {
                    onClose();
                    reloadData();
                }, 300);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("An error occurred while updating the treatment.");
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
                    <h2 className="font-semibold">Edit Treatment</h2>
                    <CgClose className="w-4 h-4 cursor-pointer" onClick={onClose} />
                </div>

                <Formik
                    initialValues={initialValues}
                    validationSchema={addTreatmentValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values }: FormikProps<TreatmentDataType>) => (
                        <Form>
                            <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto p-4">
                                <label className="text-sm">
                                    Title
                                    <Field name="title" type="text" className="border border-gray-300 rounded-sm text-sm p-2 w-full " />
                                    <ErrorMessage name="title" component="div" className="text-red-600 text-xs" />
                                </label>
                                <label className="text-sm">
                                    Slug
                                    <Field name="slug" type="text" className="border border-gray-300 rounded-sm text-sm p-2 w-full " />
                                    <ErrorMessage name="slug" component="div" className="text-red-600 text-xs" />
                                </label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="text-sm">
                                        Number of Treatments
                                        <Field
                                            name="overview.numberOfTreatments"
                                            type="number"
                                            min={1}
                                            className="border border-gray-300 rounded-sm text-sm p-2 w-full"
                                        />
                                        <ErrorMessage name="overview.numberOfTreatments" component="div" className="text-red-600 text-xs" />
                                    </label>
                                    <label className="text-sm">
                                        Treatment Time
                                        <Field name="overview.treatmentTime" type="text" className="border border-gray-300 rounded-sm text-sm p-2 w-full " />
                                        <ErrorMessage name="overview.treatmentTime" component="div" className="text-red-600 text-xs" />
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <label className="text-sm">
                                        Recovery Time
                                        <Field name="overview.recoveryTime" type="text" className="border border-gray-300 rounded-sm text-sm p-2 w-full " />
                                        <ErrorMessage name="overview.recoveryTime" component="div" className="text-red-600 text-xs" />
                                    </label>
                                    <label className="text-sm">
                                        Maximum Results
                                        <Field name="overview.maximumResults" type="text" className="border border-gray-300 rounded-sm text-sm p-2 w-full " />
                                        <ErrorMessage name="overview.maximumResults" component="div" className="text-red-600 text-xs" />
                                    </label>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <label className="text-sm">
                                        Price Amount
                                        <Field
                                            name="overview.pricing.amount"
                                            type="number"
                                            min={0}
                                            className="border border-gray-300 rounded-sm text-sm p-2 w-full"
                                        />
                                        <ErrorMessage name="overview.pricing.amount" component="div" className="text-red-600 text-xs" />
                                    </label>
                                    <label className="text-sm">
                                        Currency
                                        <Field name="overview.pricing.currency" type="text" className="border border-gray-300 rounded-sm text-sm p-2 w-full " />
                                        <ErrorMessage name="overview.pricing.currency" component="div" className="text-red-600 text-xs" />
                                    </label>
                                    <label className="text-sm">
                                        Pricing Description
                                        <Field name="overview.pricing.description" type="text" className="border border-gray-300 rounded-sm text-sm p-2 w-full " />
                                        <ErrorMessage name="overview.pricing.description" component="div" className="text-red-600 text-xs" />
                                    </label>
                                </div>

                                <label className="text-sm">
                                    Short Description
                                    <Field as="textarea" name="shortDescription" className="border border-gray-300 rounded-sm text-sm p-2 w-full h-24 resize-none" />
                                    <ErrorMessage name="shortDescription" component="div" className="text-red-600 text-xs" />
                                </label>

                                <label className="text-sm">
                                    Description
                                    <Field as="textarea" name="description" className="border border-gray-300 rounded-sm text-sm p-2 w-full h-36 resize-none" />
                                    <ErrorMessage name="description" component="div" className="text-red-600 text-xs" />
                                </label>

                                <FieldArray name="benefits">
                                    {({ push, remove }) => (
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">Benefits</span>
                                                <button
                                                    type="button"
                                                    className="text-xs text-white bg-black px-3 py-1 rounded cursor-pointer"
                                                    onClick={() => push("")}
                                                >
                                                    Add
                                                </button>
                                            </div>

                                            {values.benefits.map((_, index) => (
                                                <div key={index} className="flex gap-2 items-center">
                                                    <Field
                                                        name={`benefits.${index}`}
                                                        type="text"
                                                        className="flex-1 border border-gray-300 rounded-sm text-sm p-2"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="text-sm text-red-500 px-3 py-1 rounded cursor-pointer"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <FiDelete />
                                                    </button>
                                                </div>
                                            ))}

                                            <ErrorMessage name="benefits" component="div" className="text-red-600 text-xs" />
                                        </div>
                                    )}
                                </FieldArray>

                                <FieldArray name="procedureSteps">
                                    {({ push, remove }) => (
                                        <div className="space-y-1">
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-sm font-medium">Procedure Steps</span>
                                                <button
                                                    type="button"
                                                    className="text-xs text-white bg-black px-3 py-1 rounded cursor-pointer"
                                                    onClick={() => push("")}
                                                >
                                                    Add
                                                </button>
                                            </div>

                                            {values.procedureSteps.map((_, index) => (
                                                <div key={index} className="flex gap-2 items-start">
                                                    <Field
                                                        name={`procedureSteps.${index}`}
                                                        type="text"
                                                        className="flex-1 border border-gray-300 rounded-sm text-sm p-2"
                                                    />
                                                    <button
                                                        type="button"
                                                        className="text-sm text-red-500 px-3 py-1 rounded cursor-pointer"
                                                        onClick={() => remove(index)}
                                                    >
                                                        <FiDelete />
                                                    </button>
                                                </div>
                                            ))}

                                            <ErrorMessage name="procedureSteps" component="div" className="text-red-600 text-xs" />
                                        </div>
                                    )}
                                </FieldArray>

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

                                {/* Cover Image */}
                                <label className="text-sm flex flex-col">
                                    Cover Image (≤ 1.1 MB)
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleImageChange(e, "cover")}
                                        className="block w-full text-xs text-gray-900 file:mr-4 file:py-1 file:px-3
                      file:rounded-md file:border file:text-xs file:font-semibold
                      file:bg-gray-50 hover:file:bg-gray-100 file:border-gray-200 cursor-pointer"
                                    />
                                    {coverImage ? (
                                        <Image
                                            src={URL.createObjectURL(coverImage)}
                                            alt="Cover Preview"
                                            width={300}
                                            height={120}
                                            className="mt-2"
                                        />
                                    ) : initialValues.coverImagePath ? (
                                        <Image
                                            src={initialValues.coverImagePath}
                                            alt="Cover Preview"
                                            width={300}
                                            height={120}
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

export default EditTreatmentModal;