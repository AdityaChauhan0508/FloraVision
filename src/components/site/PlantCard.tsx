import { ShoppingBag } from "lucide-react";

interface Props {
  name: string;
  description: string;
  price: number;
  image: string;
  onBuy: () => void;
}

export function PlantCard({ name, description, price, image, onBuy }: Props) {
  return (
    <article className="bg-surface border border-border rounded-3xl p-5 card-hover flex flex-col">
      <div className="h-48 flex items-center justify-center mb-4">
        <img src={image} alt={name} className="max-h-full object-contain rounded-2xl" />
      </div>
      <h3 className="text-foreground font-semibold text-lg">{name}</h3>
      <p className="text-xs text-muted-foreground mt-2 leading-relaxed flex-1 line-clamp-3">
        {description}
      </p>
      <div className="flex items-center justify-between mt-4">
        <span className="font-bold text-foreground">Rs. {price}/-</span>
        <button
          onClick={onBuy}
          aria-label={`Add ${name} to cart`}
          className="w-9 h-9 rounded-lg border border-foreground/40 hover:border-primary hover:text-primary flex items-center justify-center text-foreground transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}
