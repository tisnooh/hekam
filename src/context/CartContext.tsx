'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { CartItem } from '@/lib/types';

interface CartContextValue {
  items: CartItem[];
  isOpen: boolean;
  isSearchOpen: boolean;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  replaceItem: (item: CartItem) => void;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => [...prev, item]);
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const replaceItem = useCallback((item: CartItem) => {
    setItems((prev) => prev.map((i) => (i.id === item.id ? item : i)));
  }, []);

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.unitPrice, 0), [items]);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isOpen,
      isSearchOpen,
      addItem,
      removeItem,
      replaceItem,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      openSearch: () => setIsSearchOpen(true),
      closeSearch: () => setIsSearchOpen(false),
      subtotal,
    }),
    [items, isOpen, isSearchOpen, addItem, removeItem, replaceItem, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé sous CartProvider');
  return ctx;
}
