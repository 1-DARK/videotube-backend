// id: String, // pk
// username: String,
// email: String,
// fullName: String,
// avatar: String,
// coverImage: String,
// watchHistory: [mongoose.Schema.Types.ObjectId],
// password: String,
// refreshToken: String,
// createdAt: Date,
// updatedAt: Date
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken'
import mongoose, { Schema } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    fullname: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: true
    },
    avatar: {
        type: String,
        required: true,
    },
    coverTmage: {
        type: String,
    },
    watchHistory: [{
        type: Schema.Types.ObjectId,
        ref: "Video"
    }],
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken: { type: String }  // use jwt token because when user logged so i give some identity in the form of token.
},
    { timestamps: true } // timestamps: true — automatically adds createdAt and updatedAt.

)
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next() // Skip hashing if password hasn't changed
    this.password = bcrypt.hash(this.password, 10) // Hash the password securely
    next() //Proceed with saving once done
}) //no use of arrow function

//To implement isPasswordCorrect, you compare the plaintext password a user provides during login with the hashed password stored in the database using bcrypt.compare.
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}
// Generate ACCESS_TOKEN_SECRET you use : 
// node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
userSchema.methods.generateAccessToken = function () {
    // short lived access key
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname
    },
        process.env.ACCESS_TOKEN_SECRET,    // Secret key (should be stored in environment variables)
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }// Token valid for 1 hour
    );
}
// Generate REFRESH_TOKEN_SECRET you use : 
// node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
userSchema.methods.generateRefreshToken = function () {
    // short lived access key
    return jwt.sign({
        _id: this._id // in refresh token you need only id
    },
        process.env.REFRESH_TOKEN_SECRET,    // Secret key (should be stored in environment variables)
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }// Token valid for 1 hour
    );
}

export const User = mongoose.model('User', userSchema)