
import type { UploadedFile } from "../types/file";
import FileCard from "./FileCard";

interface FileListProps {
  files: UploadedFile[];
  onRemove: (id: string) => void;
}

export default function FileList({ files, onRemove }: FileListProps) {
  if (files.length === 0) return null;

  return (
    <section className="file-list-section">
      <div className="section-heading">
        <div>
          <h2>Validation results</h2>
          <p>{files.length} file(s) processed</p>
        </div>
      </div>

      <div className="file-list">
        {files.map((uploadedFile) => (
          <FileCard
            key={uploadedFile.id}
            uploadedFile={uploadedFile}
            onRemove={onRemove}
          />
        ))}
      </div>
    </section>
  );
}
