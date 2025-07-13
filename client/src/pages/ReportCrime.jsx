import React, { useState } from 'react';
import './ReportCrime.css';

export default function ReportCrime() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="report-container">
      <div className="report-left">
        <h1>Report a Crime</h1>
        <p>
          Help us make your area safer by reporting incidents you witness or experience. Your report can be anonymous and will assist law enforcement.
        </p>
      </div>

      <div className="report-right">
        {!submitted ? (
          <form className="report-form" onSubmit={handleSubmit}>
            <label>
              Name (Optional):
              <input type="text" placeholder="Enter your name" />
            </label>

            <label>
              Location:
              <input type="text" placeholder="City/Area/Locality" required />
            </label>

            <label>
              Type of Crime:
              <select required>
                <option value="">Select</option>
                <option>Robbery</option>
                <option>Assault</option>
                <option>Theft</option>
                <option>Cybercrime</option>
                <option>Other</option>
              </select>
            </label>

            <label>
              Description:
              <textarea placeholder="Provide details about the incident" required></textarea>
            </label>

            <button type="submit">Submit Report</button>
          </form>
        ) : (
          <div className="success-message">
            <h2>Report Successfully Submitted!</h2>
            <p>Thank you for helping make the community safer.</p>
          </div>
        )}
      </div>
    </div>
  );
}