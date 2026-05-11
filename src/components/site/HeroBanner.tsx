import { Play, Star, ChevronRight } from "lucide-react";
import { Button } from "./Button";
import trendyPlant1 from "@/assets/trendy-plant-1.jpg";

interface Props {
  onBuy: () => void;
}

export function HeroBanner({ onBuy }: Props) {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1598880940080-ff9a29891b85?w=1600')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left */}
          <div className="space-y-6 max-w-lg">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground leading-[1.05]">
              Earth's<br />Exhale
            </h1>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              "Earth Exhale" symbolizes the regenerative breathing and balance of our living
              world — capturing the essence of the Earth's natural environment and its essential life.
            </p>
            <div className="flex items-center gap-4">
              <Button onClick={onBuy}>Buy Now</Button>
              <button
                aria-label="Play demo"
                className="w-10 h-10 rounded-full border border-foreground/40 flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
              >
                <Play className="w-4 h-4 fill-current" />
              </button>
              <span className="text-xs text-foreground/80">Live Demo</span>
            </div>

            {/* Testimonial floating */}
            <div className="mt-12 max-w-xs bg-surface/80 backdrop-blur-md border border-border rounded-2xl p-4 card-hover">
              <div className="flex items-center gap-3">
                <img src="https://i.pravatar.cc/60?img=12" alt="Ronnie" className="w-9 h-9 rounded-full object-cover" />
                <div>
                  <div className="text-sm font-semibold text-foreground">Ronnie Hamill</div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-3 leading-relaxed">
                I can't express how thrilled I am with my new natural plants! They bring such a
                fresh and vibrant energy to my home.
              </p>
            </div>
          </div>

          {/* Right product card */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-72 bg-surface-elevated/90 backdrop-blur-md border border-border rounded-3xl p-5 card-hover">
              <div className="rounded-2xl overflow-hidden bg-background/50 mb-4">
                <img
                  src={trendyPlant1}
                  alt="Aglaonema plant"
                  className="w-full h-56 object-cover"
                />
              </div>
              <div className="text-xs text-muted-foreground">Indoor Plant</div>
              <div className="flex items-center justify-between mt-1 mb-4">
                <h3 className="text-foreground font-semibold">Aglaonema plant</h3>
                <ChevronRight className="w-4 h-4 text-foreground/70" />
              </div>
              <Button onClick={onBuy}>Buy Now</Button>
              <div className="flex justify-center gap-1.5 mt-4">
                <span className="w-5 h-1 rounded-full bg-primary" />
                <span className="w-1 h-1 rounded-full bg-foreground/40" />
                <span className="w-1 h-1 rounded-full bg-foreground/40" />
              </div>
            </div>
          </div>
        </div>

        {/* Avatars social proof */}
        <div className="flex justify-center mt-16">
          <div className="flex -space-x-3">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/60?img=${i + 20}`}
                alt=""
                className="w-10 h-10 rounded-full border-2 border-background object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
