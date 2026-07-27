import mongoose from "mongoose";

const beforeAfterSchema = new mongoose.Schema(
    {
        beforeImagePath: {
            type: String,
            required: true,
        },

        beforeImageId: {
            type: String,
            required: true,
        },

        afterImagePath: {
            type: String,
            required: true,
        },

        afterImageId: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
    }
);


const treatmentSchema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
        },

        title: {
            type: String,
            required: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
        },


        // Overview Section
        overview: {
            numberOfTreatments: {
                type: Number,
                default: 1,
            },

            treatmentTime: {
                type: String,
                // Example: "45-60 mins"
            },

            recoveryTime: {
                type: String,
                // Example: "None"
            },

            maximumResults: {
                type: String,
                // Example: "Up to 1 year"
            },

            pricing: {
                amount: {
                    type: Number,
                    // Example: 283
                },

                currency: {
                    type: String,
                    default: "USD",
                },

                description: {
                    type: String,
                    // Example: "Premium PRP Treatments from"
                }
            }
        },


        shortDescription: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },


        benefits: [
            {
                type: String,
            }
        ],


        procedureSteps: [
            {
                type: String,
            }
        ],


        results: [
            beforeAfterSchema
        ],


        thumbnailImagePath: String,

        thumbnailImageId: String,

        coverImagePath: String,

        coverImageId: String,


        isPublish: {
            type: Boolean,
            default: false,
        },

    },
    {
        timestamps: true,
    }
);


const TreatmentModel =
    mongoose.models.Treatment ||
    mongoose.model("Treatment", treatmentSchema);


export default TreatmentModel;