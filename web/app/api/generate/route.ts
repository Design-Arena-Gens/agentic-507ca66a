import { NextRequest, NextResponse } from "next/server";
import { generatePost, type GenerateOptions } from "@/lib/generator";

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateOptions;
    if (!body || !body.brief || typeof body.brief !== "string") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const options: GenerateOptions = {
      brief: body.brief,
      audience: body.audience || "professionals on LinkedIn",
      tone: body.tone || "Professional",
      goal: body.goal || "Educate",
      format: body.format || "List",
      length: body.length || "Medium",
      includeHashtags: Boolean(body.includeHashtags),
      includeEmojis: Boolean(body.includeEmojis),
      callToAction: body.callToAction ?? null,
    };

    const { content, characters } = generatePost(options);
    return NextResponse.json({ content, characters });
  } catch (e) {
    return NextResponse.json({ error: "Failed to generate" }, { status: 500 });
  }
}
