export default function LessonLoading() {
  return (
    <div className="min-h-screen flex flex-col animate-pulse">
      {/* Top bar skeleton */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-[#0D1117]">
        <div className="h-4 w-24 bg-white/10 rounded" />
        <div className="h-4 w-32 bg-white/10 rounded" />
        <div className="h-4 w-12 bg-white/10 rounded" />
      </header>

      {/* Content skeleton */}
      <main className="flex-1 p-6">
        <div className="max-w-3xl mx-auto space-y-4">
          {/* Progress bar */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 bg-white/10 rounded" />
            <div className="h-3 w-20 bg-white/10 rounded" />
          </div>

          {/* Content blocks */}
          <div className="space-y-3 mt-6">
            <div className="h-4 w-3/4 bg-white/10 rounded" />
            <div className="h-4 w-1/2 bg-white/10 rounded" />
            <div className="h-4 w-5/6 bg-white/10 rounded" />
          </div>

          {/* Button skeleton */}
          <div className="mt-8">
            <div className="h-10 w-20 bg-white/10 rounded" />
          </div>
        </div>
      </main>
    </div>
  );
}
