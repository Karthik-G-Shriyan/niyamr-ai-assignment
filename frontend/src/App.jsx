import React, { useState } from "react";
import axios from "axios";
import "./App.css"; // Add this import

export default function App() {
  const [pdf, setPdf] = useState(null);
  const [rules, setRules] = useState(["", "", ""]);
  const [results, setResults] = useState([]);

  const handleCheck = async () => {
    if (!pdf) return alert("Upload a PDF first");
    const form = new FormData();
    form.append("pdf", pdf);
    form.append("rules", JSON.stringify(rules));
    try {
      const res = await axios.post("http://localhost:5000/check", form);
      setResults(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Error checking document: " + (err.message || err));
    }
  };

  return (
    <div className="app-container">
      <h2>NIYAMR AI — Document Checker</h2>
      <input
        type="file"
        accept="application/pdf"
        className="file-input"
        onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
      />
      <div className="rules-container">
        {rules.map((r, i) => (
          <input
            key={i}
            className="rule-input"
            placeholder={`Rule ${i + 1}`}
            value={r}
            onChange={(e) => {
              const copy = [...rules];
              copy[i] = e.target.value;
              setRules(copy);
            }}
          />
        ))}
      </div>
      <button className="check-button" onClick={handleCheck}>
        Check Document
      </button>
      <table className="results-table">
        <thead>
          <tr>
            <th>Rule</th>
            <th>Status</th>
            <th>Evidence</th>
            <th>Reasoning</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {results.length === 0 ? (
            <tr>
              <td colSpan="5" className="empty-state">
                No results yet
              </td>
            </tr>
          ) : (
            results.map((r, i) => (
              <tr key={i}>
                <td>{r.rule}</td>
                <td>{r.status}</td>
                <td>{r.evidence}</td>
                <td>{r.reasoning}</td>
                <td>{r.confidence}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}