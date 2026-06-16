import { useState } from "react";
import "./App.css";

function App() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [years, setYears] = useState("");
  const [results, setResults] = useState(null);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    if (!loanAmount || isNaN(loanAmount) || loanAmount <= 0) {
      tempErrors.loanAmount = "Please enter a valid loan amount.";
    }
    if (!interestRate || isNaN(interestRate) || interestRate <= 0) {
      tempErrors.interestRate = "Please enter a valid interest rate.";
    }
    if (!years || isNaN(years) || years <= 0) {
      tempErrors.years = "Please enter a valid tenure.";
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const calculateEMI = () => {
    if (!validate()) {
      setResults(null);
      return;
    }

    const P = Number(loanAmount);
    const annualRate = Number(interestRate);
    const N = Number(years) * 12;

    const R = annualRate / 12 / 100;

    // Core EMI calculation logic
    const emiValue = (P * R * Math.pow(1 + R, N)) / (Math.pow(1 + R, N) - 1);
    
    const totalPaymentValue = emiValue * N;
    const totalInterestValue = totalPaymentValue - P;

    setResults({
      emi: emiValue.toFixed(2),
      totalInterest: totalInterestValue.toFixed(2),
      totalPayment: totalPaymentValue.toFixed(2),
    });
  };

  return (
    <div className="container">
      <div className="app-wrapper">
        <header className="app-header">
          <h1>EMI Calculator</h1>
          <p>Calculate your monthly loan payments instantly.</p>
        </header>

        <div className="card calculator-card">
          <div className="form-group">
            <label>Loan Amount (₹)</label>
            <div className="input-wrapper">
              <span className="prefix">₹</span>
              <input
                type="number"
                placeholder="e.g. 500000"
                value={loanAmount}
                onChange={(e) => {
                  setLoanAmount(e.target.value);
                  if (errors.loanAmount) setErrors({ ...errors, loanAmount: null });
                }}
                className={errors.loanAmount ? "error-input" : ""}
              />
            </div>
            {errors.loanAmount && <span className="error-text">{errors.loanAmount}</span>}
          </div>

          <div className="form-group">
            <label>Interest Rate (% P.A.)</label>
            <div className="input-wrapper">
              <span className="prefix">%</span>
              <input
                type="number"
                placeholder="e.g. 8.5"
                value={interestRate}
                onChange={(e) => {
                  setInterestRate(e.target.value);
                  if (errors.interestRate) setErrors({ ...errors, interestRate: null });
                }}
                className={errors.interestRate ? "error-input" : ""}
              />
            </div>
            {errors.interestRate && <span className="error-text">{errors.interestRate}</span>}
          </div>

          <div className="form-group">
            <label>Loan Tenure (Years)</label>
            <div className="input-wrapper">
              <span className="prefix">📅</span>
              <input
                type="number"
                placeholder="e.g. 5"
                value={years}
                onChange={(e) => {
                  setYears(e.target.value);
                  if (errors.years) setErrors({ ...errors, years: null });
                }}
                className={errors.years ? "error-input" : ""}
              />
            </div>
            {errors.years && <span className="error-text">{errors.years}</span>}
          </div>

          <button className="calculate-btn" onClick={calculateEMI}>
            Calculate EMI
          </button>
        </div>

        {results && (
          <div className="card results-card">
            <h2>Calculation Results</h2>
            <div className="results-grid">
              <div className="result-item primary-result">
                <div className="result-icon">💸</div>
                <div className="result-details">
                  <span className="result-label">Monthly EMI</span>
                  <span className="result-value">₹ {Number(results.emi).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="result-item">
                <div className="result-icon">📈</div>
                <div className="result-details">
                  <span className="result-label">Total Interest Payable</span>
                  <span className="result-value">₹ {Number(results.totalInterest).toLocaleString('en-IN')}</span>
                </div>
              </div>
              <div className="result-item">
                <div className="result-icon">💰</div>
                <div className="result-details">
                  <span className="result-label">Total Payment (Prin + Int)</span>
                  <span className="result-value">₹ {Number(results.totalPayment).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <footer className="app-footer">
          <div className="footer-content">
            <p className="author-name">Dasari Neelachalam</p>
            <a href="mailto:neelachalamdasari33@gmail.com" className="email-link">
              neelachalamdasari33@gmail.com
            </a>
            
            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noreferrer"
              className="digital-heroes-link"
            >
              <button className="digital-heroes-btn">Built for Digital Heroes</button>
            </a>
          </div>
          <div className="footer-bottom">
            <p>Built with React & Vercel</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;