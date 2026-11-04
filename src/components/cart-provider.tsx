"use client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export type CartItem = {
  id: string;
  title: string;
  price?: number;
  image?: string;
  qty: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  total: number;
  isOpen: boolean;
  notice: number;
  openCart: () => void;
  closeCart: () => void;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "bunonbari-cart";
const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notice, setNotice] = useState(0);
  const noticeTimer = useRef<number | undefined>(undefined);

  // Load the saved cart after the first render so server and client HTML match.
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
      if (Array.isArray(saved)) {
        setItems(
          saved.filter(
            (item): item is CartItem =>
              item &&
              typeof item.id === "string" &&
              typeof item.title === "string" &&
              typeof item.qty === "number" &&
              item.qty > 0,
          ),
        );
      }
    } catch {
      /* storage unavailable: start with an empty cart */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, loaded]);

  const add = useCallback((item: Omit<CartItem, "qty">, qty = 1) => {
    setItems((current) =>
      current.some((entry) => entry.id === item.id)
        ? current.map((entry) =>
            entry.id === item.id ? { ...entry, qty: entry.qty + qty } : entry,
          )
        : [...current, { ...item, qty }],
    );
    // small "Added to cart" pop-up that disappears quickly; the panel opens only from the cart icon
    setNotice((n) => n + 1);
    window.clearTimeout(noticeTimer.current);
    noticeTimer.current = window.setTimeout(() => setNotice(0), 1400);
  }, []);
  const setQty = useCallback((id: string, qty: number) => {
    setItems((current) =>
      qty <= 0
        ? current.filter((entry) => entry.id !== id)
        : current.map((entry) => (entry.id === id ? { ...entry, qty } : entry)),
    );
  }, []);
  const remove = useCallback(
    (id: string) => setItems((current) => current.filter((e) => e.id !== id)),
    [],
  );
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((sum, item) => sum + item.qty, 0),
      total: items.reduce((sum, item) => sum + (item.price ?? 0) * item.qty, 0),
      isOpen,
      notice,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      setQty,
      remove,
      clear,
    }),
    [items, isOpen, notice, add, setQty, remove, clear],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
