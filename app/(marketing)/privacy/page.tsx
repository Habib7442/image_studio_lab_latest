import React from "react";

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <div className="min-h-screen bg-background px-6 pt-16 pb-24 md:pt-24 md:pb-40">
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-4 text-4xl font-serif md:text-6xl">Privacy Policy</h1>
        <p className="mb-12 text-sm uppercase tracking-widest text-muted">Last Updated: {lastUpdated}</p>

        <div className="prose prose-stone max-w-none space-y-12 text-muted leading-relaxed">
          <section>
            <h2 className="text-2xl font-serif text-foreground mb-4">Introduction</h2>
            <p>
              Image Studio Lab ("we", "us", or "our") respects your privacy and is committed to protecting your personal data. 
              This privacy policy will inform you as to how we look after your personal data when you visit our website 
              and tell you about your privacy rights and how the law protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-4">The Data We Collect</h2>
            <p>
              We may collect, use, store and transfer different kinds of personal data about you which we have grouped together as follows:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li><strong>Identity Data</strong> includes first name, last name, or similar identifier.</li>
              <li><strong>Contact Data</strong> includes email address.</li>
              <li><strong>Technical Data</strong> includes internet protocol (IP) address, browser type and version, time zone setting and location, and other technology on the devices you use to access this website.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-4">How We Use Your Data</h2>
            <p>
              We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>To provide you with the prompt packs and services you have requested.</li>
              <li>To manage our relationship with you.</li>
              <li>To improve our website, products/services, marketing, and customer relationships.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-4">Third-Party Services</h2>
            <p>
              Our store is powered by Gumroad. When you purchase a pack, your payment information is collected and processed 
              directly by Gumroad. We do not store your credit card details on our servers. Please review 
              Gumroad's Privacy Policy for more information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-serif text-foreground mb-4">Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy practices, please contact us at: 
              <br />
              <span className="text-accent font-medium">hello@imagestudiolab.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
