import mongoose, { Schema } from "mongoose";

const postSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            index: true
        },
        featuredImage: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)


export const Post = mongoose.model("Post", postSchema)