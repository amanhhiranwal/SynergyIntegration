import searchIcon from "../../Assets/Support/search-icon-1.webp";
import "./FAQSearch.css";

const FAQSearch = ({ value, onChange, placeholder = "Type here" }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder={placeholder}
        className="search-input"
        value={value}
        onChange={onChange}
      />

      <button className="search-btn" type="button">
        <img loading="lazy" src={searchIcon} alt="search" />
      </button>
    </div>
  );
};

export default FAQSearch;