import { asynchandler } from '../utils/asynchandles.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/usermodels.js'
import Uploadoncloudinary from '../utils/cloudinar.js'
import deletecloudinary from '../utils/cloudinar.js'
import jwt from 'jsonwebtoken'
const generateAccessandRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating refreshtoken and accesstoken")
    }
}
const register = asynchandler(async (req, res) => {
    const { fullname, email, username, password } = req.body
    // Validation
    if (
        [fullname, email, username, password].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }
    const existuser = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (existuser) {
        throw new ApiError(409, "User with email and username already exists")
    }
    const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverLocalPath = req.files?.coverImage?.[0]?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }
    // const avatar = await Uploadoncloudinary(avatarLocalPath)
    // let coverImage = ""
    // if (coverLocalPath) {
    //     coverImage = await Uploadoncloudinary(coverImage)
    // }

    let avatar;
    try {
        avatar = await Uploadoncloudinary(avatarLocalPath)
        console.log(' Uploaded Avatar', avatar)
    } catch (error) {
        console.log('Error Uploading Avatar', error)
        throw new ApiError(500, "Failed to upload avatar")
    }

    let coverImage;
    try {
        coverImage = await Uploadoncloudinary(coverLocalPath)
        console.log(' Uploaded coverimage', coverImage)
    } catch (error) {
        console.log('Error Uploading coverimage', error)
        throw new ApiError(500, "Failed to upload coverimag")
    }

    try {
        const user = await User.create({
            fullname,
            avatar: avatar.url,
            coverImage: coverImage?.url || "",
            email,
            password,
            username: username.toLowerCase()
        })
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        )
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering a user ")

        }
        return res.status(201).json(new Apiresponse(201), createdUser, "User registered succesfully")
    } catch (error) {
        console.log('User creation failed')
        if (avatar) {
            await deletecloudinary(avatar.public_id)
        }
        if (coverImage) {
            await deletecloudinary(avatar.public_id)
        }
        throw new ApiError(500, "Something went wrong while registering a user and images are deleted")
    }
})
const loginUser = asynchandler(async (req, res) => {
    // get data from body!
    const { email, username, password } = req.body
    //Validation
    if (!email) {
        throw new ApiError(400, "Email is required")
    }
    const user = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (!user) {
        throw new ApiError(404, "User not found ")
    }
    const ispass = await user.isPasswordCorrect(password)
    if (!ispass) {
        throw new ApiError(401, "PassWord not Correct ")
    }
    const { accessToken, refreshToken } = await
        generateAccessandRefreshToken(user._id)
    const loggedinuser = await User.findById(user._id).select(
        "-password -refreshToken"
    )
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    } // access token is live short term  and you can renew by sending a request by using refresh token you can use access token if 
    // you delete refresh token and it will logout to exiting users
    return res
        .status(200)
        .cookie('accessToken', accessToken, options)
        .cookie('refreshToken', refreshToken, options)
        .json(new Apiresponse(200, loggedinuser, "User Logged in successfully"))
})
const refreshAccessToken = asynchandler(async (req, res) => {
    const incomingrefreshtoken = req.cookies.refreshAccessToken || req.body.refreshToken
    if (!incomingrefreshtoken) {
        throw new ApiError(401, "Refresh Token is Required")
    }
    try {
        const decoded = jwt.verify(
            incomingrefreshtoken,
            process.env.REFRESH_TOKEN_SECRET
        )
        const user = await URIError.findById(decoded?._id)
        if (!user) {
            throw new ApiError(404, "Invalid Refresh Token")
        }
        if (incomingrefreshtoken !== user?.refreshToken) {
            throw new ApiError(404, "Invalid Refresh Token")
        }
        const options = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
        }
        const { refreshToken: newRefreshToken, accessToken } = await generateAccessandRefreshToken(user._id)
        return res
            .status(200)
            .cookie('accessToken', accessToken, options)
            .cookie('newrefreshToken', newRefreshToken, options)
            .json(new Apiresponse(200, { accessToken, refreshToken: newRefreshToken }, "Access Token refreshed successfully"))
    } catch (error) {
        throw new ApiError(500, "Something went wrong while refreshing access Token")
    }
})
const logoutUser = asynchandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user_id,
        {
            $set: {
                refreshToken: undefined,
            }

        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
    }
    return res
        .status(200)
        .clearCookie('accessToken', options)
        .clearCookie('refreshToken', options)
        .json(new Apiresponse(200, {}, "User Logout  successfully"))
})
const changecurrentpass = asynchandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)
    const ispassvalid = await user.isPasswordCorrect(oldPassword)
    if (!ispassvalid) {
        throw new ApiError(401, "Old Password is not correct")
    }
    user.password = newPassword
    await user.save({ validateBeforeSave: false })
    return res.status(200).json(new Apiresponse(200, {}, "Password changed successfully"))


})
const getcurrentuser = asynchandler(async (req, res) => {
    return res.status(200).json(new Apiresponse(200, req.user, "Current user fetched successfully"))
})
const updateaccountdetails = asynchandler(async (req, res) => {
    const { fullname, email } = req.body
    if (!fullname || !email) {
        throw new ApiError(400, "Fullname and username are required")
    }
    User.findById().select("-password -refreshToken")
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                fullname,
                email
            }
        },
        {
            new: true,
        }
    ).select("-password -refreshToken")
    return res.status(200).json(new Apiresponse(200, user, "Account details updated successfully"))
})
const updateuseravatar = asynchandler(async (req, res) => {
    const avatarLocalPath = req.file?.path
    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }
    const avatar = await Uploadoncloudinary(avatarLocalPath)
    if (!avatar.url) {
        throw new ApiError(500, "Failed to upload avatar")
    }
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        {
            new: true,
        }
    ).select("-password -refreshToken")
    return res.status(200).json(new Apiresponse(200, user, "Avatar updated successfully"))
})
const updateusercoveravatar = asynchandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path
    if (!coverImageLocalPath.url) {
        throw new ApiError(400, "Cover image file is missing")
    }
    const coverImage = await Uploadoncloudinary(coverImageLocalPath)
    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                coverImage: coverImage.url
            }
        },
        {
            new: true,
        }
    ).select("-password -refreshToken")
    return res.status(200).json(new Apiresponse(200, user, "Cover image updated successfully"))
})

