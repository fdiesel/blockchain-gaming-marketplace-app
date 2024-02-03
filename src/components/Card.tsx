export default function Card({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`p-3 bg-zinc-100/30 rounded-xl shadow-xl ${className}`}>
      {children}
    </div>
  );
}
