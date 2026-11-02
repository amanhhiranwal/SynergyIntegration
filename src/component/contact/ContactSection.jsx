import { useState } from "react";
import "../NavbarAndFooter/Navbar&Footer.css";
import axios from "axios";
import "./toast.css";
import QonevoBrochure from "../../Assets/QonevoBrochure.pdf";

const ContactSection = ({ variant = "home" }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [message, setMessage] = useState("");
  const [countryCode, setCountryCode] = useState("");
const [isDropdownOpen, setIsDropdownOpen] = useState(false);
// const countryOptions = [
//   { code: "+1", label: "+1 (US)" },
//   { code: "+91", label: "+91 (IN)" },
//   { code: "+44", label: "+44 (UK)" },
//   { code: "+61", label: "+61 (AU)" },

//   // GCC Countries
//   { code: "+973", label: "+973 (BH)" }, // Bahrain
//   { code: "+965", label: "+965 (KW)" }, // Kuwait
//   { code: "+968", label: "+968 (OM)" }, // Oman
//   { code: "+974", label: "+974 (QA)" }, // Qatar
//   { code: "+966", label: "+966 (SA)" }, // Saudi Arabia
//   { code: "+971", label: "+971 (AE)" }, // United Arab Emirates
// ];

const countryOptions = [
{ code: "+1", label: "+1 (US)", minDigits: 10, maxDigits: 10 },
{ code: "+91", label: "+91 (IN)", minDigits: 10, maxDigits: 10 },
{ code: "+44", label: "+44 (UK)", minDigits: 10, maxDigits: 10 },
{ code: "+61", label: "+61 (AU)", minDigits: 9, maxDigits: 9 },

// GCC Countries
{ code: "+973", label: "+973 (BH)", minDigits: 8, maxDigits: 8 },
{ code: "+965", label: "+965 (KW)", minDigits: 8, maxDigits: 8 },
{ code: "+968", label: "+968 (OM)", minDigits: 8, maxDigits: 8 },
{ code: "+974", label: "+974 (QA)", minDigits: 8, maxDigits: 8 },
{ code: "+966", label: "+966 (SA)", minDigits: 9, maxDigits: 9 },
{ code: "+971", label: "+971 (AE)", minDigits: 9, maxDigits: 9 },
];


  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "",
  });

  const [errors, setErrors] = useState({});
  const [emailTouched, setEmailTouched] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const showToast = (message, type) => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "",
      });
    }, 3000);
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setWebsite("");
    setMessage("");
    setErrors({});
    setEmailTouched(false);
  };

  const validateEmail = (value) => {
    if (!value.includes("@")) {
      return "Email must contain @";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return "Enter a valid email address";
    }

    return "";
  };

  const validateForm = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Full name is required";
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else {
      const emailError = validateEmail(email);

      if (emailError) {
        newErrors.email = emailError;
      }
    }
// if (!/^\d{7,15}$/.test(phone)) {
//   newErrors.phone = "Please enter a valid phone number";
// }
const selectedCountry = countryOptions.find(
(item) => item.code === countryCode
);

if (!selectedCountry) {
newErrors.countryCode = "Please select a country code";
} else if (
phone.length < selectedCountry.minDigits ||
phone.length > selectedCountry.maxDigits
) {
newErrors.phone = `Phone number must contain exactly ${selectedCountry.maxDigits} digits`;
}

