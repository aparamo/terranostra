'use client';

import {Product} from '@/payload-types';
import {Button} from '@/components/ui/button';
import {useCart} from '@/context/CartContext';
import {toast} from 'sonner';

const AddToCart = ({product}: {product: Product}) => {
  const {addToCart} = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return <Button onClick={handleAddToCart}>Add to Cart</Button>;
};

export default AddToCart;
