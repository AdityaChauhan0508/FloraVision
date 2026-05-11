import { useState } from "react";
import { Leaf } from "lucide-react";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  return (
    <footer className="border-t border-border bg-background mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 grid md:grid-cols-3 gap-10">
        <div className="space-y-4">
          <div className="flex items-center gap-2 font-bold text-foreground text-lg">
            <span className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary" />
            </span>
            FloraVision<span className="text-primary">.</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
            "From lush indoor greens to vibrant outdoor blooms, our plants are crafted to thrive
            and elevate your living environment."
          </p>
          <div className="flex gap-4 text-sm text-muted-foreground pt-2">
            <a href="#" className="hover:text-primary">FB</a>
            <a href="#" className="hover:text-primary">TW</a>
            <a href="#" className="hover:text-primary">LI</a>
          </div>
        </div>

        <div>
          <h4 className="text-foreground font-semibold mb-4">Quick Link's</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#" className="hover:text-primary">Home</a></li>
            <li><a href="#" className="hover:text-primary">Type's Of plant's</a></li>
            <li><a href="#" className="hover:text-primary">Contact</a></li>
            <li><a href="#" className="hover:text-primary">Privacy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-foreground font-semibold mb-4">For Every Update.</h4>
          <form onSubmit={handleSubscribe} className="flex bg-surface rounded-full p-1 border border-border max-w-sm">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Email"
              className="flex-1 bg-transparent px-4 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-primary-foreground text-xs font-semibold px-5 rounded-full hover:brightness-110 transition focus:outline-none focus:ring-2 focus:ring-primary"
            >
              SUBSCRIBE
            </button>
          </form>
          {subscribed && <p className="text-primary text-xs mt-3">Subscribed!</p>}
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-5 text-right text-xs text-muted-foreground">
          FloraVision ® all right reserve
        </div>
      </div>
    </footer>
  );
}
