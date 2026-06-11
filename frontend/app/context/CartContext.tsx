"use client";

import {
  createContext,
  useContext,
  useState,
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

  const addToCart = (item: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    setCart((prev) => {
      const exist = prev.find((p) => p.id === item.id);
      const quantityToAdd = item.quantity ?? 1;

      if (exist) {
        const newCart = prev.map((p) =>
          p.id === item.id
            ? {
                ...p,
                quantity: p.quantity + quantityToAdd,
              }
            : p
        );
        return newCart;
      }

      const newCart = [...prev, { ...item, quantity: quantityToAdd }];
      return newCart;
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
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
};

export const useCart = () => {
  const context = useContext(CartContext);
  return context ?? defaultCartContext;
};