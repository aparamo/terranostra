'use client';

import {Product} from '@/payload-types';
import ProductCard from '@/components/products/ProductCard';

interface ProductsSectionProps {
  products: Product[];
  className?: string;
}

export default function ProductsSection({
  products,
  className = ''
}: ProductsSectionProps) {
  return (
    <section className={`py-16 ${className}`}>
      <div className="container bg-background mx-auto">
        <h3 className="text-3xl font-bold mb-8">Products</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
