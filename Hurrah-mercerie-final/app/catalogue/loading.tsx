export default function Loading() {
  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="h-4 w-40 rounded-full bg-neutral-200" />
        <div className="mt-4 h-12 w-80 rounded-2xl bg-neutral-200" />
        <div className="mt-4 h-5 w-96 max-w-full rounded-full bg-neutral-200" />

        <div className="mt-12 h-14 w-full rounded-full bg-neutral-200" />

        <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-[1.75rem] bg-white shadow-sm">
              <div className="h-64 bg-neutral-200" />
              <div className="space-y-3 p-6">
                <div className="h-5 w-3/4 rounded-full bg-neutral-200" />
                <div className="h-4 w-full rounded-full bg-neutral-100" />
                <div className="h-6 w-1/3 rounded-full bg-neutral-200" />
                <div className="h-10 w-full rounded-full bg-neutral-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
