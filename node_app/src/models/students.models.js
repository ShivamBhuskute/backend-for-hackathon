import mongoose, {Schema} from "mongoose";

const submissionSchema = new Schema({
    bullying: {
        type: Number,
        default: false
    },
    finance: {
        type: Number,
        default: false
    },
    menIssue: {
        type: Number,
        default: false
    },
    phyIssue: {
        type: Number,
        default: false
    },
    discrimination: {
        type: Number,
        default: false
    },
    physical: {
        type: Number,
        default: false
    },
    Working_and_Studying: {
        type: Number
    },
    Not_Interested: {
        type: Number
    },
    schoolFar: {
        type: Number
    }
})

export const student = mongoose.model("student", submissionSchema)