import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Laine - AI Dental Assistant",
  description: "Privacy Policy for Laine AI Dental Assistant - Your privacy and data protection are our top priorities.",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> May 26, 2025<br/>
            <strong>Last Updated:</strong> May 26, 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Airodental, Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates the Laine AI Dental Assistant platform. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our AI-powered dental practice management services.
              </p>
              <p>
                We are committed to protecting your privacy and maintaining the confidentiality of protected 
                health information (PHI) in compliance with HIPAA and other applicable privacy laws.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium mb-3">2.1 Practice Information</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Practice management system data</li>
                <li>Appointment schedules and patient information</li>
                <li>Call logs and communication records</li>
                <li>Practice preferences and configuration settings</li>
              </ul>
              
              <h3 className="text-xl font-medium mb-3">2.2 Patient Information</h3>
              <ul className="list-disc pl-6 mb-4">
                <li>Patient demographics and contact information</li>
                <li>Appointment history and scheduling preferences</li>
                <li>Communication logs and call recordings</li>
                <li>Treatment information as relevant to scheduling</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">2.3 Usage Data</h3>
              <ul className="list-disc pl-6">
                <li>System performance metrics</li>
                <li>Feature usage analytics</li>
                <li>Error logs and technical diagnostics</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6">
                <li>Provide AI-powered patient communication services</li>
                <li>Automate appointment scheduling and reminders</li>
                <li>Generate analytics and performance insights</li>
                <li>Improve our AI models and service quality</li>
                <li>Ensure system security and prevent fraud</li>
                <li>Comply with legal and regulatory requirements</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. HIPAA Compliance</h2>
              <p className="mb-4">
                We serve as a Business Associate under HIPAA and maintain appropriate safeguards for 
                protected health information (PHI). We:
              </p>
              <ul className="list-disc pl-6">
                <li>Use and disclose PHI only as permitted by our Business Associate Agreement</li>
                <li>Implement administrative, physical, and technical safeguards</li>
                <li>Provide breach notification as required by law</li>
                <li>Allow patients to access their PHI through covered entities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p className="mb-4">We implement industry-standard security measures including:</p>
              <ul className="list-disc pl-6">
                <li>End-to-end encryption for data transmission</li>
                <li>AES-256 encryption for data at rest</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and authentication requirements</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Data Sharing and Disclosure</h2>
              <p className="mb-4">We may share information only in the following circumstances:</p>
              <ul className="list-disc pl-6">
                <li>With your explicit consent</li>
                <li>As required by law or legal process</li>
                <li>To prevent fraud or security threats</li>
                <li>With service providers under strict confidentiality agreements</li>
                <li>In connection with business transfers (with continued privacy protections)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
              <p>
                We retain data only as long as necessary to provide services and comply with legal 
                obligations. Patient health information is retained according to your practice&apos;s 
                retention policies and applicable healthcare regulations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6">
                <li>Access your data and request corrections</li>
                <li>Request data deletion (subject to legal requirements)</li>
                <li>Opt-out of certain data processing activities</li>
                <li>Receive data in a portable format</li>
                <li>File complaints with regulatory authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy periodically. We will notify you of material 
                changes via email or through our platform. Your continued use of our services 
                constitutes acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
              <p className="mb-4">
                For questions about this Privacy Policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Airodental, Inc.</strong></p>
                <p>7101 NW 150th St, Ste 100</p>
                <p>Oklahoma City, OK 73142</p>
                <p>United States</p>
                <p className="mt-4">
                  <strong>Email:</strong> privacy@airodental.com<br/>
                  <strong>Phone:</strong> Available through our support portal
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 