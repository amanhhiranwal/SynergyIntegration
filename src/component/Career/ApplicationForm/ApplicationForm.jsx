import { useRef, useState } from "react";
import "./ApplicationForm.css";

/* ---------- Inline icons (no dependency) ---------- */
const FileIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    width="24"
    height="24"
  >
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" strokeLinejoin="round" />
    <path d="M14 3v5h5" strokeLinejoin="round" />
  </svg>
);

const CheckIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" width="28" height="28">
    <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ---------- Config ---------- */
const ACCEPTED_TYPES = [".pdf", ".doc", ".docx"];
const MAX_SIZE_MB = 5;
const emptyForm = { fullName: "", email: "", phone: "", location: "" };

/* ---------- Helpers ---------- */
const formatSize = (bytes) =>
  bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;

/* ---------- Component ---------- */
const ApplicationForm = ({ jobTitle = "", onDone }) => {
  const [formData, setFormData] = useState(emptyForm);
  const [resume, setResume] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  /* ---------- Handlers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const clearError = (name) =>
    setErrors((prev) => ({ ...prev, [name]: "" }));

  const handleFile = (file) => {
    if (!file) return;
    const ext = "." + (file.name.split(".").pop() || "").toLowerCase();

    if (!ACCEPTED_TYPES.includes(ext)) {
      setErrors((prev) => ({ ...prev, resume: "Only PDF, DOC or DOCX files are allowed." }));
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, resume: `File size must be under ${MAX_SIZE_MB} MB.` }));
      return;
    }
    clearError("resume");
    setResume(file);
  };

  const removeResume = () => {
    setResume(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const validate = () => {
    const next = {};
    if (!formData.fullName.trim()) next.fullName = "Please enter your full name.";
    if (!formData.email.trim()) next.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim()))
      next.email = "Please enter a valid email address.";
    if (!formData.phone.trim()) next.phone = "Please enter your phone number.";
    else if (!/^[0-9+\-()\s]{7,15}$/.test(formData.phone.trim()))
      next.phone = "Please enter a valid phone number.";
    if (!formData.location.trim()) next.location = "Please enter your current location.";
    if (!resume) next.resume = "Please upload your resume.";
    return next;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const next = validate();
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }

    setSubmitting(true);
    try {
      // const payload = {
      //   jobId,
      //   jobTitle,
      //   fullName: formData.fullName.trim(),
      //   email: formData.email.trim(),
      //   phone: formData.phone.trim(),
      //   location: formData.location.trim(),
      //   resume,
      // };

      /* TODO: replace the simulated delay below with your API call, e.g.
      const fd = new FormData();
      Object.entries(payload).forEach(([key, value]) => fd.append(key, value));
      const res = await fetch("/api/careers/apply", { method: "POST", body: fd });
      if (!res.ok) throw new Error("Submission failed");
      */
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate network

      setSubmitted(true);
    } catch {
      setErrors((prev) => ({ ...prev, submit: "Something went wrong while submitting. Please try again." }));
    } finally {
      setSubmitting(false);
    }
  };

  /* ---------- Success screen ---------- */
  if (submitted) {
    const firstName = formData.fullName.trim().split(" ")[0] || "there";
    return (
      <div className="af-wrap af-success">
        <div className="af-success-icon">
          <CheckIcon />
        </div>
        <h2 className="af-title">Application Submitted</h2>
        <p className="af-subtitle">
          Thanks {firstName}, your application for <strong>&ldquo;{jobTitle}&rdquo;</strong> has
          been received. Our team will reach out at <strong>{formData.email}</strong> if your
          profile matches the role.
        </p>
        {onDone && (
          <button type="button" className="af-submit" onClick={onDone}>
            Back to All Jobs
          </button>
        )}
      </div>
    );
  }

  /* ---------- Form ---------- */
  return (
    <div className="af-wrap">
      <div className="af-header">
        <h2 className="af-title">Apply for &ldquo;{jobTitle}&rdquo;</h2>
        <p className="af-subtitle">Take the next step in your career and join our team.</p>
      </div>

      <form className="af-form" onSubmit={handleSubmit} noValidate>
        <div className={`af-field ${errors.fullName ? "af-field--invalid" : ""}`}>
          <input
            className="af-input"
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            autoComplete="name"
          />
          {errors.fullName && <span className="af-error">{errors.fullName}</span>}
        </div>

        <div className={`af-field ${errors.email ? "af-field--invalid" : ""}`}>
          <input
            className="af-input"
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          {errors.email && <span className="af-error">{errors.email}</span>}
        </div>

        <div className={`af-field ${errors.phone ? "af-field--invalid" : ""}`}>
          <input
            className="af-input"
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
          />
          {errors.phone && <span className="af-error">{errors.phone}</span>}
        </div>

        <div className={`af-field ${errors.location ? "af-field--invalid" : ""}`}>
          <input
            className="af-input"
            type="text"
            name="location"
            placeholder="Current Location"
            value={formData.location}
            onChange={handleChange}
          />
          {errors.location && <span className="af-error">{errors.location}</span>}
        </div>

        {/* Resume upload */}
        <div className={`af-field ${errors.resume ? "af-field--invalid" : ""}`}>
          <input
            ref={fileInputRef}
            className="af-file-input"
            type="file"
            accept={ACCEPTED_TYPES.join(",")}
            onChange={(e) => handleFile(e.target.files?.[0])}
            hidden
          />

          {resume ? (
            <div className="af-file">
              <FileIcon />
              <span className="af-file-name" title={resume.name}>{resume.name}</span>
              <span className="af-file-size">{formatSize(resume.size)}</span>
              <button
                type="button"
                className="af-file-remove"
                onClick={removeResume}
                aria-label="Remove resume"
              >
                ×
              </button>
            </div>
          ) : (
            <div
              className={`af-dropzone ${isDragging ? "af-dropzone--drag" : ""}`}
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                handleFile(e.dataTransfer.files?.[0]);
              }}
            >
              <FileIcon />
              <span className="af-dropzone-label">Upload your resume</span>
              <span className="af-dropzone-hint">
                PDF, DOC or DOCX — max {MAX_SIZE_MB} MB. Click or drag &amp; drop.
              </span>
            </div>
          )}
          {errors.resume && <span className="af-error">{errors.resume}</span>}
        </div>

        {errors.submit && <p className="af-error af-error--form">{errors.submit}</p>}

        <button type="submit" className="af-submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting…" : "Submit Now"}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
