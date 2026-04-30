'use client'

import { useState } from 'react'

export default function Home() {
  const [bmi, setBmi] = useState(null)
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')

  const calculateBMI = () => {
    if (height && weight) {
      const hMeters = height / 100
      const score = (weight / (hMeters * hMeters)).toFixed(1)
      setBmi(score)
    }
  }

  const getCategory = (score) => {
    if (score < 18.5) return { label: 'Underweight', color: '#6b9ac4' }
    if (score < 25) return { label: 'Normal Weight', color: '#81b29a' }
    if (score < 30) return { label: 'Overweight', color: '#f2cc8f' }
    return { label: 'Obese', color: '#e07a5f' }
  }

  return (
    <div className="container py-12">
      <section className="hero text-center mb-16">
        <h1 className="display-title mb-4">Precision Health Tools</h1>
        <p className="subtitle text-muted max-w-2xl mx-auto">
          Empower your fitness journey with our professional-grade health calculators and scientifically backed insights.
        </p>
      </section>

      <div className="grid-main">
        <div className="card calculator-card">
          <h2 className="card-title mb-6">BMI Calculator</h2>
          <div className="form-group mb-4">
            <label>Height (cm)</label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="e.g. 175"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
            />
          </div>
          <div className="form-group mb-6">
            <label>Weight (kg)</label>
            <input 
              type="number" 
              className="form-control" 
              placeholder="e.g. 70"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <button className="btn-primary w-full" onClick={calculateBMI}>
            Calculate BMI
          </button>

          {bmi && (
            <div className="result-area mt-8 animate-pop">
              <div className="result-val" style={{ color: getCategory(bmi).color }}>
                {bmi}
              </div>
              <div className="result-label">
                Category: <strong>{getCategory(bmi).label}</strong>
              </div>
            </div>
          )}
        </div>

        <div className="card info-card">
          <h2 className="card-title mb-6">Why Monitor BMI?</h2>
          <p className="mb-4">
            Body Mass Index (BMI) is a simple index of weight-for-height that is commonly used to classify underweight, overweight and obesity in adults.
          </p>
          <ul className="info-list">
            <li>Standardized health metric</li>
            <li>Predictor of potential risks</li>
            <li>Easy to track over time</li>
          </ul>
          <a href="/blog/what-is-bmi-and-how-to-calculate-it" className="text-link mt-6 inline-block">
            Read full guide &rarr;
          </a>
        </div>
      </div>

      <style jsx>{`
        .py-12 { padding-top: 3rem; padding-bottom: 3rem; }
        .mb-16 { margin-bottom: 4rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .text-center { text-align: center; }
        .display-title { font-size: 3.5rem; font-weight: 800; color: var(--text-main); line-height: 1.1; }
        .subtitle { font-size: 1.25rem; }
        .max-w-2xl { max-width: 42rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .w-full { width: 100%; }
        
        .form-control {
          width: 100%;
          padding: 1rem;
          border: 2px solid var(--border);
          border-radius: 12px;
          background: var(--bg-color);
          font-size: 1rem;
          outline: none;
          transition: var(--transition);
        }
        .form-control:focus { border-color: var(--primary); background: white; }
        
        .result-area {
          text-align: center;
          padding: 2rem;
          background: var(--bg-color);
          border-radius: 16px;
          border: 2px solid var(--primary-light);
        }
        .result-val { font-size: 4rem; font-weight: 800; line-height: 1; margin-bottom: 0.5rem; }
        .result-label { font-size: 1.1rem; color: var(--text-main); }
        
        .info-list { list-style: none; padding: 0; }
        .info-list li { margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem; }
        .info-list li::before { content: '✓'; color: var(--success); font-weight: bold; }
        
        .text-link { color: var(--primary); font-weight: 600; text-decoration: none; border-bottom: 2px solid transparent; transition: var(--transition); }
        .text-link:hover { border-bottom-color: var(--primary); }

        @keyframes pop {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-pop { animation: pop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); }
      `}</style>
    </div>
  )
}