const getuserchannelprofile = asynchandler(async (req, res) => {
    const { username } = req.params
    if (!username || username.trim() === "") {
        throw new ApiError(400, "Username is required")
    }
    const channel = await User.aggregate(
        [
            {
                $match: {
                    username: usernamw?.toLowerCase()
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribers"
                }
            },
            {
                $lookup: {
                    from: " subscriptions",
                    localField: "_id",
                    foreignField: "subscriber",
                    as: "subscriptedto"
                }
            },
            {
                $addFields: {
                    subscribersCount: { $size: "$subscribers" },
                    channelsubscriptedtoCount: { $size: "$subscriptedto" }
                },

                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscriptedto.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            },
            {
                $project: {
                    fullname: 1,
                    username: 1,
                    avatar: 1,
                    coverImage: 1,
                    subscribersCount: 1,
                    channelsubscriptedtoCount: 1,
                    isSubscribed: 1,
                    coverImage: 1,
                    email: 1
                }
            }

        ]
    )
    if (!channel || channel.length === 0) {
        throw new ApiError(404, "Channel not found")
    }
    return res.status(200).json(new Apiresponse(200, channel[0], "Channel profile fetched successfully"))
})
const getwatchhistory = asynchandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user?._id)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [{
                    $lookup: {
                        from: "users",
                        localField: "owner",
                        foreignField: "_id",
                        as: "owner",
                        pipeline: [{
                            $project: {
                                fullname: 1,
                                username: 1,
                                avatar: 1
                            }
                        }, {
                            $addFields: {
                                owner: {
                                    $first: "$owner"
                                }
                            }
                        }
                        ]
                    }
                }]
            }
        }
    ])
    return res.status(200).json(new Apiresponse(200, user[0]?.watchHistory, "Watch history fetched successfully"))
})
export {

    register, loginUser, refreshAccessToken, logoutUser, changecurrentpass, getcurrentuser,
    updateaccountdetails, updateuseravatar, updateusercoveravatar, getuserchannelprofile, getwatchhistory
}