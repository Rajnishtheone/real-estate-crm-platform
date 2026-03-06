export const PropertySkeletonGrid = ({ count = 6 }: { count?: number }) => (
  <div className="grid gap-4 md:grid-cols-3">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="rounded-xl bg-white shadow-sm p-4 animate-pulse space-y-3">
        <div className="h-32 bg-slate-200 rounded" />
        <div className="h-4 bg-slate-200 rounded" />
        <div className="h-4 bg-slate-200 rounded w-1/2" />
        <div className="h-4 bg-slate-200 rounded w-1/3" />
      </div>
    ))}
  </div>
);

export const TableSkeleton = ({ rows = 4, cols = 3 }: { rows?: number; cols?: number }) => (
  <div className="animate-pulse">
    {Array.from({ length: rows }).map((_, r) => (
      <div key={r} className="grid" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
        {Array.from({ length: cols }).map((_, c) => (
          <div key={c} className="h-10 bg-slate-200 m-1 rounded" />
        ))}
      </div>
    ))}
  </div>
);
