import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import axios from "axios";

const predictStudent = asyncHandler(async (req, res) => {
    const studentData = req.body;

    // Validate input data
    // Make a POST request to the FastAPI prediction endpoint
    // Send the prediction result back to the client

    if (!studentData) {
        throw new ApiError(400, "Student data is required.");
    }

    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            studentData
        );

        return res
            .status(201)
            .json(new ApiResponse(200, response.data, "Successful"));
    } catch (error) {
        if (error.response) {
            throw new ApiError(error.response.status, error.response.data);
        } else if (error.request) {
            // The request was made but no response was received
            throw new ApiError(
                500,
                "No response received from prediction service."
            );
        } else {
            // Something happened in setting up the request that triggered an Error
            throw new ApiError(500, error.message);
        }
    }
});

export { predictStudent };
