import { useEffect, useState } from "react";
import { Search, ShoppingBag, Menu, X, Leaf, ChevronDown } from "lucide-react";

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
}

const links = ["Home", "Plants Type", "More", "Contact"];

export function Navbar({ cartCount, onOpenCart }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-background/90 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 text-foreground font-bold text-xl">
            <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </span>
            FloraVision<span className="text-primary">.</span>
          </a>

          <ul className="hidden lg:flex items-center gap-10 text-sm text-foreground/90">
            {links.map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                  {l}
                  {l === "Plants Type" && <ChevronDown className="w-3 h-3" />}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 text-foreground">
            <button aria-label="Search" className="hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded p-1">
              <Search className="w-5 h-5" />
            </button>
            <button onClick={onOpenCart} aria-label="Cart" className="relative hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded p-1">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="lg:hidden hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary rounded p-1"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button aria-label="Menu" className="hidden lg:block hover:text-primary p-1">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-opacity ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      >
        <div className="absolute inset-0 bg-black/60" />
        <aside
          className={`absolute left-0 top-0 h-full w-72 bg-surface shadow-2xl p-6 transition-transform ${open ? "translate-x-0" : "-translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-8">
            <span className="font-bold text-foreground">FloraVision.</span>
            <button onClick={() => setOpen(false)} aria-label="Close" className="text-foreground">
              <X className="w-5 h-5" />
            </button>
          </div>
          <ul className="space-y-5">
            {links.map((l) => (
              <li key={l}>
                <a href="#" className="text-foreground hover:text-primary text-lg">{l}</a>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </>
  );
}
