'use client';

import {motion} from 'framer-motion';
import useSWR from 'swr';
import {Product} from '@/payload-types';
import ProductsHero from './ProductsHero';
import ProductsSection from './ProductsSection';
import SeedsSection from './SeedsSection';
import PlantsSection from './PlantsSection';
import SelfCareSection from './SelfCareSection';
import ProductsLoading from './ProductsLoading';
import {PAYLOAD_API_URL} from '@/lib/constants';

// Optimized fetcher with better error handling
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    error.message = await res.text();
    throw error;
  }
  return res.json();
};

// SWR configuration for better performance
const swrConfig = {
  revalidateOnFocus: false, // Don't revalidate when window gains focus
  revalidateOnReconnect: false, // Don't revalidate when network reconnects
  dedupingInterval: 60000, // Dedupe requests within 1 minute
  errorRetryCount: 2, // Retry failed requests up to 2 times
  errorRetryInterval: 5000 // Wait 5 seconds between retries
};

const OptimizedProductsPage = () => {
  const showProducts = true; // Set to true when ready to show products

  // Only fetch products when showProducts is true
  const {data, error, isLoading} = useSWR<{docs: Product[]}>(
    showProducts
      ? `${PAYLOAD_API_URL}/products?depth=1&limit=50&select[title]=true&select[slug]=true&select[excerpt]=true&select[featuredImage]=true`
      : null,
    fetcher,
    swrConfig
  );

  // Show loading state only when actually fetching data
  if (showProducts && isLoading) {
    return <ProductsLoading />;
  }

  // Show error state only when there's an actual error
  if (showProducts && error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-red-50 via-white to-red-50 dark:from-red-950/90 dark:via-background/95 dark:to-red-950/90">
        <div className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-red-900 dark:text-red-100 mb-4">
            Failed to load products
          </h2>
          <p className="text-red-600 dark:text-red-300 max-w-md mx-auto">
            {error.message ||
              'An error occurred while loading the products. Please try again later.'}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="dark:bg-cyan-950"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
    >
      <ProductsHero />

      {/* Show products section only when data is available and showProducts is true */}
      {showProducts && data?.docs && data.docs.length > 0 && (
        <ProductsSection products={data.docs} />
      )}

      {/* Show message when no products are available */}
      {showProducts && data?.docs && data.docs.length === 0 && (
        <div className="py-20 text-center">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            No products available yet
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            We&apos;re working on adding our product catalog. Check back soon!
          </p>
        </div>
      )}

      <SeedsSection />
      <PlantsSection />
      <SelfCareSection />
    </motion.div>
  );
};

export default OptimizedProductsPage;
