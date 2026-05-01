'use client'

import { useState } from 'react'
import Link from 'next/link'
import { blogs } from '@/data/blogs'

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
  const [calUnit, setCalUnit] = useState('cm')

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
    const a = parseFloat(calAge), h = toCm(calHeight, calUnit), w = parseFloat(calWeight)
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

  const featuredBlogs = (blogs || []).slice(0, 3)

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
          {/* BMI Calculator */}
          <div className="card">
            <h3 className="card-title">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path><line x1="16" y1="8" x2="2" y2="22"></line><line x1="17.5" y1="15" x2="9" y2="15"></line></svg>
              BMI Calculator
            </h3>
            <div className="unit-toggle">
              <button className={`unit-btn ${bmiUnit === 'cm' ? 'active' : ''}`} onClick={() => setBmiUnit('cm')}>Metric</button>
              <button className={`unit-btn ${bmiUnit === 'ft' ? 'active' : ''}`} onClick={() => setBmiUnit('ft')}>Imperial</button>
            </div>
            <div className="form-group">
              <label>Height ({bmiUnit === 'cm' ? 'cm' : 'ft'})</label>
              <input type="number" className="form-control" placeholder="175" value={bmiHeight} onChange={e => setBmiHeight(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" className="form-control" placeholder="70" value={bmiWeight} onChange={e => setBmiWeight(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={calcBMI}>Calculate BMI</button>
            {bmiResult && (
              <div className="result-box">
                <span className="result-value">{bmiResult}</span>
                <p className="result-desc">Your Body Mass Index</p>
                <div className="h-3 w-full bg-gradient-to-r from-blue-400 via-green-400 to-red-400 rounded-full mt-6 relative">
                   <div className="absolute top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[var(--text-main)] rounded-full transition-all duration-1000" style={{ left: `${Math.min(Math.max((bmiResult - 15) / 25 * 100, 0), 100)}%` }}></div>
                </div>
              </div>
            )}
          </div>

          {/* Ideal Weight */}
          <div className="card">
            <h3 className="card-title">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20M2 12h20"></path></svg>
              Ideal Weight
            </h3>
            <div className="unit-toggle">
              <button className={`unit-btn ${iwUnit === 'cm' ? 'active' : ''}`} onClick={() => setIwUnit('cm')}>Metric</button>
              <button className={`unit-btn ${iwUnit === 'ft' ? 'active' : ''}`} onClick={() => setIwUnit('ft')}>Imperial</button>
            </div>
            <div className="form-group">
              <label>Height ({iwUnit === 'cm' ? 'cm' : 'ft'})</label>
              <input type="number" className="form-control" placeholder="175" value={iwHeight} onChange={e => setIwHeight(e.target.value)} />
            </div>
            <button className="btn-primary" onClick={calcIW}>Check Range</button>
            {iwResult && (
              <div className="result-box">
                <span className="result-value text-3xl">{iwResult}</span>
                <p className="result-desc">Healthy Weight Range</p>
              </div>
            )}
          </div>

          {/* Calorie Calculator */}
          <div className="card">
            <h3 className="card-title">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"></path><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path><line x1="6" y1="1" x2="6" y2="4"></line><line x1="10" y1="1" x2="10" y2="4"></line><line x1="14" y1="1" x2="14" y2="4"></line></svg>
              Daily Calories (TDEE)
            </h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="form-group">
                <label>Age</label>
                <input type="number" className="form-control" placeholder="25" value={calAge} onChange={e => setCalAge(e.target.value)} />
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
              <input type="number" className="form-control" placeholder="175" value={calHeight} onChange={e => setCalHeight(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" className="form-control" placeholder="70" value={calWeight} onChange={e => setCalWeight(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Activity Level</label>
              <select className="form-control" value={calActivity} onChange={e => setCalActivity(e.target.value)}>
                <option value="sedentary">Sedentary (Office job)</option>
                <option value="light">Lightly Active</option>
                <option value="moderate">Moderate (3-5 days/week)</option>
                <option value="active">Active (Daily exercise)</option>
                <option value="extreme">Extreme (Athlete)</option>
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
            <h3 className="card-title">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
              Water Intake
            </h3>
            <div className="form-group">
              <label>Weight (kg)</label>
              <input type="number" className="form-control" placeholder="70" value={watWeight} onChange={e => setWatWeight(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Daily Exercise (min)</label>
              <input type="number" className="form-control" placeholder="30" value={watExercise} onChange={e => setWatExercise(e.target.value)} />
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

        {/* Featured Articles Section */}
        <div className="mt-32">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-4">
            <div>
              <h2 className="text-4xl font-black mb-2">Health Journal</h2>
              <p className="text-[var(--text-muted)] font-bold">Latest professional medical insights and fitness guides.</p>
            </div>
            <Link href="/blog" className="read-more text-lg">View All Articles →</Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredBlogs.map(blog => (
              <div key={blog.slug} className="blog-card">
                <div className="p-8">
                  <span className="category-tag">{blog.category}</span>
                  <h2 className="text-2xl font-bold mb-4 line-clamp-2">{blog.title}</h2>
                  <p className="text-[var(--text-muted)] mb-8 line-clamp-3">{blog.excerpt}</p>
                  <Link href={`/blog/${blog.slug}`} className="read-more group">
                    Read Article 
                    <svg className="transition-transform group-hover:translate-x-1" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}