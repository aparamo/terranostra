'use client';

import {ServicesCatalog} from '@/components/services/ServicesCatalog';
import ServicesHero from '@/components/services/ServicesHero';
import ServicesHowWork from '@/components/services/ServicesHowWork';

export default function ServicesPage() {
  return (
    <div>
      <ServicesHero />
      <ServicesHowWork />
      <ServicesCatalog />
    </div>
  );
}
