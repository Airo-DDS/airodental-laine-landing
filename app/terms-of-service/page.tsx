import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Laine - AI Dental Assistant",
  description: "Terms of Service for Laine AI Dental Assistant - Legal terms and conditions for using our platform.",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="max-w-4xl mx-auto px-4 py-24">
        <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Effective Date:</strong> May 26, 2025<br/>
            <strong>Last Updated:</strong> May 26, 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="mb-4">
                By accessing or using the Laine AI Dental Assistant platform provided by Airodental, Inc. 
                (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), you (&quot;Customer,&quot; &quot;you,&quot; or &quot;your&quot;) agree to be bound 
                by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, you may not 
                access or use our services.
              </p>
              <p>
                These Terms constitute a legally binding agreement between you and Airodental, Inc., 
                located at 7101 NW 150th St, Ste 100, Oklahoma City, OK 73142, United States.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Services</h2>
              <p className="mb-4">
                Laine is an AI-powered dental assistant platform that provides:
              </p>
              <ul className="list-disc pl-6">
                <li>Integration with practice management systems</li>
                <li>Automated patient communication and appointment scheduling</li>
                <li>Intelligent task management and follow-up reminders</li>
                <li>Analytics and performance insights</li>
                <li>HIPAA-compliant data processing and storage</li>
                <li>Call handling and patient verification services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Eligibility and Registration</h2>
              <p className="mb-4">
                Our services are intended exclusively for licensed dental practices and healthcare 
                professionals. By using our services, you represent and warrant that:
              </p>
              <ul className="list-disc pl-6">
                <li>You are a licensed dental professional or authorized practice representative</li>
                <li>You have the authority to bind your practice to these Terms</li>
                <li>All registration information you provide is accurate and current</li>
                <li>You will maintain the security of your account credentials</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
              <h3 className="text-xl font-medium mb-3">4.1 Permitted Uses</h3>
              <p className="mb-4">You may use our services only for legitimate dental practice management purposes.</p>
              
              <h3 className="text-xl font-medium mb-3">4.2 Prohibited Uses</h3>
              <p className="mb-4">You may not:</p>
              <ul className="list-disc pl-6">
                <li>Use the services for any unlawful purpose or in violation of applicable laws</li>
                <li>Attempt to gain unauthorized access to our systems or networks</li>
                <li>Share, sublicense, or resell access to our services</li>
                <li>Use the services to spam, harass, or send unsolicited communications</li>
                <li>Reverse engineer, decompile, or disassemble our software</li>
                <li>Interfere with or disrupt the integrity or performance of our services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Data and Privacy</h2>
              <h3 className="text-xl font-medium mb-3">5.1 HIPAA Compliance</h3>
              <p className="mb-4">
                We serve as your Business Associate under HIPAA. A separate Business Associate 
                Agreement governs our handling of protected health information (PHI).
              </p>
              
              <h3 className="text-xl font-medium mb-3">5.2 Data Ownership</h3>
              <p className="mb-4">
                You retain ownership of all patient data and practice information uploaded to our platform. 
                We process this data solely to provide our services as outlined in our Privacy Policy.
              </p>

              <h3 className="text-xl font-medium mb-3">5.3 Data Security</h3>
              <p>
                We implement industry-standard security measures to protect your data, including 
                encryption, access controls, and regular security audits.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Payment Terms</h2>
              <h3 className="text-xl font-medium mb-3">6.1 Fees</h3>
              <p className="mb-4">
                Service fees are based on your selected plan and usage. All fees are non-refundable 
                unless otherwise specified in writing.
              </p>
              
              <h3 className="text-xl font-medium mb-3">6.2 Billing</h3>
              <p className="mb-4">
                Fees are billed monthly or annually in advance. Late payments may result in service 
                suspension after 10 days&#39; notice.
              </p>

              <h3 className="text-xl font-medium mb-3">6.3 Price Changes</h3>
              <p>
                We may modify pricing with 30 days&#39; written notice. Price changes will not affect 
                your current billing period.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Service Availability</h2>
              <p className="mb-4">
                We strive to maintain 99.9% uptime but do not guarantee uninterrupted service. 
                We may perform scheduled maintenance with advance notice.
              </p>
              <p>
                We are not liable for service interruptions caused by third-party providers, 
                force majeure events, or factors beyond our reasonable control.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Intellectual Property</h2>
              <p className="mb-4">
                Our platform, including all software, algorithms, and documentation, is our proprietary 
                property protected by intellectual property laws. These Terms grant you a limited, 
                non-exclusive license to use our services for your dental practice.
              </p>
              <p>
                You may not copy, modify, distribute, or create derivative works of our proprietary technology.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, OUR LIABILITY FOR ANY CLAIMS ARISING FROM 
                THESE TERMS OR YOUR USE OF OUR SERVICES SHALL NOT EXCEED THE AMOUNT YOU PAID US 
                IN THE 12 MONTHS PRECEDING THE CLAIM.
              </p>
              <p>
                WE ARE NOT LIABLE FOR INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE 
                DAMAGES, INCLUDING LOST PROFITS OR DATA.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Indemnification</h2>
              <p>
                You agree to indemnify and hold us harmless from any claims, damages, or expenses 
                arising from your use of our services, violation of these Terms, or infringement 
                of third-party rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">11. Termination</h2>
              <h3 className="text-xl font-medium mb-3">11.1 Termination by You</h3>
              <p className="mb-4">
                You may terminate your account at any time with 30 days&#39; written notice. 
                You remain responsible for all charges incurred before termination.
              </p>
              
              <h3 className="text-xl font-medium mb-3">11.2 Termination by Us</h3>
              <p className="mb-4">
                We may suspend or terminate your account for breach of these Terms, non-payment, 
                or if required by law, with appropriate notice when feasible.
              </p>

              <h3 className="text-xl font-medium mb-3">11.3 Data Export</h3>
              <p>
                Upon termination, we will provide you with your data in a standard format for 
                30 days. After this period, data may be permanently deleted.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">12. Governing Law and Dispute Resolution</h2>
              <p className="mb-4">
                These Terms are governed by the laws of Oklahoma, United States, without regard 
                to conflict of law principles.
              </p>
              <p>
                Any disputes shall be resolved through binding arbitration in Oklahoma City, Oklahoma, 
                under the rules of the American Arbitration Association.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">13. Changes to Terms</h2>
              <p>
                We may modify these Terms at any time by posting updated terms on our website. 
                Material changes will be communicated via email with 30 days&#39; notice. 
                Continued use constitutes acceptance of modified Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">14. Contact Information</h2>
              <p className="mb-4">
                For questions about these Terms, please contact us:
              </p>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>Airodental, Inc.</strong></p>
                <p>7101 NW 150th St, Ste 100</p>
                <p>Oklahoma City, OK 73142</p>
                <p>United States</p>
                <p className="mt-4">
                  <strong>Email:</strong> legal@airodental.com<br/>
                  <strong>Support:</strong> Available through our platform
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
} 