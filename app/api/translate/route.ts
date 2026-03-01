import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { NextResponse } from "next/server";

import type { ColloquialTranslation } from "@/types/canto";

const SYSTEM_PROMPT = `你是一个地道的香港人。将输入的普通话书面语转换为极其地道的粤语口语。
你必须严格返回 JSON，格式为：
{
  "canto": "string",
  "jyutping": "string",
  "diff": [
    {
      "original_word": "string",
      "canto_word": "string",
      "reason": "string"
    }
  ]
}
要求：
1) 不要输出 JSON 以外的任何文字。
2) 语气必须自然、地道、口语化，偏香港常用表达。
3) jyutping 必须与 canto 对齐，使用带数字声调。
4) diff 只列出关键替换，reason 用简短中文说明。
5) 例子：输入“他在哪？”，可输出 {"canto":"佢喺边度？","jyutping":"keoi5 hai2 bin1 dou6?","diff":[...]}。`;

const OPENAI_JSON_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    canto: { type: "string" },
    jyutping: { type: "string" },
    diff: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        properties: {
          original_word: { type: "string" },
          canto_word: { type: "string" },
          reason: { type: "string" },
        },
        required: ["original_word", "canto_word", "reason"],
      },
    },
  },
  required: ["canto", "jyutping", "diff"],
} as const;

function parseJsonContent(raw: string): unknown {
  const trimmed = raw.trim();
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  const jsonText = fenceMatch ? fenceMatch[1] : trimmed;
  return JSON.parse(jsonText);
}

function normalizeTranslation(payload: unknown): ColloquialTranslation {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid translation payload");
  }

  const record = payload as Record<string, unknown>;
  const canto = typeof record.canto === "string" ? record.canto.trim() : "";
  const jyutping = typeof record.jyutping === "string" ? record.jyutping.trim() : "";
  const rawDiff = Array.isArray(record.diff) ? record.diff : [];

  const diff = rawDiff
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }

      const row = item as Record<string, unknown>;
      const original_word = typeof row.original_word === "string" ? row.original_word.trim() : "";
      const canto_word = typeof row.canto_word === "string" ? row.canto_word.trim() : "";
      const reason = typeof row.reason === "string" ? row.reason.trim() : "";

      if (!original_word || !canto_word || !reason) {
        return null;
      }

      return { original_word, canto_word, reason };
    })
    .filter((item): item is ColloquialTranslation["diff"][number] => Boolean(item));

  if (!canto || !jyutping) {
    throw new Error("Model response missing canto or jyutping");
  }

  return { canto, jyutping, diff };
}

function getRequiredKey(key: "OPENAI_API_KEY" | "ANTHROPIC_API_KEY"): string {
  const value = process.env[key];
  if (!value) {
    console.error("Missing API Key", { provider: key });
    throw new Error("Missing API Key");
  }
  return value;
}

async function translateByOpenAI(text: string): Promise<ColloquialTranslation> {
  const apiKey = getRequiredKey("OPENAI_API_KEY");
  const model = process.env.OPENAI_MODEL ?? "gpt-4o";

  const client = new OpenAI({ apiKey });
  const completion = await client.chat.completions.create({
    model,
    temperature: 0.2,
    response_format: {
      type: "json_schema",
      json_schema: {
        name: "canto_translation",
        strict: true,
        schema: OPENAI_JSON_SCHEMA,
      },
    },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: text },
    ],
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("OpenAI empty response");
  }

  return normalizeTranslation(parseJsonContent(content));
}

async function translateByAnthropic(text: string): Promise<ColloquialTranslation> {
  const apiKey = getRequiredKey("ANTHROPIC_API_KEY");
  const model = process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-latest";

  const client = new Anthropic({ apiKey });
  const message = await client.messages.create({
    model,
    max_tokens: 800,
    temperature: 0.2,
    system: SYSTEM_PROMPT,
    messages: [{ role: "user", content: text }],
  });

  const content = message.content.find((item) => item.type === "text")?.text;
  if (!content) {
    throw new Error("Anthropic empty response");
  }

  return normalizeTranslation(parseJsonContent(content));
}

function selectProvider(): "openai" | "anthropic" {
  const configured = process.env.LLM_PROVIDER;
  if (configured === "openai" || configured === "anthropic") {
    return configured;
  }
  return process.env.ANTHROPIC_API_KEY ? "anthropic" : "openai";
}

export async function POST(request: Request) {
  try {
    console.log("API Key 存在吗：" + !!process.env.OPENAI_API_KEY);

    const body = (await request.json()) as { text?: string };
    const text = body.text?.trim();

    if (!text) {
      return NextResponse.json({ error: "请输入要转换的普通话文本。" }, { status: 400 });
    }

    if (text.length > 500) {
      return NextResponse.json({ error: "输入过长，请控制在 500 字以内。" }, { status: 400 });
    }

    const provider = selectProvider();
    const result = provider === "anthropic" ? await translateByAnthropic(text) : await translateByOpenAI(text);

    return NextResponse.json(result);
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
