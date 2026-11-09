
import { useState } from "react";
import Header from "./components/Header";
import FileUploader from "./components/FileUploader";
import FileList from "./components/FileList";
import {
  validateFile,
  DEFAULT_FILE_RULES,
} from "./utils/fileValidator";
import type { UploadedFile } from "./types/file";
import "./App.css";

function App() {
  const [files, setFiles] = useState<UploadedFile[]>([]);

  const handleFilesSelected = (selectedFiles: File[]) => {
    const newFiles: UploadedFile[] = selectedFiles.map((file) => ({
      id: crypto.randomUUID(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      validation: validateFile(file, DEFAULT_FILE_RULES),
    }));

    setFiles((currentFiles) => [...newFiles, ...currentFiles]);
  };

  const handleRemoveFile = (id: string) => {
    setFiles((currentFiles) =>
      currentFiles.filter((file) => file.id !== id)
    );
  };

  const validCount = files.filter(
    (file) => file.validation.valid
  ).length;

  const invalidCount = files.length - validCount;

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <section className="hero-section">
          <span className="eyebrow">SMART FILE PROTECTION</span>
          <h1>
            Validate files.
            <br />
            <span>Stay protected.</span>
          </h1>
          <p>
            Check file formats, types and sizes before using or
            sharing them. Fast, simple and reliable validation.
          </p>
        </section>

        <section className="stats-grid">
          <div className="stat-card">
            <span>Total files</span>
            <strong>{files.length}</strong>
          </div>

          <div className="stat-card">
            <span>Valid files</span>
            <strong className="success-text">{validCount}</strong>
          </div>

          <div className="stat-card">
            <span>Invalid files</span>
            <strong className="danger-text">{invalidCount}</strong>
          </div>
        </section>

        <FileUploader onFilesSelected={handleFilesSelected} />

        <FileList files={files} onRemove={handleRemoveFile} />

        {files.length > 0 && (
          <button
            type="button"
            className="clear-button"
            onClick={() => setFiles([])}
          >
            Clear all files
          </button>
        )}

        <footer className="app-footer">
          <p>FileGuard · File Validation & Security</p>
          <span>Client-side validation enabled</span>
        </footer>
      </main>
    </div>
  );
}

export default App;
