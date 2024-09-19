import mongoose, { Schema } from "mongoose";

const submissionSchema = new Schema({
    uniqueId: {
        type: String,
        required: true
    },
    bullying: {
        type: Number,
        default: false
    },
    financialIssues: {
        type: Number,
        default: false
    },
    mentalHealth: {
        type: Number,
        default: false
    },
    physicalHealth: {
        type: Number,
        default: false
    },
    genderDiscrimination: {
        type: Number,
        default: false
    },
    physicalDisability: {
        type: Number,
        default: false
    },
    workingAndStudying: {
        type: Number
    },
    interestedInStudies: {
        type: Number
    },
    schoolFarOff: {
        type: Number
    }
});

export const student = mongoose.model("student", submissionSchema);