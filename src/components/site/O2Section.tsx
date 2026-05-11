import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import { o2Slides } from "@/data/plants";

export function O2Section({ onBuy }: { onBuy: () => void }) {
  const [idx, setIdx] = useState(0);
  const slide = o2Slides[idx];
  const total = o2Slides.length;

  const prev = () => setIdx((i) => (i - 1 + total) % total);
  const next = () => setIdx((i) => (i + 1) % total);

  return (
    <div className="bg-surface border border-border rounded-3xl p-6 md:p-10 card-hover">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="flex justify-center">
          <img
            src={slide.image}
            alt={slide.title}
            className="max-h-80 w-auto object-contain rounded-2xl -mt-12 md:-mt-16"
          />
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl md:text-3xl font-semibold text-foreground leading-tight">
            {slide.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{slide.p1}</p>
          <p className="text-sm text-muted-foreground leading-relaxed">{slide.p2}</p>
          <div className="flex items-center justify-between pt-2">
            <Button onClick={onBuy}>Explore</Button>
            <div className="flex items-center gap-3 text-foreground/80 text-xs">
              <button onClick={prev} aria-label="Previous" className="w-8 h-8 rounded-full border border-foreground/30 flex items-center justify-center hover:border-primary hover:text-primary">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>
                {String(idx + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
              </span>
              <button onClick={next} aria-label="Next" className="w-8 h-8 rounded-full border border-foreground/30 flex items-center justify-center hover:border-primary hover:text-primary">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center gap-2 mt-6">
        {o2Slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${i === idx ? "w-6 bg-primary" : "w-1.5 bg-foreground/30"}`}
          />
        ))}
      </div>
    </div>
  );
}
