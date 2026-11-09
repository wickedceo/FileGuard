
import type { UploadedFile } from "../types/file";

interface FileCardProps {
  uploadedFile: UploadedFile;
  onRemove: (id: string) => void;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export default function FileCard({
  uploadedFile,
  onRemove,
}: FileCardProps) {
  const { file, validation } = uploadedFile;

  return (
    <article className="file-card">
      <div className="file-icon">FILE</div>

      <div className="file-details">
        <h3>{file.name}</h3>
        <p>
          {formatFileSize(file.size)} · {file.type || "Unknown type"}
        </p>

        <span
          className={`validation-badge ${
            validation.valid ? "valid" : "invalid"
          }`}
        >
          {validation.valid ? "✓ Valid file" : "✕ Invalid file"}
        </span>

        {!validation.valid && (
          <ul className="validation-errors">
            {validation.errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
      </div>

      <button
        type="button"
        className="remove-button"
        onClick={() => onRemove(uploadedFile.id)}
        aria-label={`Remove ${file.name}`}
      >
        Remove
      </button>
    </article>
  );
}
