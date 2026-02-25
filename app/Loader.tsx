export function LoadingSkeleton() {
  return (
    <div className="flex flex-col gap-3 sm:gap-5 animate-pulse">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="space-y-2">
          <div className="h-6 sm:h-8 bg-gray-200 dark:bg-gray-700 rounded w-48"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-96"></div>
        </div>
        <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>

      {/* Step indicator */}
      <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>

      {/* Form card */}
      <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
    </div>
  );
}