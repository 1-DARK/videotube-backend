import jwt from 'jsonwebtoken'
import { User } from '../models/usermodels.js'
import { ApiError } from '../utils/ApiError.js'
import { asynchandler } from '../utils/asynchandles.js'


export const verifyjwt = asynchandler(async (req, __dirname, next) => {
    const token = req.cookies.accessToken || req.header("Authorization")?.replace("Bearer", "")
    if (!token) {
        throw new ApiError(401, "Unauthorized")
    }
    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findById(decodedToken?._id).select('-password -refreshToken')
        if (!user) {
            throw new ApiError(401, "Unauthorized")
        }
        req.user = user
        next()
    } catch (error) {
        throw new ApiError(401, error?.message || "Innvalid Access Token")
    }
})