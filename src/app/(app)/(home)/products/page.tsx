'use client';

import {motion} from 'framer-motion';
import ProductsHero from '@/components/products/ProductsHero';
import SeedsSection from '@/components/products/SeedsSection';
import PlantsSection from '@/components/products/PlantsSection';
import SelfCareSection from '@/components/products/SelfCareSection';

const ProductsPage = () => {
  // Since showProducts is false, we don't need to fetch products data
  // This eliminates the unnecessary API call and improves page load performance

  return (
    <motion.div
      className="dark:bg-cyan-950"
      initial={{opacity: 0}}
      animate={{opacity: 1}}
      transition={{duration: 0.5}}
    >
      <ProductsHero />

      {/* Products section is commented out since showProducts is false */}
      {/* When you're ready to show products, uncomment this and add the data fetching logic */}
      {/* {data.docs.length > 0 && showProducts && (
        <ProductsSection products={data.docs} />
      )} */}

      <SeedsSection />
      <PlantsSection />
      <SelfCareSection />
    </motion.div>
  );
};

export default ProductsPage;
