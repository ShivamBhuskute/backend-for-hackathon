import mongoose, {Schema} from "mongoose";
import { Types } from "mongoose";

const teaacherSchema = new Schema({
    studentUniqueId: {
        type: String, 
        required: true
    },
    attendace: {
        type: Number
    },
    grades: {
        type: Number
    },
    streak: {
        type: Number
    },
    behaviour: {
        type: Number
    },
    test: {
        type: Number
    },
    attention: {
        type: Number
    },
})

export const teacher = mongoose.model("teacher", teaacherSchema);