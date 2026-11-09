
import { useRef, useState } from "react";

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void;
}

export default function FileUploader({
  onFilesSelected,
}: FileUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    onFilesSelected(Array.from(files));
  };

  return (
    <section
      className={`upload-zone ${isDragging ? "dragging" : ""}`}
      onDragOver={(event) => {
        event.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={(event) => {
        event.preventDefault();
        setIsDragging(false);
      }}
      onDrop={(event) => {
        event.preventDefault();
        setIsDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
    >
      <input
        ref={inputRef}
        type="file"
        multiple
        hidden
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />

      <div className="upload-icon">↑</div>

      <h2>Upload your files</h2>

      <p>
        Drag and drop your files here, or browse your device.
      </p>

      <button
        type="button"
        className="browse-button"
        onClick={() => inputRef.current?.click()}
      >
        Browse files
      </button>

      <span className="upload-hint">
        PDF, PNG, JPG, TXT, DOCX · Maximum 10 MB per file
      </span>
    </section>
  );
}
