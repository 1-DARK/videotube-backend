const likeSchema = new Schema(
    {
        id: { type: String, required: true, unique: true },
        comment: { type: Schema.Types.ObjectId, ref: "Comment" },
        video: { type: Schema.Types.ObjectId, ref: "Video" },
        likedBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
        tweet: { type: Schema.Types.ObjectId, ref: "Tweet" },
    },
    { timestamps: true }
);

export const Like = mongoose.model("Like", likeSchema);
