'use client'

import { useState } from 'react'

export default function Home() {
  const [activeTab, setActiveTab] = useState('bmi')

  // BMI State
  const [bmiHeight, setBmiHeight] = useState('')
  const [bmiFeet, setBmiFeet] = useState('')
  const [bmiInches, setBmiInches] = useState('')
  const [bmiWeight, setBmiWeight] = useState('')
  const [bmiGender, setBmiGender] = useState('male')
  const [bmiResult, setBmiResult] = useState(null)
  const [bmiUnit, setBmiUnit] = useState('cm')

  // Ideal Weight State
  const [iwHeight, setIwHeight] = useState('')
  const [iwFeet, setIwFeet] = useState('')
  const [iwInches, setIwInches] = useState('')
  const [iwResult, setIwResult] = useState(null)
  const [iwUnit, setIwUnit] = useState('cm')

  // Calorie State
  const [calAge, setCalAge] = useState('')
  const [calHeight, setCalHeight] = useState('')
  const [calFeet, setCalFeet] = useState('')
  const [calInches, setCalInches] = useState('')
  const [calWeight, setCalWeight] = useState('')
  const [calUnit, setCalUnit] = useState('cm')
  const [calGender, setCalGender] = useState('male')
  const [calActivity, setCalActivity] = useState('moderate')
  const [calResult, setCalResult] = useState(null)

  // Water State
  const [watWeight, setWatWeight] = useState('')
  const [watExercise, setWatExercise] = useState('')
  const [watResult, setWatResult] = useState(null)

  const toCm = (val, unit, ft = '', inch = '') => {
    if (unit === 'cm') return parseFloat(val) || 0
    const f = parseFloat(ft) || 0
    const i = parseFloat(inch) || 0
    return (f * 30.48) + (i * 2.54)
  }

  const calcBMI = () => {
    const h = toCm(bmiHeight, bmiUnit, bmiFeet, bmiInches)
    const w = parseFloat(bmiWeight)
    if (h > 0 && w > 0) {
      const bmi = (w / Math.pow(h / 100, 2)).toFixed(1)
      let category = ''
      let color = ''
      
      if (bmi < 18.5) { category = 'Underweight'; color = 'var(--info)'; }
      else if (bmi < 25) { category = 'Normal Weight'; color = 'var(--success)'; }
      else if (bmi < 30) { category = 'Overweight'; color = 'var(--warning)'; }
      else { category = 'Obese'; color = 'var(--danger)'; }
      
      setBmiResult({ value: bmi, category, color })
    }
  }

  const calcIW = () => {
    const h = toCm(iwHeight, iwUnit, iwFeet, iwInches)
    if (h > 0) {
      const min = (18.5 * Math.pow(h / 100, 2)).toFixed(1)
      const max = (24.9 * Math.pow(h / 100, 2)).toFixed(1)
      setIwResult(`${min} - ${max} kg`)
    }
  }

  const calcCal = () => {
    const a = parseFloat(calAge), h = toCm(calHeight, calUnit, calFeet, calInches), w = parseFloat(calWeight)
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

  const tabs = [
    { id: 'bmi', label: 'BMI' },
    { id: 'iw', label: 'Ideal Weight' },
    { id: 'cal', label: 'Calories' },
    { id: 'wat', label: 'Water' }
  ]

  return (
    <div className="pb-24">
      <section className="py-20 text-center bg-gradient-to-b from-[var(--surface)] to-transparent">
        <div className="container">
          <h1 className="text-6xl font-black mb-6 tracking-tight">Health Toolkit</h1>
          <p className="text-xl text-[var(--text-muted)] max-w-2xl mx-auto font-medium">
            Select a tool below to start your health analysis.
          </p>
        </div>
      </section>

      <div className="container max-w-4xl">
        {/* Tab Switcher */}
        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`nav-btn !rounded-full !px-8 !py-3 ${activeTab === tab.id ? 'active nav-home' : '!bg-[var(--surface)] !text-[var(--text-main)] !shadow-none'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Active Calculator Display */}
        <div className="calculator-container">
          {activeTab === 'bmi' && (
            <div className="card animate-fadeIn">
              <h3 className="card-title">BMI Calculator</h3>
              <div className="form-group">
                <label>Gender</label>
                <div className="flex justify-center gap-2">
                  <button className={`unit-btn ${bmiGender === 'male' ? 'active' : 'border border-[var(--border)]'}`} onClick={() => setBmiGender('male')}>Male</button>
                  <button className={`unit-btn ${bmiGender === 'female' ? 'active' : 'border border-[var(--border)]'}`} onClick={() => setBmiGender('female')}>Female</button>
                </div>
              </div>
              <div className="unit-toggle">
                <button className={`unit-btn ${bmiUnit === 'cm' ? 'active' : ''}`} onClick={() => setBmiUnit('cm')}>Metric (cm)</button>
                <button className={`unit-btn ${bmiUnit === 'ft' ? 'active' : ''}`} onClick={() => setBmiUnit('ft')}>Imperial (ft/in)</button>
              </div>
              <div className="form-group">
                <label>Height</label>
                {bmiUnit === 'cm' ? (
                  <input type="number" className="form-control" placeholder="cm" value={bmiHeight} onChange={e => setBmiHeight(e.target.value)} />
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" className="form-control" placeholder="Feet" value={bmiFeet} onChange={e => setBmiFeet(e.target.value)} />
                    <input type="number" className="form-control" placeholder="Inches" value={bmiInches} onChange={e => setBmiInches(e.target.value)} />
                  </div>
                )}
              </div>
              <div className="form-group">
                <label>Weight (kg)</label>
                <input type="number" className="form-control" value={bmiWeight} onChange={e => setBmiWeight(e.target.value)} />
              </div>
              <button className="btn-primary" onClick={calcBMI}>Calculate BMI</button>
              {bmiResult && (
                <div className="result-box" style={{ borderLeft: `8px solid ${bmiResult.color}` }}>
                  <span className="result-value">{bmiResult.value}</span>
                  <p className="text-xl font-bold mt-2" style={{ color: bmiResult.color }}>{bmiResult.category}</p>
                  <div className="mt-4 pt-4 border-t border-[var(--border)] text-sm text-[var(--text-muted)]">
                    <p>Ideal BMI: <strong>18.5 - 24.9</strong></p>
                    <p className="mt-1">Status: Your weight is {bmiResult.category.toLowerCase()}.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'iw' && (
            <div className="card animate-fadeIn">
              <h3 className="card-title">Ideal Weight</h3>
              <div className="unit-toggle">
                <button className={`unit-btn ${iwUnit === 'cm' ? 'active' : ''}`} onClick={() => setIwUnit('cm')}>Metric (cm)</button>
                <button className={`unit-btn ${iwUnit === 'ft' ? 'active' : ''}`} onClick={() => setIwUnit('ft')}>Imperial (ft/in)</button>
              </div>
              <div className="form-group">
                <label>Height</label>
                {iwUnit === 'cm' ? (
                  <input type="number" className="form-control" placeholder="cm" value={iwHeight} onChange={e => setIwHeight(e.target.value)} />
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" className="form-control" placeholder="Feet" value={iwFeet} onChange={e => setIwFeet(e.target.value)} />
                    <input type="number" className="form-control" placeholder="Inches" value={iwInches} onChange={e => setIwInches(e.target.value)} />
                  </div>
                )}
              </div>
              <button className="btn-primary" onClick={calcIW}>Check Range</button>
              {iwResult && (
                <div className="result-box">
                  <span className="result-value">{iwResult}</span>
                  <p className="result-desc">Healthy Weight Range</p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'cal' && (
            <div className="card animate-fadeIn">
              <h3 className="card-title">Daily Calories (TDEE)</h3>
              <div className="flex gap-4 mb-4">
                <div className="form-group !mb-0">
                  <label>Age</label>
                  <input type="number" className="form-control" value={calAge} onChange={e => setCalAge(e.target.value)} />
                </div>
                <div className="form-group !mb-0">
                  <label>Gender</label>
                  <select className="form-control" value={calGender} onChange={e => setCalGender(e.target.value)}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
              </div>
              <div className="unit-toggle mb-4">
                <button className={`unit-btn ${calUnit === 'cm' ? 'active' : ''}`} onClick={() => setCalUnit('cm')}>Metric (cm)</button>
                <button className={`unit-btn ${calUnit === 'ft' ? 'active' : ''}`} onClick={() => setCalUnit('ft')}>Imperial (ft/in)</button>
              </div>
              <div className="form-group">
                <label>Height</label>
                {calUnit === 'cm' ? (
                  <input type="number" className="form-control" placeholder="cm" value={calHeight} onChange={e => setCalHeight(e.target.value)} />
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <input type="number" className="form-control" placeholder="Feet" value={calFeet} onChange={e => setCalFeet(e.target.value)} />
                    <input type="number" className="form-control" placeholder="Inches" value={calInches} onChange={e => setCalInches(e.target.value)} />
                  </div>
                )}
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
          )}

          {activeTab === 'wat' && (
            <div className="card animate-fadeIn">
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
          )}
        </div>
      </div>
    </div>
  )
}