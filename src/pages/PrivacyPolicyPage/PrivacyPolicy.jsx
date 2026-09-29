import PageLayout from "../../layouts/PageLayout";
import { privacyPolicyData } from "./data.js";
import "./PrivacyPolicy.css";

export default function PrivacyPolicy() {
  return (
    <PageLayout className="privacy-policy-page">
      <div className="privacy-policy-container">
        {/* Header */}
        <div className="privacy-policy-header">
          <h1>{privacyPolicyData.title}</h1>

          <div className="privacy-policy-meta">
            <p>
              <strong>Website:</strong> {privacyPolicyData.website}
            </p>

            <p>
              <strong>Company:</strong> {privacyPolicyData.company}
            </p>

            <p>
              <strong>Effective Date:</strong> {privacyPolicyData.effectiveDate}
            </p>

            <p>
              <strong>Last Updated:</strong> {privacyPolicyData.lastUpdated}
            </p>
          </div>
        </div>

        {/* Sections */}
        {privacyPolicyData.sections.map((section) => (
          <section className="privacy-policy-section" key={section.id}>
            <h2>
              {section.id}. {section.title}
            </h2>

            {/* Main paragraphs */}
            {section.paragraphs?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {/* Entities */}
            {section.entities?.map((entity, index) => (
              <div className="privacy-policy-entity" key={index}>
                <h3>{entity.name}</h3>
                <p>{entity.address}</p>
              </div>
            ))}

            {/* Paragraphs after entities */}
            {/* {section.paragraphsAfterEntities?.map(
              (paragraph, index) => (
                <p key={index}>{paragraph}</p>
              )
            )} */}

            {/* Main list */}
            {section.list && (
              <ul>
                {section.list.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            )}
            {section.paragraphsAfterList?.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}

            {/* Section-level retention table */}
            {section.table && (
              <div className="privacy-policy-table-wrapper">
                <table className="privacy-policy-table">
                  <thead>
                    <tr>
                      {section.table.headers.map((header, index) => (
                        <th key={index}>{header}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                          <td key={cellIndex}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Subsections */}
            {section.subsections?.map((subsection, index) => (
              <div className="privacy-policy-subsection" key={index}>
                {subsection.title && <h3>{subsection.title}</h3>}

                {subsection.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p key={paragraphIndex}>{paragraph}</p>
                ))}

                {subsection.list && (
                  <ul>
                    {subsection.list.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                )}

                {subsection.paragraphsAfterList?.map(
                  (paragraph, paragraphIndex) => (
                    <p key={paragraphIndex}>{paragraph}</p>
                  ),
                )}

                {/* Cookies */}
                {subsection.cookieTypes && (
                  <div className="privacy-policy-cookies">
                    {subsection.cookieTypes.map((cookie, cookieIndex) => (
                      <div className="privacy-policy-cookie" key={cookieIndex}>
                        <h4>{cookie.name}</h4>
                        <p>{cookie.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Retention table */}
                {subsection.table && (
                  <div className="privacy-policy-table-wrapper">
                    <table className="privacy-policy-table">
                      <thead>
                        <tr>
                          {subsection.table.headers.map((header, index) => (
                            <th key={index}>{header}</th>
                          ))}
                        </tr>
                      </thead>

                      <tbody>
                        {subsection.table.rows.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                              <td key={cellIndex}>{cell}</td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Contact */}
                {subsection.contact && (
                  <div className="privacy-policy-contact">
                    <h4>{subsection.contact.name}</h4>

                    <p>
                      <strong>{subsection.contact.organization}</strong>
                    </p>

                    <p>
                      <strong>Email:</strong> {subsection.contact.email}
                    </p>

                    <p>
                      <strong>Phone:</strong> {subsection.contact.phone}
                    </p>

                    <p>
                      <strong>Address:</strong>
                    </p>

                    <p>
                      {subsection.contact.address.map((line, index) => (
                        <span key={index}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Section contacts */}
            {section.contacts?.map((contact, index) => (
              <div className="privacy-policy-contact" key={index}>
                <h3>{contact.organization}</h3>

                {contact.website && (
                  <p>
                    <strong>Website:</strong> {contact.website}
                  </p>
                )}

                {contact.email && (
                  <p>
                    <strong>Email:</strong> {contact.email}
                  </p>
                )}

                {contact.phone && (
                  <p>
                    <strong>Phone:</strong> {contact.phone}
                  </p>
                )}

                {/* {contact.address && (
                  <p>
                    {contact.address.map((line, addressIndex) => (
                      <span key={addressIndex}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                )} */}
                {contact.address && (
                  <p>
                    <strong>{contact.addressLabel || "Address"}:</strong>
                    <br />
                    {contact.address.map((line, addressIndex) => (
                      <span key={addressIndex}>
                        {line}
                        <br />
                      </span>
                    ))}
                  </p>
                )}
              </div>
            ))}
          </section>
        ))}
      </div>
    </PageLayout>
  );
}
