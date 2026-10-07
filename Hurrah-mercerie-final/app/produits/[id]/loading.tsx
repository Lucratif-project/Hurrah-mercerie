export default function Loading() {
  return (
    <main className="min-h-screen bg-[#faf8f4] px-6 py-16">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="h-4 w-24 rounded-full bg-neutral-200" />

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="h-[420px] rounded-[2rem] bg-neutral-200 sm:h-[520px]" />

          <div className="space-y-4">
            <div className="h-10 w-2/3 rounded-2xl bg-neutral-200" />
            <div className="h-4 w-full rounded-full bg-neutral-100" />
            <div className="h-4 w-5/6 rounded-full bg-neutral-100" />
            <div className="h-8 w-1/3 rounded-full bg-neutral-200" />
            <div className="h-12 w-full rounded-full bg-neutral-200" />
          </div>
        </div>
      </div>
    </main>
  );
}
