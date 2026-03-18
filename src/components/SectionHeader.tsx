
export default function SectionHeader({ 
  title, 
  subtitle, 
  centered = true,
  light = false 
}: { 
  title: string; 
  subtitle?: string; 
  centered?: boolean;
  light?: boolean;
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : 'text-left'} max-w-3xl ${centered ? 'mx-auto' : ''}`}>
      <h2 className={`text-3xl md:text-4xl font-headline mb-4 ${light ? 'text-white' : 'text-primary'}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`text-lg ${light ? 'text-white/80' : 'text-muted-foreground'}`}>
          {subtitle}
        </p>
      )}
      <div className={`h-1 w-20 bg-secondary mt-4 ${centered ? 'mx-auto' : ''}`} />
    </div>
  )
}
