import ProductDetails from '@/components/products/ProductDetails';

export default async function ProductPage({
  params
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  return <ProductDetails id={id} />;
}
