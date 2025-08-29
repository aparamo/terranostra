'use client';

import useSWR from 'swr';
import {Product} from '@/payload-types';
import {PAYLOAD_API_URL} from '@/lib/constants';
import AddToCart from '@/components/products/AddToCart';
import Image from 'next/image';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const ProductDetails = ({id}: {id: string}) => {
  const {data: product, error} = useSWR<Product>(
    `${PAYLOAD_API_URL}/products/${id}`,
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!product) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-12">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <div className="grid gap-4">
            {product.images && product.images.length > 0 ? (
              product.images.map((image, index) =>
                typeof image.image === 'object' && image.image ? (
                  <Image
                    key={index}
                    src={image.image.url ?? ''}
                    alt={product.name}
                    width={600}
                    height={600}
                    className="aspect-square w-full rounded-lg border object-cover"
                  />
                ) : null
              )
            ) : (
              <Image
                src="/placeholder.svg"
                alt="Placeholder"
                width={600}
                height={600}
                className="aspect-square w-full rounded-lg border object-cover"
              />
            )}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-muted-foreground">{product.description}</p>
          <p className="text-3xl font-bold">${product.price}</p>
          <AddToCart product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
