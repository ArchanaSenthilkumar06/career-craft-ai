
import { Router } from "express";
import multer from "multer";
import { extractResumeText } from "../resumeExtractor.js";
import { analyzeResume } from "../../resumeAnalysisService.js";
import { ResumeAnalysis } from "../models/ResumeAnalysis.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
    files: 1,
  },
  fileFilter: (_req, file, callback) => {
    const allowed = /\.(pdf|docx|txt)$/i.test(file.originalname);

    if (!allowed) {
      return callback(
        new Error("Only PDF, DOCX and TXT resumes are supported.")
      );
    }

    callback(null, true);
  },
});

router.post(
  "/analyze",
  upload.single("resume"),
  async (req, res, next) => {
    try {
      const jobDescription = String(
        req.body.jobDescription ?? ""
      ).trim();

      if (!req.file) {
        return res.status(400).json({
          error: "Please upload a resume.",
        });
      }

      if (jobDescription.length < 30) {
        return res.status(400).json({
          error: "Please enter a complete job description.",
        });
      }

      if (jobDescription.length > 10000) {
        return res.status(400).json({
          error: "Job description must be at most 10,000 characters.",
        });
      }

      const resumeText = await extractResumeText(req.file);

      const analysis = await analyzeResume(
        resumeText,
        jobDescription
      );

      const savedReport = await ResumeAnalysis.create({
        originalFileName: req.file.originalname,
        jobDescription,
        resumeText,
        matchScore: analysis.matchScore,
        analysis,
      });

      return res.status(201).json({
        success: true,
        reportId: savedReport._id,
        createdAt: savedReport.createdAt,
        fileName: savedReport.originalFileName,
        analysis,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get("/reports", async (_req, res, next) => {
  try {
    const reports = await ResumeAnalysis.find()
      .select("-resumeText -jobDescription")
      .sort({ createdAt: -1 })
      .limit(20)
      .lean();

    res.json({ reports });
  } catch (error) {
    next(error);
  }
});

export default router;
