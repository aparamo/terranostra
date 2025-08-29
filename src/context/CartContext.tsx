'use client';

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback
} from 'react';
import {Product} from '@/payload-types';
import {PAYLOAD_API_URL} from '@/lib/constants';
import {useSession} from '@/services/session'; // Assuming you have a session hook

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, newQuantity: number) => void;
  clearCart: () => void;
  loading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({children}: {children: ReactNode}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const {user} = useSession(); // Mocked for now

  const syncCart = useCallback(
    async (items: CartItem[]) => {
      if (user?.id) {
        try {
          await fetch(`${PAYLOAD_API_URL}/cart`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
              // Add authentication headers if needed
            },
            body: JSON.stringify({items, userId: user.id})
          });
        } catch (error) {
          console.error('Failed to sync cart with server:', error);
        }
      } else {
        localStorage.setItem('cart', JSON.stringify(items));
      }
    },
    [user?.id]
  );

  useEffect(() => {
    const fetchCart = async () => {
      setLoading(true);
      if (user?.id) {
        try {
          const res = await fetch(`${PAYLOAD_API_URL}/cart?userId=${user.id}`);
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          const data = await res.json();
          if (data && data.items) {
            setCartItems(data.items);
          }
        } catch (error) {
          console.error('Failed to fetch cart from server:', error);
        }
      } else {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
          setCartItems(JSON.parse(storedCart));
        }
      }
      setLoading(false);
    };
    fetchCart();
  }, [user?.id]);

  const addToCart = (product: Product) => {
    const newCartItems = ((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.product.id === product.id
            ? {...item, quantity: item.quantity + 1}
            : item
        );
      }
      return [...prevItems, {product, quantity: 1}];
    })(cartItems);
    setCartItems(newCartItems);
    syncCart(newCartItems);
  };

  const removeFromCart = (productId: string) => {
    const newCartItems = cartItems.filter(
      (item) => item.product.id !== productId
    );
    setCartItems(newCartItems);
    syncCart(newCartItems);
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    let newCartItems;
    if (newQuantity <= 0) {
      newCartItems = cartItems.filter((item) => item.product.id !== productId);
    } else {
      newCartItems = cartItems.map((item) =>
        item.product.id === productId ? {...item, quantity: newQuantity} : item
      );
    }
    setCartItems(newCartItems);
    syncCart(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    syncCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        loading
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
