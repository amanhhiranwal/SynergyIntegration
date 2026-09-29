import { useState } from "react";
import "./PreviousTicketsModal.css";
import "../../pages/SupportPage/SupportPage.css";
import FAQSearch from "../FAQSearch/FAQSearch";
import { levenshtein, tokenize } from "../FAQSearch/searchUtils";

const tickets = [];

const PreviousTicketsModal = ({ onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTickets = tickets.filter((ticket) => {
    const searchTokens = tokenize(searchTerm);

    if (!searchTokens.length) return true;

    const titleWords = tokenize(ticket.title);

    return searchTokens.some((searchWord) =>
      titleWords.some(
        (titleWord) =>
          titleWord.includes(searchWord) ||
          levenshtein(searchWord, titleWord) <= 1,
      ),
    );
  });
  return (
    <div>
      <div className="sp-modal-overlay" onClick={onClose}>
        <div className="sp-ticket-modal" onClick={(e) => e.stopPropagation()}>
          <div className="sp-modal-header">
            <h2>Previous Cases</h2>
            <button className="sp-close-btn" onClick={onClose}>
              ×
            </button>
          </div>
          <div>
            <FAQSearch
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="sp-modal-body">
            <div className="sp-model-items">
              <div className="sp-modal-body">
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <div key={ticket.id} className="sp-model-items">
                      <p>{ticket.title}</p>
                    </div>
                  ))
                ) : searchTerm.trim() ? (
                  <p>No data found</p>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviousTicketsModal;