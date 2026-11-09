
import type { ValidationResult } from "../utils/fileValidator";

export interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  uploadedAt: Date;
  validation: ValidationResult;
}
