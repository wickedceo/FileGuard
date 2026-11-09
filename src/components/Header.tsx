
export default function Header() {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-icon">FG</div>
        <div>
          <h1>FileGuard</h1>
          <p>FILE VALIDATION & SECURITY</p>
        </div>
      </div>

      <div className="header-status">
        <span className="status-dot" />
        Validation System Ready
      </div>
    </header>
  );
}
