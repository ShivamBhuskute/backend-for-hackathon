import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { student } from "../models/students.models.js"; // Adjust the import based on your file structure
import { teacher } from "../models/teacher.models.js"; // Adjust the import based on your file structure

// Create a new submission
const studentSubmission = asyncHandler(async (req, res) => {
    const studentData = req.body;

    // Validate required fields
    const requiredFields = [
        "bullying",
        "finance",
        "menIssue",
        "phyIssue",
        "discrimination",
        "physical",
        "Working_and_Studying",
        "Not_Interested",
        "school_Far",
    ];

    for (const field of requiredFields) {
        if (studentData[field] === undefined) {
            throw new ApiError(400, `${field} is required.`);
        }
    }

    // Create a new student submission instance
    const newSubmission = new student({
        bullying: studentData.bullying,
        finance: studentData.finance,
        menIssue: studentData.menIssue,
        phyIssue: studentData.phyIssue,
        discrimination: studentData.discrimination,
        physical: studentData.physical,
        Working_and_Studying: studentData.Working_and_Studying,
        Not_Interested: studentData.Not_Interested,
        school_Far: studentData.school_Far,
    });

    // Save the submission to the database
    await newSubmission.save();

    // Send a success response
    res.status(201).json(
        new ApiResponse(201, "Submission created successfully", newSubmission)
    );
});

const teacherSubmission = asyncHandler(async (req, res) => {
    const teacherData = req.body;

    // Validate required fields
    const requiredFields = [
        "attendance",
        "grades",
        "streak",
        "behaviour",
        "test",
        "attention",
    ];

    for (const field of requiredFields) {
        if (teacherData[field] === undefined) {
            throw new ApiError(400, `${field} is required.`);
        }
    }

    // Create a new teacher submission instance
    const newSubmission = new teacher({
        attendance: teacherData.attendance,
        grades: teacherData.grades,
        streak: teacherData.streak,
        behaviour: teacherData.behaviour,
        test: teacherData.test,
        attention: teacherData.attention,
    });

    // Save the submission to the database
    await newSubmission.save();

    // Send a success response
    res.status(201).json(
        new ApiResponse(201, "Submission created successfully", newSubmission)
    );
});

// Export the handler
export { studentSubmission, teacherSubmission };
