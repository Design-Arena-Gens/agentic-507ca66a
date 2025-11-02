"use client";

import { useMemo, useState } from "react";
import type { GenerateOptions, Tone, Goal, Format, Length } from "@/lib/generator";

const tones: Tone[] = ["Professional", "Friendly", "Thought Leadership", "Storytelling", "Analytical"];
const goals: Goal[] = ["Engage", "Educate", "Promote", "Recruit", "Celebrate"];
const formats: Format[] = ["List", "Tips", "Story", "Case Study"];
const lengths: Length[] = ["Short", "Medium", "Long"];

export default function PostGenerator() {
  const [brief, setBrief] = useState("");
  const [audience, setAudience] = useState("professionals on LinkedIn");
  const [tone, setTone] = useState<Tone>("Professional");
  const [goal, setGoal] = useState<Goal>("Educate");
  const [format, setFormat] = useState<Format>("List");
  const [length, setLength] = useState<Length>("Medium");
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [includeEmojis, setIncludeEmojis] = useState(true);
  const [callToAction, setCallToAction] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [chars, setChars] = useState<number>(0);

  const canGenerate = brief.trim().length >= 12;
  const charClass = useMemo(() => {
    if (chars > 2900) return "text-red-500";
    if (chars > 2400) return "text-amber-600";
    return "text-zinc-500";
  }, [chars]);

  async function generate() {
    if (!canGenerate) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          brief,
          audience,
          tone,
          goal,
          format,
          length,
          includeHashtags,
          includeEmojis,
          callToAction: callToAction || null,
        } satisfies GenerateOptions),
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      const data = (await res.json()) as { content: string; characters: number };
      setResult(data.content);
      setChars(data.characters);
    } catch (e: unknown) {
      setError((e as Error).message || "Failed to generate post");
    } finally {
      setLoading(false);
    }
  }

  function copy() {
    if (!result) return;
    navigator.clipboard.writeText(result);
  }

  function reset() {
    setResult("");
    setChars(0);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <h2 className="text-base font-semibold mb-4">Your brief</h2>
        <div className="space-y-4">
          <div>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Describe the idea. Add bullets or raw notes; we?ll structure it."
              className="w-full h-36 resize-y rounded-lg border border-zinc-300 bg-white p-3 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Audience</label>
              <input
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                placeholder="e.g., startup founders, hiring managers, data scientists"
                className="w-full rounded-lg border border-zinc-300 bg-white p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value as Tone)} className="w-full rounded-lg border border-zinc-300 bg-white p-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900">
                {tones.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Goal</label>
              <select value={goal} onChange={(e) => setGoal(e.target.value as Goal)} className="w-full rounded-lg border border-zinc-300 bg-white p-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900">
                {goals.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Format</label>
              <select value={format} onChange={(e) => setFormat(e.target.value as Format)} className="w-full rounded-lg border border-zinc-300 bg-white p-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900">
                {formats.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Length</label>
              <select value={length} onChange={(e) => setLength(e.target.value as Length)} className="w-full rounded-lg border border-zinc-300 bg-white p-2.5 text-sm dark:border-zinc-700 dark:bg-zinc-900">
                {lengths.map((l) => (
                  <option key={l} value={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs text-zinc-500 mb-1">Call to action (optional)</label>
              <input
                value={callToAction}
                onChange={(e) => setCallToAction(e.target.value)}
                placeholder="e.g., Want the checklist? Comment 'checklist'"
                className="w-full rounded-lg border border-zinc-300 bg-white p-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" className="size-4" checked={includeHashtags} onChange={(e) => setIncludeHashtags(e.target.checked)} /> Include hashtags</label>
            <label className="inline-flex items-center gap-2 text-sm"><input type="checkbox" className="size-4" checked={includeEmojis} onChange={(e) => setIncludeEmojis(e.target.checked)} /> Include emojis</label>
          </div>
          <div className="flex gap-2">
            <button disabled={!canGenerate || loading} onClick={generate} className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">{loading ? "Generating..." : "Generate post"}</button>
            <button onClick={reset} className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900">Reset</button>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
      </section>

      <section className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-base font-semibold">Output</h2>
          <div className="text-xs text-zinc-500">Characters: <span className={charClass}>{chars}</span> / 3000</div>
        </div>
        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 p-4 min-h-72 whitespace-pre-wrap text-sm">
          {result ? result : <span className="text-zinc-500">Your generated post will appear here.</span>}
        </div>
        <div className="mt-3 flex gap-2">
          <button onClick={copy} disabled={!result} className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900">Copy</button>
          <a
            className="inline-flex items-center justify-center rounded-lg border border-zinc-300 px-3 py-1.5 text-sm hover:bg-zinc-50 disabled:opacity-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(result || "")}`}
            download="linkedin-post.txt"
          >
            Download .txt
          </a>
        </div>
        <div className="mt-3 text-xs text-zinc-500">
          Note: LinkedIn limit is ~3,000 characters. Aim for clear line breaks; avoid long paragraphs.
        </div>
      </section>
    </div>
  );
}
