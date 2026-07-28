"use client";

import React, { FC, useState } from "react";
import Image from "next/image";
import { Formik, Form, FormikProps, ErrorMessage, Field } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { CgClose } from "react-icons/cg";

import { TeamDataType } from "../../team.types";
import { createMember } from "../../team.service";
import { addTeamInitialValues, addTeamValidationSchema } from "../../team.utils";

import { MAX_SIZE_MB } from "@/constants/data";
import CropModal from "@/components/ImageCropper";
import { AddModalProps } from "@/constants/types";


const AddMemberModal: FC<AddModalProps> = ({ isOpen, onClose, handleReload }) => {
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Crop modal state
    const [isCropOpen, setIsCropOpen] = useState(false);
    const [tempImageFile, setTempImageFile] = useState<File | null>(null);

    // Image change handler
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

    // Cropping complete handler
    const handleCropComplete = (croppedFile: File) => {
        setProfileImage(croppedFile);
        setTempImageFile(null);
        setIsCropOpen(false);
    };

    const handleSubmit = async (
        values: TeamDataType,
        { resetForm, setSubmitting }: { resetForm: () => void; setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        try {
            setIsLoading(true);

            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("firstName", values.firstName);
            if (values.lastName) formData.append("lastName", values.lastName);
            formData.append("specialization", values.specialization);

            // Social Links (pass as nested object string or individual keys according to backend specification)
            if (values.socialLinks) {
                formData.append("linkedin", values.socialLinks.linkedin || "");
                formData.append("instagram", values.socialLinks.instagram || "");
                formData.append("facebook", values.socialLinks.facebook || "");
            }

            if (profileImage) {
                formData.append("profileImage", profileImage);
            }

            const response = await createMember(formData);

            if (response.success) {
                toast.success(response.message);
                resetForm();
                setProfileImage(null);
                setTimeout(() => {
                    onClose();
                    handleReload();
                }, 300);
            } else {
                toast.error(response.message);
            }
        } catch (error) {
            toast.error("An error occurred while adding the member.");
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
                    <h2 className="font-semibold">Add New Member</h2>
                    <CgClose className="w-4 h-4 cursor-pointer" onClick={onClose} />
                </div>

                <Formik
                    initialValues={addTeamInitialValues}
                    validationSchema={addTeamValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ }: FormikProps<TeamDataType>) => (
                        <Form>
                            <div className="flex flex-col gap-4 h-[60vh] overflow-y-auto p-4">
                                <label className="text-sm">
                                    Title
                                    <Field name="title" type="text" placeholder="e.g. Dr. / Mr. / Ms." className="border border-gray-300 rounded-sm text-sm p-2 w-full " />
                                    <ErrorMessage name="title" component="div" className="text-red-600 text-xs" />
                                </label>

                                {/* Name Fields (First Name & Last Name) */}
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <label className="text-sm">
                                        First Name
                                        <Field
                                            name="firstName"
                                            type="text"
                                            placeholder="John"
                                            className="border border-gray-300 rounded-sm text-sm p-2 w-full "
                                        />
                                        <ErrorMessage name="firstName" component="div" className="text-red-600 text-xs" />
                                    </label>

                                    <label className="text-sm">
                                        Last Name (Optional)
                                        <Field
                                            name="lastName"
                                            type="text"
                                            placeholder="Doe"
                                            className="border border-gray-300 rounded-sm text-sm p-2 w-full "
                                        />
                                        <ErrorMessage name="lastName" component="div" className="text-red-600 text-xs" />
                                    </label>
                                </div>

                                {/* Specialization */}
                                <label className="text-sm">
                                    Specialization
                                    <Field
                                        name="specialization"
                                        type="text"
                                        placeholder="e.g. PRP Specialist / Dermatologist"
                                        className="border border-gray-300 rounded-sm text-sm p-2 w-full "
                                    />
                                    <ErrorMessage name="specialization" component="div" className="text-red-600 text-xs" />
                                </label>

                                {/* Social Links Sub-Section */}
                                <div className="pt-3 flex flex-col gap-3">
                                    <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Social Links (Optional)</h3>

                                    <label className="text-sm">
                                        LinkedIn URL
                                        <Field
                                            name="socialLinks.linkedin"
                                            type="text"
                                            placeholder="https://linkedin.com/in/username"
                                            className="border border-gray-300 rounded-sm text-sm p-2 w-full "
                                        />
                                        <ErrorMessage name="socialLinks.linkedin" component="div" className="text-red-600 text-xs" />
                                    </label>

                                    <label className="text-sm">
                                        Instagram URL
                                        <Field
                                            name="socialLinks.instagram"
                                            type="text"
                                            placeholder="https://instagram.com/username"
                                            className="border border-gray-300 rounded-sm text-sm p-2 w-full "
                                        />
                                        <ErrorMessage name="socialLinks.instagram" component="div" className="text-red-600 text-xs" />
                                    </label>

                                    <label className="text-sm">
                                        Facebook URL
                                        <Field
                                            name="socialLinks.facebook"
                                            type="text"
                                            placeholder="https://facebook.com/username"
                                            className="border border-gray-300 rounded-sm text-sm p-2 w-full "
                                        />
                                        <ErrorMessage name="socialLinks.facebook" component="div" className="text-red-600 text-xs" />
                                    </label>
                                </div>

                                {/* Thumbnail Image */}
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
                            {/* Crop modal */}
                            {isCropOpen && tempImageFile && (
                                <CropModal
                                    imageFile={tempImageFile}
                                    onCropComplete={handleCropComplete}
                                    onClose={() => setIsCropOpen(false)}
                                    cropWidth={300}
                                    cropHeight={300}
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
                                    Add
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

export default AddMemberModal;