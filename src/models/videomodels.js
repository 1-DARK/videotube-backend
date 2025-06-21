/*
owner ObjectId users
videoFile string
thumbnail string
title string
description string
duration number
views number
isPublished boolean
createdAt Date
updatedAt Date
*/
// Ah, you want to add a Cloudinary URL field to your schema to store the uploaded video file (or thumbnail image) from Cloudinary. Let’s add a cloudinaryUrl field to the schema:
import mongoose, { Schema } from "mongoose";
const videoSchema = new Schema({
    videoFile: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    views: {
        type: Number,
        default: 0,
    },
    isPublished: {
        type: Number,
        default: true,
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true })
export const video = mongoose.model('Video', videoSchema)