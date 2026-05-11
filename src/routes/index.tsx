import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { HeroBanner } from "@/components/site/HeroBanner";
import { TrendyPlantCard } from "@/components/site/TrendyPlantCard";
import { PlantCard } from "@/components/site/PlantCard";
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { O2Section } from "@/components/site/O2Section";
import { Footer } from "@/components/site/Footer";
import { SectionHeading } from "@/components/site/SectionHeading";
import { CartDrawer, type CartItem } from "@/components/site/CartDrawer";
import { topSellingPlants, testimonials } from "@/data/plants";
import trendyPlant1 from "@/assets/trendy-plant-1.jpg";
import trendyPlant2 from "@/assets/trendy-plant-2.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "FloraVision — Premium Indoor & O2 Plants" },
      { name: "description", content: "FloraVision: shop premium indoor, decor, and oxygen-producing plants. Bring nature home with our curated collection." },
    ],
  }),
});

type ItemInput = Omit<CartItem, "quantity">;

function Index() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const addToCart = (item: ItemInput) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const updateQty = (id: string, qty: number) => {
    if (qty <= 0) return setItems((prev) => prev.filter((i) => i.id !== id));
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)));
  };

  const remove = (id: string) => setItems((prev) => prev.filter((i) => i.id !== id));

  const totalCount = items.reduce((s, i) => s + i.quantity, 0);

  const heroAglaonema: ItemInput = {
    id: "hero-aglaonema",
    name: "Aglaonema plant",
    price: 450,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400",
  };

  const trendy1: ItemInput = {
    id: "trendy-1",
    name: "Desk Decoration Plant",
    price: 599,
    image: trendyPlant1,
  };
  const trendy2: ItemInput = {
    id: "trendy-2",
    name: "Desk Succulent",
    price: 399,
    image: trendyPlant2,
  };

  const o2Item: ItemInput = {
    id: "o2-collection",
    name: "O2 Plant Collection",
    price: 699,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400",
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar cartCount={totalCount} onOpenCart={() => setCartOpen(true)} />
      <main>
        <HeroBanner onBuy={() => addToCart(heroAglaonema)} />

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
          <SectionHeading>Our Trendy plants</SectionHeading>
          <div className="space-y-8">
            <TrendyPlantCard
              title="For Your Desks Decorations"
              description="I recently added a beautiful desk decoration plant to my workspace, and it has made such a positive difference!"
              price={599}
              image={trendy1.image}
              onBuy={() => addToCart(trendy1)}
            />
            <TrendyPlantCard
              title="For Your Desks Decorations"
              description="The greenery adds a touch of nature and serenity to my desk, making it feel more inviting and calming"
              price={399}
              image={trendy2.image}
              imageOnRight
              onBuy={() => addToCart(trendy2)}
            />
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
          <SectionHeading>Our Top Selling Plants</SectionHeading>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topSellingPlants.map((p) => (
              <PlantCard
                key={p.id}
                {...p}
                onBuy={() =>
                  addToCart({
                    id: `top-${p.id}`,
                    name: p.name,
                    price: p.price,
                    image: p.image,
                  })
                }
              />
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
          <SectionHeading>Customer Review</SectionHeading>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <TestimonialCard key={t.id} {...t} />
            ))}
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-16">
          <SectionHeading>Our Best o2</SectionHeading>
          <O2Section onBuy={() => addToCart(o2Item)} />
        </section>
      </main>
      <Footer />
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        items={items}
        onUpdateQty={updateQty}
        onRemove={remove}
        onClear={() => setItems([])}
      />
    </div>
  );
}
