import { Star, StarHalf } from "lucide-react";

interface Props {
  name: string;
  avatar: string;
  rating: number;
  review: string;
}

export function TestimonialCard({ name, avatar, rating, review }: Props) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  return (
    <article className="bg-surface border border-border rounded-3xl p-5 card-hover">
      <div className="flex items-center gap-3">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <div className="font-semibold text-foreground text-sm">{name}</div>
          <div className="flex items-center gap-0.5 mt-0.5">
            {Array.from({ length: full }).map((_, i) => (
              <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            ))}
            {half && <StarHalf className="w-3 h-3 fill-yellow-400 text-yellow-400" />}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-4 leading-relaxed">{review}</p>
    </article>
  );
}
