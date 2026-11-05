import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Work } from "./content";
export type Viewer =
  | {
      kind: "images";
      images: string[];
      title: string;
      index?: number;
      returnTo?: Work;
    }
  | { kind: "video"; title: string }
  | { kind: "project"; work: Work }
  | null;
export type Cart = Record<number, number>;
type State = {
  viewer: Viewer;
  setViewer: (v: Viewer) => void;
  cart: Cart;
  setCart: (c: Cart) => void;
  addToCart: (id: number, qty?: number) => void;
  theme: string;
  toggleTheme: () => void;
};
const Context = createContext<State>(null!);
function stored<T>(key: string, fallback: T): T {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}
export function AppProvider({ children }: { children: ReactNode }) {
  const [viewer, setViewer] = useState<Viewer>(null);
  const [cart, updateCart] = useState<Cart>(() => stored("ryancv.cart", {}));
  const [theme, setTheme] = useState<string>(() =>
    stored("ryancv.theme", "dark"),
  );
  const setCart = (c: Cart) => {
    updateCart(c);
    localStorage.setItem("ryancv.cart", JSON.stringify(c));
  };
  const addToCart = (id: number, qty = 1) => {
    updateCart((c) => {
      const next = { ...c, [id]: (c[id] || 0) + qty };
      localStorage.setItem("ryancv.cart", JSON.stringify(next));
      return next;
    });
  };
  const toggleTheme = () =>
    setTheme((t) => {
      const next = t === "dark" ? "light" : "dark";
      localStorage.setItem("ryancv.theme", JSON.stringify(next));
      return next;
    });
  return (
    <Context
      value={{
        viewer,
        setViewer,
        cart,
        setCart,
        addToCart,
        theme,
        toggleTheme,
      }}
    >
      <div data-theme={theme}>{children}</div>
    </Context>
  );
}
export const useApp = () => useContext(Context);
