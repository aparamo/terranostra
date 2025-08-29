'use client';

import ContactForm from '@/components/contact/ContactForm';
import ContactHero from '@/components/contact/ContactHero';
import ContactInfo from '@/components/contact/ContactInfo';

export default function ContactPage() {
  return (
    <div className="dark:bg-slate-950">
      <ContactHero />
      <ContactInfo />
      <div className="container mx-auto py-16">
        <ContactForm />
      </div>
    </div>
  );
}
