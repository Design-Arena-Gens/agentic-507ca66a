"use client";

import PostGenerator from "@/components/PostGenerator";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200/60 dark:border-zinc-800/60 bg-white/70 dark:bg-zinc-950/50 backdrop-blur sticky top-0 z-10">
        <div className="mx-auto max-w-5xl px-6 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">LinkedIn Post Agent</h1>
          <div className="text-sm text-zinc-500 dark:text-zinc-400">Craft compelling posts in minutes</div>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-6 py-8">
        <PostGenerator />
      </main>
      <footer className="mx-auto max-w-5xl px-6 py-8 text-xs text-zinc-500 dark:text-zinc-400">
        <p>Tip: Keep it authentic. Add your voice before posting.</p>
      </footer>
    </div>
  );
}
