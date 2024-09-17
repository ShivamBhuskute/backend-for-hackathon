import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { spawn } from "child_process";
import axios from "axios";

let fastApiProcess;

// Function to start the FastAPI server as a child process
const startFastApiServer = () => {
    fastApiProcess = spawn("uvicorn", [
        "main:app",
        "--host",
        "127.0.0.1",
        "--port",
        "8000",
        "--reload",
    ]);

    fastApiProcess.stdout.on("data", (data) => {
        console.log(`FastAPI: ${data}`);
    });

    fastApiProcess.stderr.on("data", (data) => {
        console.error(`FastAPI Error: ${data}`);
    });

    fastApiProcess.on("close", (code) => {
        console.log(`FastAPI process exited with code ${code}`);
    });
};

// Start the FastAPI server when the Node.js app starts
startFastApiServer();

const predictStudent = asyncHandler(async (req, res) => {
    const studentData = req.body;

    // Validate input data
    if (!studentData) {
        throw new ApiError(400, "Student data is required.");
    }

    try {
        // Make a POST request to the FastAPI prediction endpoint
        const response = await axios.post(
            "http://127.0.0.1:8000/predict",
            studentData
        );

        // Send the prediction result back to the client
        return res.status(200).json(new ApiResponse(response.data));
    } catch (error) {
        // Handle errors appropriately
        if (error.response) {
            throw new ApiError(error.response.status, error.response.data);
        } else if (error.request) {
            throw new ApiError(
                500,
                "No response received from prediction service."
            );
        } else {
            throw new ApiError(500, error.message);
        }
    }
});

// Ensure to stop the FastAPI server when your Node.js app exits or crashes
process.on("exit", () => {
    if (fastApiProcess) {
        fastApiProcess.kill();
    }
});

export { predictStudent };
