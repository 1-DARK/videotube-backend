import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
        videos: [{ type: Schema.Types.ObjectId, ref: "Video" }],
        name: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

export const Playlist = mongoose.model("Playlist", playlistSchema);
