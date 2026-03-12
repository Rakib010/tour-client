type SectionHeaderProps = {
  badge?: string;
  title: React.ReactNode;
  description?: string;
};

export default function SectionHeader({
  badge,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="text-center max-w-3xl mx-auto mb-12">
      {badge && (
        <p className="inline-flex items-center bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-2">
          {badge}
        </p>
      )}
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
        {title}
      </h2>
      {description && (
        <p className="text-muted-foreground text-sm md:text-base mb-2">
          {description}
        </p>
      )}
      <div className="w-16 h-1 bg-primary rounded-full mx-auto mt-2" />
      
    </div>
  );
}
