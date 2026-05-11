export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mb-10">
      <h2 className="bracket-heading text-2xl md:text-3xl font-semibold text-foreground">
        {children}
      </h2>
    </div>
  );
}
