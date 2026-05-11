import { useEffect, useRef } from "react";
import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "./Button";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

export function CartDrawer({ open, onClose, items, onUpdateQty, onRemove, onClear }: Props) {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const panelRef = useRef<HTMLElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  // Esc-to-close + focus management + body scroll lock
  useEffect(() => {
    if (!open) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const getFocusable = () => {
      if (!panelRef.current) return [] as HTMLElement[];
      return Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((el) => !el.hasAttribute("aria-hidden"));
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "Tab") {
        const f = getFocusable();
        if (f.length === 0) {
          e.preventDefault();
          return;
        }
        const first = f[0];
        const last = f[f.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && active === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity ${
        open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!open}
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-surface border-l border-border shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        aria-describedby="cart-drawer-desc"
        tabIndex={-1}
      >
        <header className="flex items-center justify-between p-5 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" aria-hidden="true" />
            <h2 id="cart-drawer-title" className="font-semibold text-foreground">
              Your Cart {items.length > 0 && <span className="text-muted-foreground text-sm">({items.length})</span>}
            </h2>
          </div>
          <button
            ref={closeBtnRef}
            onClick={onClose}
            aria-label="Close cart"
            className="text-foreground hover:text-primary p-1 focus:outline-none focus:ring-2 focus:ring-primary rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </header>

        <p id="cart-drawer-desc" className="sr-only">
          Shopping cart drawer. Press Escape to close.
        </p>

        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
              <ShoppingBag className="w-12 h-12 mb-3 opacity-40" aria-hidden="true" />
              <p className="text-sm">Your cart is empty</p>
              <p className="text-xs mt-1">Add some lovely plants to get started</p>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Items
                </span>
                <button
                  onClick={onClear}
                  className="text-xs text-muted-foreground hover:text-destructive underline-offset-2 hover:underline focus:outline-none focus:ring-2 focus:ring-primary rounded px-1"
                  aria-label="Clear all items from cart"
                >
                  Clear cart
                </button>
              </div>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex gap-3 bg-background/40 border border-border rounded-2xl p-3"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-sm font-semibold text-foreground truncate">{item.name}</h3>
                        <button
                          onClick={() => onRemove(item.id)}
                          aria-label={`Remove ${item.name}`}
                          className="text-muted-foreground hover:text-destructive transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-primary rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5">Rs. {item.price}/-</div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-border rounded-full" role="group" aria-label={`Quantity for ${item.name}`}>
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-7 h-7 flex items-center justify-center text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-6 text-center text-xs text-foreground" aria-live="polite">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="w-7 h-7 flex items-center justify-center text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded-full"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="text-sm font-semibold text-foreground">
                          Rs. {item.price * item.quantity}/-
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-border p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold text-foreground">Rs. {subtotal}/-</span>
            </div>
            <Button variant="filled" size="md" className="w-full">
              Checkout
            </Button>
          </footer>
        )}
      </aside>
    </div>
  );
}
