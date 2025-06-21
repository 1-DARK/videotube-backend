import mongoose from "mongoose";
import { ApiError } from "../utils/ApiError.js";
const errorHandle = (err, req, res, next) => { // Copy paste to this file
    let error = err
    if (!(err instanceof ApiError)) {
        const statusCode = err.statusCode || (error instanceof mongoose.Error ? 400 : 500)
        const message = error.message || "Something went wrong"
        error = new ApiError(statusCode, message, error?.errors
            || [], err.stack
        )
    }
    const response = {
        ...error,
        message: error.message,
        ...(process.env.NODE_ENV === "development" ? {
            stack: error.stack
        } : {})
    }
    return res.status(error.statusCode).json(response)
}
export { errorHandle }