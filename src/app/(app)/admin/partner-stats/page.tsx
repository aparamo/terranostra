'use client';

import PartnerStatsDashboard from '@/components/admin/PartnerStatsDashboard';

export default function PartnerStatsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Administración de Socios
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Monitorea las estadísticas de clicks y visitantes de la sección de
          socios
        </p>
      </div>

      <PartnerStatsDashboard />
    </div>
  );
}
