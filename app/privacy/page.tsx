import type { Metadata } from "next";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Privacy Policy — ConnectXeo",
  description:
    "ConnectXeo Privacy Policy — how we collect, use, and protect your personal information.",
};

const LAST_UPDATED = "1 September 2025";

export default function PrivacyPage() {
  return (
    <>
      <div className="relative max-w-3xl mx-auto px-6 py-20">
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 left-1/3 w-[500px] h-[400px] bg-primary/[0.08] rounded-full blur-3xl" />
        </div>

        <div className="mb-12">
          <Badge>Last updated: {LAST_UPDATED}</Badge>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontWeight: 510, letterSpacing: "-0.04em" }}>Privacy Policy</h1>
          <p className="text-muted leading-relaxed">
            ConnectXeo (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) is committed to
            protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and
            safeguard your information when you visit our website at{" "}
            <a href="https://connectxeo.com" className="text-primary hover:underline">
              connectxeo.com
            </a>{" "}
            or engage our services.
          </p>
        </div>

        <div className="space-y-10 text-muted text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">
              1. Information We Collect
            </h2>
            <p className="mb-3">We may collect the following categories of information:</p>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-primary mb-1">a) Information You Provide</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Name and email address (when you fill out our contact form)</li>
                  <li>Company name and role (when you enquire about our services)</li>
                  <li>Message content and project details you share with us</li>
                  <li>Payment and billing information (when you purchase our services)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-primary mb-1">b) Information Collected Automatically</h3>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>IP address and general location data</li>
                  <li>Browser type, device type, and operating system</li>
                  <li>Pages visited, time spent, and referring URLs</li>
                  <li>Cookie identifiers and similar tracking technologies</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">2. How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Respond to your enquiries and provide the services you request</li>
              <li>Send transactional communications (confirmations, invoices, project updates)</li>
              <li>Improve and optimise our website and service offerings</li>
              <li>Send marketing communications where you have given consent</li>
              <li>Comply with legal obligations and enforce our terms</li>
              <li>Prevent fraud, abuse, and security incidents</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">3. Legal Basis for Processing (GDPR)</h2>
            <p className="mb-3">Where applicable, we process your personal data on the following legal bases:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><span className="text-foreground">Contract</span> — processing necessary to fulfil our agreement with you</li>
              <li><span className="text-foreground">Legitimate Interest</span> — improving our services and communicating with prospects</li>
              <li><span className="text-foreground">Consent</span> — for marketing emails and non-essential cookies</li>
              <li><span className="text-foreground">Legal Obligation</span> — compliance with applicable laws</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">4. Sharing of Information</h2>
            <p className="mb-3">We do not sell your personal data. We may share your information with:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><span className="text-foreground">Service Providers</span> — hosting, email, analytics, and payment processors who process data on our behalf under strict data processing agreements</li>
              <li><span className="text-foreground">Legal Authorities</span> — if required by law, court order, or to protect our rights</li>
              <li><span className="text-foreground">Business Transfers</span> — in connection with a merger, acquisition, or sale of assets, with appropriate confidentiality protections</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">5. Cookies</h2>
            <p className="mb-3">We use cookies and similar technologies to operate our website and understand how it is used. These include:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li><span className="text-foreground">Essential cookies</span> — required for the website to function</li>
              <li><span className="text-foreground">Analytics cookies</span> — to understand traffic and usage patterns</li>
              <li><span className="text-foreground">Preference cookies</span> — to remember settings like your theme choice</li>
            </ul>
            <p className="mt-3">You can control cookie preferences through your browser settings.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">6. Data Retention</h2>
            <p>We retain your personal data only as long as necessary for the purposes described in this policy, or as required by law. Contact form submissions are retained for up to 2 years. Client project data is retained for the duration of the engagement plus 3 years.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">7. Your Rights</h2>
            <p className="mb-3">Depending on your location, you may have the following rights:</p>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Right to access the personal data we hold about you</li>
              <li>Right to rectification of inaccurate data</li>
              <li>Right to erasure (&quot;right to be forgotten&quot;)</li>
              <li>Right to restrict or object to processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent at any time</li>
              <li>Right to lodge a complaint with a supervisory authority</li>
            </ul>
            <p className="mt-3">To exercise any of these rights, contact us at <a href="mailto:admin@connectxeo.com" className="text-primary hover:underline">admin@connectxeo.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">8. Security</h2>
            <p>We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, disclosure, alteration, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">9. Third-Party Links</h2>
            <p>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">10. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. We will notify you of material changes by updating the &quot;Last updated&quot; date at the top of this page. Continued use of our services after changes constitutes acceptance of the updated policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">11. Contact Us</h2>
            <p className="mb-3">For any questions about this Privacy Policy or how we handle your data, please contact:</p>
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="font-semibold text-foreground mb-1">ConnectXeo</div>
              <div className="space-y-0.5">
                <div>Pakistan</div>
                <div>Email: <a href="mailto:admin@connectxeo.com" className="text-primary hover:underline">admin@connectxeo.com</a></div>
                <div>Website: <a href="https://connectxeo.com" className="text-primary hover:underline">connectxeo.com</a></div>
              </div>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-border flex flex-col sm:flex-row gap-4">
          <Button href="/terms" variant="secondary" className="flex-1 text-center">View Terms of Service</Button>
          <Button href="/contact" className="flex-1 text-center">Contact us about privacy</Button>
        </div>
      </div>
    </>
  );
}
