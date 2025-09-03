'use client';

import BenefitsSection from '@/components/home/BenefitsSection';
import ClientsAndPartnersSection from '@/components/home/ClientsAndPartnersSection';
import WhatCanBeDoneSection from '@/components/home/WhatCanBeDoneSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import SecondEcoHero from '@/components/home/second-eco-hero';
import {HomeServices} from '@/components/home/HomeServices';

export default function IndexPage() {
  return (
    <main className="relative dark:bg-cyan-950">
      {/* <HeroSection /> */}
      <SecondEcoHero />
      {/* <WhatWeDoSection /> */}
      <HomeServices />
      <WhatCanBeDoneSection />

      <BenefitsSection />
      <ClientsAndPartnersSection />
      <CallToActionSection />
    </main>
  );
}
