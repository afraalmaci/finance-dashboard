// Renders placeholder skeleton UI while dashboard data is loading
export function DashboardSkeleton() {
  return (
    <div className="animate-pulse">
      {/* KPI cards skeleton */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800"
          >
            <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded mb-3" />
            <div className="h-6 w-28 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </section>

      {/* Charts skeleton */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-8">
        <div className="lg:col-span-2 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 h-80">
          <div className="h-3 w-40 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
          <div className="h-56 bg-gray-100 dark:bg-gray-800/50 rounded" />
        </div>
        <div className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800 h-80">
          <div className="h-3 w-32 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
          <div className="h-56 bg-gray-100 dark:bg-gray-800/50 rounded" />
        </div>
      </section>

      {/* Table skeleton */}
      <section className="bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-100 dark:border-gray-800">
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded mb-4" />
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 bg-gray-100 dark:bg-gray-800/50 rounded mb-2 last:mb-0"
          />
        ))}
      </section>
    </div>
  );
}