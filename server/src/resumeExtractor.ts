
import path from "node:path";
import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export async function extractResumeText(
  file: Express.Multer.File
): Promise<string> {
  if (!file || file.size === 0) {
    throw new Error("Please upload a non-empty resume.");
  }

  if (file.size > MAX_FILE_SIZE) {
    throw new Error("Resume must be smaller than 5 MB.");
  }

  const ext = path.extname(file.originalname).toLowerCase();

  let text = "";

  if (ext === ".pdf") {
    const parser = new PDFParse({ data: file.buffer });
    try {
      const result = await parser.getText();
      text = result.text;
    } finally {
      await parser.destroy();
    }
  } else if (ext === ".docx") {
    const result = await mammoth.extractRawText({
      buffer: file.buffer,
    });
    text = result.value;
  } else if (ext === ".txt") {
    text = file.buffer.toString("utf8");
  } else {
    throw new Error("Supported formats: PDF, DOCX and TXT.");
  }

  const cleanedText = text
    .replace(/\r/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  if (cleanedText.length < 80) {
    throw new Error(
      "Very little text was extracted. If this is a scanned PDF, OCR may be required."
    );
  }

  return cleanedText;
}
