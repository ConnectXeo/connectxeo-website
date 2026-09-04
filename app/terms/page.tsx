import type { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Terms of Service — ConnectXeo",
  description:
    "ConnectXeo Terms of Service — the rules and conditions governing use of our website and services.",
};

const LAST_UPDATED = "1 September 2025";

export default function TermsPage() {
  return (
    <>
      <div className="relative max-w-3xl mx-auto px-6 py-20">
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-20 right-1/3 w-[500px] h-[400px] bg-primary/[0.08] rounded-full blur-3xl" />
        </div>

        <div className="mb-12">
          <Badge>Last updated: {LAST_UPDATED}</Badge>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold text-foreground mb-4" style={{ fontWeight: 510, letterSpacing: "-0.04em" }}>Terms of Service</h1>
          <p className="text-muted leading-relaxed">
            Please read these Terms of Service (&quot;Terms&quot;) carefully before using the
            ConnectXeo website or engaging our services. By accessing our website at{" "}
            <a href="https://connectxeo.com" className="text-primary hover:underline">connectxeo.com</a>{" "}
            or purchasing our services, you agree to be bound by these Terms. If you do not agree,
            please do not use our services.
          </p>
        </div>

        <div className="space-y-10 text-muted text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">1. Company Information</h2>
            <p>These Terms are between you (&quot;Client&quot; or &quot;User&quot;) and <span className="text-foreground font-semibold">ConnectXeo</span> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), a technology company registered in Pakistan, providing AI/ML solutions, automation services, web development, and cloud solutions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">2. Services</h2>
            <p className="mb-3">ConnectXeo provides, but is not limited to, the following services:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>AI/ML model development, training, and deployment</li>
              <li>Agentic AI solutions and workflow automation</li>
              <li>Voice agent development and integration</li>
              <li>Web application and software development</li>
              <li>Cloud infrastructure setup and management</li>
              <li>Consulting, strategy, and technical advisory</li>
            </ul>
            <p className="mt-3">The specific scope of any engagement will be defined in a separate Statement of Work (SOW) or Service Agreement agreed upon by both parties.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">3. Acceptance of Terms</h2>
            <p>By using this website, submitting a contact form, or engaging ConnectXeo for any services, you confirm that you have read, understood, and agree to these Terms. If you are accepting on behalf of a company or organisation, you represent that you have the authority to bind that entity.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">4. Payments and Pricing</h2>
            <div className="space-y-3">
              <p><span className="text-foreground font-medium">4.1 Pricing.</span> All pricing is agreed in writing before work commences. Prices are in USD unless otherwise stated and are exclusive of applicable taxes.</p>
              <p><span className="text-foreground font-medium">4.2 Payment Schedule.</span> Unless otherwise agreed, a deposit (typically 50%) is required before work begins, with the remainder due upon project completion or as specified in the SOW.</p>
              <p><span className="text-foreground font-medium">4.3 Late Payment.</span> Invoices not paid within 14 days of the due date may incur a late payment charge of 1.5% per month on the outstanding balance.</p>
              <p><span className="text-foreground font-medium">4.4 Refunds.</span> Deposits are non-refundable once work has commenced. For ongoing services, cancellations with 30 days written notice will not incur further charges beyond the notice period.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">5. Intellectual Property</h2>
            <div className="space-y-3">
              <p><span className="text-foreground font-medium">5.1 Client Materials.</span> You retain all ownership of materials, data, and content you provide to us.</p>
              <p><span className="text-foreground font-medium">5.2 Deliverables.</span> Upon receipt of full payment, ConnectXeo assigns to the Client all intellectual property rights in custom deliverables created solely for that engagement, unless otherwise agreed in writing.</p>
              <p><span className="text-foreground font-medium">5.3 Background IP.</span> ConnectXeo retains ownership of all pre-existing tools, frameworks, methodologies, and generic components. We grant the Client a perpetual, non-exclusive licence to use such components as incorporated in the deliverables.</p>
              <p><span className="text-foreground font-medium">5.4 Portfolio Use.</span> We reserve the right to reference the engagement (but not share confidential details) in our portfolio and marketing unless you request otherwise in writing.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">6. Confidentiality</h2>
            <p>Both parties agree to keep confidential all non-public information shared during an engagement, including business strategies, technical specifications, and pricing. This obligation survives termination of the agreement for a period of 3 years. A separate NDA can be signed on request before any sensitive information is shared.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">7. Acceptable Use</h2>
            <p className="mb-3">You agree not to use our website or services to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe the intellectual property rights of others</li>
              <li>Transmit harmful, defamatory, or fraudulent content</li>
              <li>Attempt to gain unauthorised access to our systems</li>
              <li>Build products designed to harm or deceive end users</li>
              <li>Use AI systems we build to generate illegal or unethical content</li>
            </ul>
            <p className="mt-3">We reserve the right to refuse or terminate service to anyone who violates these conditions.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">8. Limitation of Liability</h2>
            <p className="mb-3">To the maximum extent permitted by applicable law, ConnectXeo shall not be liable for any:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Indirect, incidental, or consequential damages</li>
              <li>Loss of revenue, profits, or business opportunities</li>
              <li>Data loss or corruption not caused by gross negligence on our part</li>
              <li>Outcomes of AI/ML systems operating outside the agreed scope</li>
            </ul>
            <p className="mt-3">Our total cumulative liability for any claim shall not exceed the total fees paid by the Client in the 3 months preceding the incident.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">9. Warranties and Disclaimers</h2>
            <p className="mb-3">ConnectXeo warrants that services will be performed with reasonable skill and care. We do not warrant that:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>AI/ML models will be 100% accurate or free from hallucination</li>
              <li>Software will be entirely free from bugs or defects</li>
              <li>Third-party integrations will remain available or unchanged</li>
            </ul>
            <p className="mt-3">The website and its content are provided &quot;as is&quot; without warranties of any kind, express or implied.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">10. Termination</h2>
            <p>Either party may terminate an ongoing engagement with 30 days written notice. Immediate termination is permitted if the other party materially breaches these Terms and fails to remedy the breach within 14 days of written notice. Upon termination, the Client pays for all work completed to date and ConnectXeo delivers all completed work.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">11. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes shall first be subject to good-faith negotiation between the parties. If unresolved within 30 days, disputes shall be referred to binding arbitration under internationally recognised arbitration rules.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">12. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. We will notify active clients of material changes by email. Continued use of our services after changes are posted constitutes your acceptance. The &quot;Last updated&quot; date at the top of this page reflects when changes were made.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-foreground mb-3 pb-2 border-b border-border">13. Contact</h2>
            <p className="mb-3">For questions about these Terms of Service, please contact us:</p>
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
          <Button href="/privacy" variant="secondary" className="flex-1 text-center">Privacy Policy</Button>
          <Button href="/contact" className="flex-1 text-center">Questions? Contact us</Button>
        </div>
      </div>
    </>
  );
}
