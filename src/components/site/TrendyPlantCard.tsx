import { ShoppingBag } from "lucide-react";
import { Button } from "./Button";

interface Props {
  title: string;
  description: string;
  price: number;
  image: string;
  imageOnRight?: boolean;
  onBuy: () => void;
}

export function TrendyPlantCard({ title, description, price, image, imageOnRight, onBuy }: Props) {
  const Image = (
    <div className="flex-shrink-0 flex justify-center md:justify-start">
      <img
        src={image}
        alt={title}
        className="w-48 h-48 md:w-60 md:h-60 object-cover rounded-2xl -my-6"
      />
    </div>
  );
  const Content = (
    <div className="flex-1 space-y-3">
      <h3 className="text-xl md:text-2xl font-semibold text-foreground">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-md leading-relaxed">{description}</p>
      <div className="text-lg font-bold text-foreground">Rs. {price}/-</div>
      <div className="flex items-center gap-3 pt-1">
        <Button onClick={onBuy}>Explore</Button>
        <button
          aria-label="Add to cart"
          onClick={onBuy}
          className="w-9 h-9 rounded-lg border border-foreground/40 hover:border-primary hover:text-primary flex items-center justify-center text-foreground transition-colors"
        >
          <ShoppingBag className="w-4 h-4" />
        </button>
      </div>
    </div>
  );

  return (
    <article className="bg-surface border border-border rounded-3xl p-6 md:p-8 card-hover">
      <div className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 ${imageOnRight ? "md:flex-row-reverse" : ""}`}>
        {Image}
        {Content}
      </div>
    </article>
  );
}
