import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const Uploadoncloudinary = async (localFilePath) => {
    try {
        // console.log('Cloudinary Config', {
        //     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        //     api_key: process.env.CLOUDINARY_API_KEY,
        //     api_secret: process.env.CLOUDINARY_API_SECRET
        // })

        if (!localFilePath) return null
        const response = await cloudinary.uploader.upload(
            localFilePath, {
            resource_type: 'auto'
        }
        )
        console.log('File uploaded on cloudinary src' + response.url)
        // if file uploaded then i will delete from our servers
        fs.unlinkSync(localFilePath)
        return response
    } catch (error) {
        fs.unlinkSync(localFilePath)
        return null
    }
}
const deletecloudinary = async (publicId) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        console.log('Delete from cloudinary', publicId)
    } catch (error) {
        console.log("Error delete from cloudinary", error)
    }
}

export default { Uploadoncloudinary, deletecloudinary };