import {Product} from '@/payload-types';
import Link from 'next/link';
import Image from 'next/image';

const ProductCard = ({product}: {product: Product}) => {
  const imageUrl =
    product.images &&
    product.images.length > 0 &&
    typeof product.images[0]?.image === 'object'
      ? (product.images[0]?.image?.url ?? '/placeholder.svg')
      : '/placeholder.svg';

  return (
    <Link href={`/products/${product.id}`}>
      <div className="group rounded-lg border shadow-sm transition-all hover:shadow-md">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={imageUrl ?? ''}
            alt={product.name}
            width={400}
            height={300}
            className="h-60 w-full object-cover transition-all group-hover:scale-105"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <p className="text-sm text-muted-foreground">{product.description}</p>
          <p className="mt-2 font-semibold">${product.price}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
