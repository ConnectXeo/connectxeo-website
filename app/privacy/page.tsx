import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — ConnectXeo",
  description:
    "ConnectXeo Privacy Policy — how we collect, use, and protect your personal information.",
};

const LAST_UPDATED = "1 September 2025";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-1/3 w-[500px] h-[400px] bg-violet-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/40 text-slate-400 text-sm px-4 py-1.5 rounded-full mb-6">
            Last updated: {LAST_UPDATED}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
          <p className="text-slate-400 leading-relaxed">
            ConnectXeo (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to
            protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website at{" "}
            <a href="https://connectxeo.com" className="text-violet-400 hover:underline">
              connectxeo.com
            </a>{" "}
            or engage our services.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-slate-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              1. Information We Collect
            </h2>
            <p className="mb-3">We may collect the following categories of information:</p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-violet-300 mb-1">a) Information You Provide</h3>
                <ul className="list-disc list-inside space-y-1 text-slate-400 ml-2">
                  <li>Name and email address (when you fill out our contact form)</li>
                  <li>Company name and role (when you enquire about our services)</li>
                  <li>Message content and project details you share with us</li>
                  <li>Payment and billing information (when you purchase our services)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-violet-300 mb-1">
                  b) Information Collected Automatically
                </h3>
                <ul className="list-disc list-inside space-y-1 text-slate-400 ml-2">
                  <li>IP address and general location data</li>
                  <li>Browser type, device type, and operating system</li>
                  <li>Pages visited, time spent, and referring URLs</li>
                  <li>Cookie identifiers and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              2. How We Use Your Information
            </h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 ml-2">
              <li>Respond to your enquiries and provide the services you request</li>
              <li>Send transactional communications (confirmations, invoices, project updates)</li>
              <li>Improve and optimise our website and service offerings</li>
              <li>Send marketing communications where you have given consent</li>
              <li>Comply with legal obligations and enforce our terms</li>
              <li>Prevent fraud, abuse, and security incidents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              3. Legal Basis for Processing (GDPR)
            </h2>
            <p className="mb-3">
              Where applicable, we process your personal data on the following legal bases:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 ml-2">
              <li>
                <span className="text-white">Contract</span> — processing necessary to fulfil our
                agreement with you
              </li>
              <li>
                <span className="text-white">Legitimate Interest</span> — improving our services
                and communicating with prospects
              </li>
              <li>
                <span className="text-white">Consent</span> — for marketing emails and
                non-essential cookies
              </li>
              <li>
                <span className="text-white">Legal Obligation</span> — compliance with applicable
                laws
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              4. Sharing of Information
            </h2>
            <p className="mb-3">We do not sell your personal data. We may share your information with:</p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 ml-2">
              <li>
                <span className="text-white">Service Providers</span> — hosting, email, analytics,
                and payment processors who process data on our behalf under strict data processing
                agreements
              </li>
              <li>
                <span className="text-white">Legal Authorities</span> — if required by law, court
                order, or to protect our rights
              </li>
              <li>
                <span className="text-white">Business Transfers</span> — in connection with a
                merger, acquisition, or sale of assets, with appropriate confidentiality protections
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              5. Cookies
            </h2>
            <p className="mb-3">
              We use cookies and similar technologies to operate our website and understand how it
              is used. These include:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 ml-2">
              <li>
                <span className="text-white">Essential cookies</span> — required for the website to
                function
              </li>
              <li>
                <span className="text-white">Analytics cookies</span> — to understand traffic and
                usage patterns
              </li>
              <li>
                <span className="text-white">Preference cookies</span> — to remember settings like
                your theme choice
              </li>
            </ul>
            <p className="mt-3">
              You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              6. Data Retention
            </h2>
            <p>
              We retain your personal data only as long as necessary for the purposes described in
              this policy, or as required by law. Contact form submissions are retained for up to 2
              years. Client project data is retained for the duration of the engagement plus 3
              years.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              7. Your Rights
            </h2>
            <p className="mb-3">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-slate-400 ml-2">
              <li>Right to access the personal data we hold about you</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent at any time</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:admin@connectxeo.com" className="text-violet-400 hover:underline">
                admin@connectxeo.com
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              8. Security
            </h2>
            <p>
              We implement appropriate technical and organisational measures to protect your personal
              data against unauthorised access, disclosure, alteration, or destruction. However, no
              method of transmission over the internet is 100% secure, and we cannot guarantee
              absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              9. Third-Party Links
            </h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the
              privacy practices of those sites and encourage you to review their privacy policies.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              10. Changes to This Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material
              changes by updating the &quot;Last updated&quot; date at the top of this page.
              Continued use of our services after changes constitutes acceptance of the updated
              policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              11. Contact Us
            </h2>
            <p className="mb-3">
              For any questions about this Privacy Policy or how we handle your data, please
              contact:
            </p>
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
              <div className="font-semibold text-white mb-1">ConnectXeo</div>
              <div className="text-slate-400 space-y-0.5">
                <div>Pakistan</div>
                <div>
                  Email:{" "}
                  <a
                    href="mailto:admin@connectxeo.com"
                    className="text-violet-400 hover:underline"
                  >
                    admin@connectxeo.com
                  </a>
                </div>
                <div>
                  Website:{" "}
                  <a href="https://connectxeo.com" className="text-violet-400 hover:underline">
                    connectxeo.com
                  </a>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Related links */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row gap-4">
          <Link
            href="/terms"
            className="flex-1 text-center bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-medium px-4 py-3 rounded-xl transition-colors"
          >
            View Terms of Service →
          </Link>
          <Link
            href="/contact"
            className="flex-1 text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition-colors"
          >
            Contact us about privacy
          </Link>
        </div>
      </div>
    </div>
  );
}
