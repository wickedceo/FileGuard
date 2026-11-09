
export interface FileRules {
  allowedExtensions: string[];
  allowedTypes: string[];
  maxSize: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

export const DEFAULT_FILE_RULES: FileRules = {
  allowedExtensions: ["pdf", "png", "jpg", "jpeg", "txt", "docx"],
  allowedTypes: [
    "application/pdf",
    "image/png",
    "image/jpeg",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ],
  maxSize: 10 * 1024 * 1024, // 10 MB
};

export function validateFile(
  file: File,
  rules: FileRules = DEFAULT_FILE_RULES
): ValidationResult {
  const errors: string[] = [];

  const lastDot = file.name.lastIndexOf(".");
  const extension =
    lastDot > 0 ? file.name.slice(lastDot + 1).toLowerCase() : "";

  if (!extension || !rules.allowedExtensions.includes(extension)) {
    errors.push("File extension is not allowed.");
  }

  if (!file.type || !rules.allowedTypes.includes(file.type)) {
    errors.push("File type is not allowed or could not be identified.");
  }

  if (file.size === 0) {
    errors.push("Empty files are not allowed.");
  }

  if (file.size > rules.maxSize) {
    errors.push("File exceeds the maximum allowed size of 10 MB.");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
