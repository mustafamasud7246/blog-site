export default function PrivacyPolicy() {
  return (
    <div className="container py-24">
      <div className="card max-w-4xl mx-auto !p-12">
        <h1 className="text-4xl font-black mb-8 text-[var(--primary)]">Privacy Policy</h1>
        <div className="space-y-6 text-[var(--text-main)] leading-relaxed">
          <section>
            <h2 className="text-xl font-bold mb-4">1. Information We Collect</h2>
            <p>
              HealthKit Premium does not store any personal health data on our servers. All calculations (BMI, Calories, etc.) are performed locally on your device. We may collect anonymous usage data to improve our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. Cookies and Tracking</h2>
            <p>
              We use essential cookies to remember your theme preferences (Dark/Light mode). We do not use tracking cookies for advertising purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">3. Data Security</h2>
            <p>
              Since we do not collect personal health information, your data remains private on your own device. We implement industry-standard security measures to protect the integrity of our website.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">4. Third-Party Links</h2>
            <p>
              Our website may contain links to external sites. We are not responsible for the privacy practices or content of these third-party websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at support@healthkitpremium.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
