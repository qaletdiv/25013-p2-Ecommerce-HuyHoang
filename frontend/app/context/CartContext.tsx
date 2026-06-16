"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

type CartItem = {
  id: string;
  productId: string;
  variantId: string;
  name: string;
  price: number;
  thumbnail: string;
  size: string;
  color: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  // Load cart for current user when component mounts
  useEffect(() => {
    const loadCartForUser = () => {
      const user = localStorage.getItem("user");
      const userId = user ? JSON.parse(user).id : null;
      
      setCurrentUserId(userId);

      if (userId) {
        const savedCart = localStorage.getItem(`cart_${userId}`);
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        } else {
          setCart([]);
        }
      } else {
        setCart([]);
      }
    };

    loadCartForUser();
    setMounted(true);

    // Monitor for user changes (login/logout)
    const interval = setInterval(loadCartForUser, 500);
    return () => clearInterval(interval);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (!mounted || !currentUserId) return;

    localStorage.setItem(
      `cart_${currentUserId}`,
      JSON.stringify(cart)
    );
  }, [cart, mounted, currentUserId]);

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      const quantityToAdd = item.quantity ?? 1;

      if (exist) {
        return prev.map((p) =>
          p.id === item.id
            ? {
              ...p,
              quantity: p.quantity + quantityToAdd,
            }
            : p
        );
      }

      return [...prev, { ...item, quantity: quantityToAdd }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, quantity: Math.max(1, quantity) } : p
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const defaultCartContext: CartContextType = {
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
  updateQuantity: () => { },
  clearCart: () => { },
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context ?? defaultCartContext;
};