if (!countryCode) {
  newErrors.countryCode = "Please select a country code";
}
    if (!message.trim()) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      fullName: name,
      email,
      phoneNumber: phone,
      countryCode: countryCode,
      companyName: company,
      websiteUrl: website,
      helpMessage: message,
    };

    const BASE_URL = import.meta.env.VITE_BASE_URL || "https://api.qonevo.co.in";

    try {
      await axios.post(`${BASE_URL}/api/v1/contact/create-contact`, payload);

      showToast(
        "Message sent successfully! You can now download the brochure.",
        "success",
      );

      setIsSubmitted(true);
      resetForm();
    } catch (err) {
      console.error(err);

      showToast("Failed to send message!", "error");
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");

    link.href = QonevoBrochure;
    link.download = "Synergy-Brochure.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      className={`contact-section contact-section-${variant}`}
      id="contact-section"
    >
      {toast.show && (
        <div className={`toast-box ${toast.type}`}>{toast.message}</div>
      )}

      <div className="contact-container">
        {/* HEADING */}
        <div className="text-center contact-text">
          <div className="section-headings">
            <h2 className="section-title">Let’s connect</h2>

            <p className="section-subtitle">
              Have a question, project, or partnership in mind? We’re here to
              make your next display smarter.
            </p>
          </div>
        </div>

        {/* FORM */}
        <form className="contact-form row g-4" onSubmit={handleSubmit}>
          {/* NAME */}
          <div className="col-md-6 col-12">
            <input
              type="text"
              className="form-control-custom"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            {errors.name && (
              <small className="text-danger">{errors.name}</small>
            )}
          </div>

          {/* EMAIL */}
          <div className="col-md-6 col-12">
            <input
              type="email"
              className="form-control-custom"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                const value = e.target.value;

                setEmail(value);

                if (emailTouched) {
                  setErrors({
                    ...errors,
                    email: validateEmail(value),
                  });
                }
              }}
              onBlur={() => {
                setEmailTouched(true);

                setErrors({
                  ...errors,
                  email: validateEmail(email),
                });
              }}
            />

            {errors.email && emailTouched && (
              <small className="text-danger">{errors.email}</small>
            )}
          </div>

                 {/* PHONE */}
 {/* PHONE */}
<div className="col-12 mt-4 contact-fields">
  <div className="phone-input-group">
    {/* Custom Country Code Dropdown */}
    <div className="custom-country-dropdown">
      <button
        type="button"
        className="form-control-custom country-dropdown-btn"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <span>{countryCode || "Select Code"}</span>
        <span className={`dropdown-arrow ${isDropdownOpen ? "open" : ""}`}>
          ▼
        </span>
      </button>

      {isDropdownOpen && (
        <ul className="country-dropdown-menu">
          {countryOptions.map((item) => (
            <li
              key={item.code}
              className={`country-dropdown-item ${
                countryCode === item.code ? "selected" : ""
              }`}
              onClick={() => {
                setCountryCode(item.code);
                setIsDropdownOpen(false);
              }}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}

      {errors.countryCode && (
        <small className="text-danger d-block">
          {errors.countryCode}
        </small>
      )}
    </div>

    {/* Phone Input */}
    <div className="phone-number-wrapper">
      <input
        type="tel"
        className="form-control-custom phone-number-input"
        placeholder="Phone Number"
        value={phone}
maxLength={
  countryOptions.find((item) => item.code === countryCode)?.maxDigits || 15
}        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
      />

      {errors.phone && (
        <small className="text-danger d-block">
          {errors.phone}
        </small>
      )}
    </div>
  </div>
</div>

          {/* COMPANY */}
          <div className="col-md-6 col-12 mt-4">
            <input
              type="text"
              className="form-control-custom"
              placeholder="Company Name"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
          </div>

          {/* WEBSITE */}
          <div className="col-md-6 col-12 mt-4">
            <input
              type="url"
              className="form-control-custom"
              placeholder="Website URL"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </div>

          {/* MESSAGE */}
          <div className="col-12 mt-4">
            <textarea
              className="form-control-custom"
              rows="2"
              placeholder="How Can We Help?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {errors.message && (
              <small className="text-danger">{errors.message}</small>
            )}
          </div>
{/* BUTTONS */}
<div className="col-12 text-center pt-2 mt-5 buttons-wrapper d-flex justify-content-center gap-3">
  <button type="submit" className="btn btn-submit px-4 py-2">
    Get in touch
  </button>

  <button
    type="button"
    className="btn btn-submit px-4 py-2"
    disabled={!isSubmitted}
    onClick={handleDownload}
    style={{
      opacity: isSubmitted ? 1 : 0.5,
      cursor: isSubmitted ? "pointer" : "not-allowed",
    }}
  >
    Download Brochure
  </button>
</div>

          {/* DIRECT CONTACT */}
          <div className="col-12 text-center pt-1 mt-4">
            <small className="text-secondary">
              Prefer direct contact? Reach us at{" "}
              {/* <a
                className="text-secondary text-decoration-none"
                href="mailto:business@qonevo.in"
              >
                business@qonevo.in
              </a> */}
              <a className="business-email" href="mailto:business@synergyintegration.ae">
                business@synergyintegration.ae
 
              </a>
            </small>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
