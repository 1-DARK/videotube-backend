import multer from "multer";
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/temp')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

export const upload = multer({
    storage
})

// Summary (like a story)
// You're telling Multer: "When someone uploads a file..."
// "...store it in /tmp/my-uploads"
// "...and give it a name like profilePic-283298382.png"
// Then, you use upload in your API route to process the upload.