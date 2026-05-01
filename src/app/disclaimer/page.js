export default function MedicalDisclaimer() {
  return (
    <div className="container py-24">
      <div className="card max-w-4xl mx-auto !p-12 border-2 border-[var(--danger)]">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-[var(--danger)] text-white rounded-full flex items-center justify-center font-bold text-2xl">!</div>
          <h1 className="text-4xl font-black text-[var(--danger)]">Medical Disclaimer</h1>
        </div>
        
        <div className="space-y-6 text-[var(--text-main)] leading-relaxed">
          <div className="bg-[var(--primary-light)] p-6 rounded-2xl border-l-4 border-[var(--primary)] mb-8">
            <p className="font-bold text-lg">
              Important: HealthKit Premium provides information and tools for educational purposes only.
            </p>
          </div>

          <section>
            <h2 className="text-xl font-bold mb-4">Not Medical Advice</h2>
            <p>
              The content provided by our calculators and articles is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">No Physician-Patient Relationship</h2>
            <p>
              Your use of this website does not create a physician-patient relationship between you and HealthKit Premium. The information provided is general in nature and may not apply to your specific situation.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Calculation Variance</h2>
            <p>
              Health calculators (BMI, TDEE, etc.) use generalized mathematical formulas. Individual metabolism, muscle mass, and medical history can significantly impact the actual values. Never disregard professional medical advice because of something you have read or calculated on this website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Emergency Situations</h2>
            <p>
              If you think you may have a medical emergency, call your doctor or emergency services immediately.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
