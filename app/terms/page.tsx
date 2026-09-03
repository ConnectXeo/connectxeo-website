import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — ConnectXeo",
  description:
    "ConnectXeo Terms of Service — the rules and conditions governing use of our website and services.",
};

const LAST_UPDATED = "1 September 2025";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-1/3 w-[500px] h-[400px] bg-blue-600/8 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/40 text-slate-400 text-sm px-4 py-1.5 rounded-full mb-6">
            Last updated: {LAST_UPDATED}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-400 leading-relaxed">
            Please read these Terms of Service (&quot;Terms&quot;) carefully before using the
            ConnectXeo website or engaging our services. By accessing our website at{" "}
            <a href="https://connectxeo.com" className="text-violet-400 hover:underline">
              connectxeo.com
            </a>{" "}
            or purchasing our services, you agree to be bound by these Terms. If you do not agree,
            please do not use our services.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-10 text-slate-300 text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              1. Company Information
            </h2>
            <p>
              These Terms are between you (&quot;Client&quot; or &quot;User&quot;) and{" "}
              <span className="text-white font-semibold">ConnectXeo</span> (&quot;Company&quot;,
              &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a technology company registered
              in Pakistan, providing AI/ML solutions, automation services, web development, and
              cloud solutions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              2. Services
            </h2>
            <p className="mb-3">
              ConnectXeo provides, but is not limited to, the following services:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 ml-2">
              <li>AI/ML model development, training, and deployment</li>
              <li>Agentic AI solutions and workflow automation</li>
              <li>Voice agent development and integration</li>
              <li>Web application and software development</li>
              <li>Cloud infrastructure setup and management</li>
              <li>Consulting, strategy, and technical advisory</li>
            </ul>
            <p className="mt-3">
              The specific scope of any engagement will be defined in a separate Statement of Work
              (SOW) or Service Agreement agreed upon by both parties.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              3. Acceptance of Terms
            </h2>
            <p>
              By using this website, submitting a contact form, or engaging ConnectXeo for any
              services, you confirm that you have read, understood, and agree to these Terms. If you
              are accepting on behalf of a company or organisation, you represent that you have the
              authority to bind that entity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              4. Payments and Pricing
            </h2>
            <div className="space-y-3 text-slate-400">
              <p>
                <span className="text-white font-medium">4.1 Pricing.</span> All pricing is agreed
                in writing before work commences. Prices are in USD unless otherwise stated and are
                exclusive of applicable taxes.
              </p>
              <p>
                <span className="text-white font-medium">4.2 Payment Schedule.</span> Unless
                otherwise agreed, a deposit (typically 50%) is required before work begins, with
                the remainder due upon project completion or as specified in the SOW.
              </p>
              <p>
                <span className="text-white font-medium">4.3 Late Payment.</span> Invoices not paid
                within 14 days of the due date may incur a late payment charge of 1.5% per month on
                the outstanding balance.
              </p>
              <p>
                <span className="text-white font-medium">4.4 Refunds.</span> Deposits are
                non-refundable once work has commenced. For ongoing services, cancellations with 30
                days written notice will not incur further charges beyond the notice period.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              5. Intellectual Property
            </h2>
            <div className="space-y-3 text-slate-400">
              <p>
                <span className="text-white font-medium">5.1 Client Materials.</span> You retain
                all ownership of materials, data, and content you provide to us.
              </p>
              <p>
                <span className="text-white font-medium">5.2 Deliverables.</span> Upon receipt of
                full payment, ConnectXeo assigns to the Client all intellectual property rights in
                custom deliverables created solely for that engagement, unless otherwise agreed in
                writing.
              </p>
              <p>
                <span className="text-white font-medium">5.3 Background IP.</span> ConnectXeo
                retains ownership of all pre-existing tools, frameworks, methodologies, and generic
                components. We grant the Client a perpetual, non-exclusive licence to use such
                components as incorporated in the deliverables.
              </p>
              <p>
                <span className="text-white font-medium">5.4 Portfolio Use.</span> We reserve the
                right to reference the engagement (but not share confidential details) in our
                portfolio and marketing unless you request otherwise in writing.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              6. Confidentiality
            </h2>
            <p>
              Both parties agree to keep confidential all non-public information shared during an
              engagement, including business strategies, technical specifications, and pricing. This
              obligation survives termination of the agreement for a period of 3 years. A separate
              NDA can be signed on request before any sensitive information is shared.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              7. Acceptable Use
            </h2>
            <p className="mb-3">You agree not to use our website or services to:</p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 ml-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe the intellectual property rights of others</li>
              <li>Transmit harmful, defamatory, or fraudulent content</li>
              <li>Attempt to gain unauthorised access to our systems</li>
              <li>Build products designed to harm or deceive end users</li>
              <li>Use AI systems we build to generate illegal or unethical content</li>
            </ul>
            <p className="mt-3">
              We reserve the right to refuse or terminate service to anyone who violates these
              conditions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              8. Limitation of Liability
            </h2>
            <p className="mb-3 text-slate-400">
              To the maximum extent permitted by applicable law, ConnectXeo shall not be liable for
              any:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 ml-2">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of revenue, profits, or business opportunities</li>
              <li>Data loss or corruption not caused by gross negligence on our part</li>
              <li>Outcomes of AI/ML systems operating outside the agreed scope</li>
            </ul>
            <p className="mt-3">
              Our total cumulative liability for any claim shall not exceed the total fees paid by
              the Client in the 3 months preceding the incident.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              9. Warranties and Disclaimers
            </h2>
            <p className="mb-3 text-slate-400">
              ConnectXeo warrants that services will be performed with reasonable skill and care. We
              do not warrant that:
            </p>
            <ul className="list-disc list-inside space-y-1 text-slate-400 ml-2">
              <li>AI/ML models will be 100% accurate or free from hallucination</li>
              <li>Software will be entirely free from bugs or defects</li>
              <li>Third-party integrations will remain available or unchanged</li>
            </ul>
            <p className="mt-3">
              The website and its content are provided &quot;as is&quot; without warranties of any
              kind, express or implied.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              10. Termination
            </h2>
            <p>
              Either party may terminate an ongoing engagement with 30 days written notice.
              Immediate termination is permitted if the other party materially breaches these Terms
              and fails to remedy the breach within 14 days of written notice. Upon termination, the
              Client pays for all work completed to date and ConnectXeo delivers all completed work.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              11. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of
              Pakistan. Any disputes shall first be subject to good-faith negotiation between the
              parties. If unresolved within 30 days, disputes shall be referred to binding
              arbitration under internationally recognised arbitration rules.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              12. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. We will notify active clients
              of material changes by email. Continued use of our services after changes are posted
              constitutes your acceptance. The &quot;Last updated&quot; date at the top of this page
              reflects when changes were made.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3 pb-2 border-b border-slate-800">
              13. Contact
            </h2>
            <p className="mb-3">
              For questions about these Terms of Service, please contact us:
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
            href="/privacy"
            className="flex-1 text-center bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white text-sm font-medium px-4 py-3 rounded-xl transition-colors"
          >
            ← Privacy Policy
          </Link>
          <Link
            href="/contact"
            className="flex-1 text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium px-4 py-3 rounded-xl transition-colors"
          >
            Questions? Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
