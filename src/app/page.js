'use client'

import { useState } from 'react'

export default function Home() {
  // BMI State
  const [bmiHeight, setBmiHeight] = useState('')
  const [bmiWeight, setBmiWeight] = useState('')
  const [bmiResult, setBmiResult] = useState(null)
  const [bmiUnit, setBmiUnit] = useState('cm')

  // Ideal Weight State
  const [iwHeight, setIwHeight] = useState('')
  const [iwResult, setIwResult] = useState(null)
  const [iwUnit, setIwUnit] = useState('cm')

  // Calorie State
  const [calAge, setCalAge] = useState('')
  const [calHeight, setCalHeight] = useState('')
  const [calWeight, setCalWeight] = useState('')
  const [calGender, setCalGender] = useState('male')
  const [calActivity, setCalActivity] = useState('moderate')
  const [calResult, setCalResult] = useState(null)

  // Water State
  const [watWeight, setWatWeight] = useState('')
  const [watExercise, setWatExercise] = useState('')
  const [watResult, setWatResult] = useState(null)

  const toCm = (val, unit) => unit === 'cm' ? parseFloat(val) : parseFloat(val) * 30.48

  const calcBMI = () => {
    const h = toCm(bmiHeight, bmiUnit)
    const w = parseFloat(bmiWeight)
    if (h > 0 && w > 0) setBmiResult((w / Math.pow(h / 100, 2)).toFixed(1))
  }

  const calcIW = () => {
    const h = toCm(iwHeight, iwUnit)
    if (h > 0) {
      const min = (18.5 * Math.pow(h / 100, 2)).toFixed(1)
      const max = (24.9 * Math.pow(h / 100, 2)).toFixed(1)
      setIwResult(`${min} - ${max} kg`)
    }
  }

  const calcCal = () => {
    const a = parseFloat(calAge), h = toCm(calHeight, 'cm'), w = parseFloat(calWeight)
    if (a > 0 && h > 0 && w > 0) {
      let bmr = 10 * w + 6.25 * h - 5 * a + (calGender === 'male' ? 5 : -161)
      const mult = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725, extreme: 1.9 }
      setCalResult(Math.round(bmr * mult[calActivity]).toLocaleString() + ' kcal')
    }
  }

  const calcWat = () => {
    const w = parseFloat(watWeight), e = parseFloat(watExercise) || 0
    if (w > 0) setWatResult((w * 0.033 + (e / 30) * 0.35).toFixed(1) + ' Liters')
  }

  return (
    <div className="pb-24">
      <section className="py-20 text-center bg-gradient-to-b from-[var(--surface)] to-transparent">
        <div className="container">
          <h1 className="text-6xl font-black mb-6 tracking-tight">Premium Health Toolkit</h1>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
            Scientific calculators and professional medical insights to help you reach your peak performance.
          </p>
        </div>
      </section>

      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
          {/* BMI Calculator */}
          <div className="card">
            <h3 className="card-title">BMI Calculator</h3>
            <div className="unit-toggle">
              <button className={`unit-btn ${bmiUnit === 'cm' ? 'active' : ''}`} onClick={() => setBmiUnit('cm')}>Metric</button>
              <button className={`unit-btn ${bmiUnit === 'ft' ? 'active' : ''}`} onClick={() => setBmiUnit('ft')}>Imperial</button>
            </div>
            <div className="form-group">
              <label>Height ({bmiUnit})</label>
              <input type="number" className="form-control" value={bmiHeight} onChange={e => setBmiHeight(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" className="form-control" value={bmiWeight} onChange={e => setBmiWeight(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={calcBMI}>Calculate BMI</button>
            {bmiResult && (
              <div className="result-box">
                <span className="result-value">{bmiResult}</span>
                <p className="result-desc">Your Body Mass Index</p>
              </div>
            )}
          </div>

          {/* Ideal Weight */}
          <div className="card">
            <h3 className="card-title">Ideal Weight</h3>
            <div className="unit-toggle">
              <button className={`unit-btn ${iwUnit === 'cm' ? 'active' : ''}`} onClick={() => setIwUnit('cm')}>Metric</button>
              <button className={`unit-btn ${iwUnit === 'ft' ? 'active' : ''}`} onClick={() => setIwUnit('ft')}>Imperial</button>
            </div>
            <div className="form-group">
              <label>Height ({iwUnit})</label>
              <input type="number" className="form-control" value={iwHeight} onChange={e => setIwHeight(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={calcIW}>Check Range</button>
            {iwResult && (
              <div className="result-box">
                <span className="result-value">{iwResult}</span>
                <p className="result-desc">Healthy Weight Range</p>
              </div>
            )}
          </div>

          {/* Calorie Calculator */}
          <div className="card">
            <h3 className="card-title">Daily Calories (TDEE)</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-group">
                <label>Age</label>
                <input type="number" className="form-control" value={calAge} onChange={e => setCalAge(e.target.value)} />
              </div>
              <div className="form-group">
                <label>Gender</label>
                <select className="form-control" value={calGender} onChange={e => setCalGender(e.target.value)}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Height (cm)</label>
              <input type="number" className="form-control" value={calHeight} onChange={e => setCalHeight(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" className="form-control" value={calWeight} onChange={e => setCalWeight(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Activity</label>
              <select className="form-control" value={calActivity} onChange={e => setCalActivity(e.target.value)}>
                <option value="sedentary">Sedentary</option>
                <option value="moderate">Moderate</option>
                <option value="active">Active</option>
              </select>
            </div>
            <button className="btn-primary" onClick={calcCal}>Calculate Calories</button>
            {calResult && (
              <div className="result-box">
                <span className="result-value">{calResult}</span>
                <p className="result-desc">Daily Maintenance Calories</p>
              </div>
            )}
          </div>

          {/* Water Intake */}
          <div className="card">
            <h3 className="card-title">Water Intake</h3>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" className="form-control" value={watWeight} onChange={e => setWatWeight(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Daily Exercise (min)</label>
              <input type="number" className="form-control" value={watExercise} onChange={e => setWatExercise(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={calcWat}>Check Hydration</button>
            {watResult && (
              <div className="result-box">
                <span className="result-value">{watResult}</span>
                <p className="result-desc">Daily Water Goal</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}