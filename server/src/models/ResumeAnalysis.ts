
import mongoose, { Schema } from "mongoose";

const ResumeAnalysisSchema = new Schema(
  {
    originalFileName: {
      type: String,
      required: true,
    },
    jobDescription: {
      type: String,
      required: true,
    },
    resumeText: {
      type: String,
      required: true,
      select: false,
    },
    matchScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    analysis: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ResumeAnalysis = mongoose.model(
  "ResumeAnalysis",
  ResumeAnalysisSchema
);
