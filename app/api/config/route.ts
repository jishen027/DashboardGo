import { NextResponse } from 'next/server';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import type { DashyConfig } from '@/types';
import { DEFAULT_DASHY_CONFIG } from '@/data/defaultConfig';

const CONFIG_PATH = join(process.cwd(), 'dashy-config.json');

export async function GET() {
  try {
    const text = await readFile(CONFIG_PATH, 'utf-8');
    return NextResponse.json(JSON.parse(text) as DashyConfig);
  } catch {
    return NextResponse.json(DEFAULT_DASHY_CONFIG);
  }
}

export async function PUT(request: Request) {
  try {
    const body = (await request.json()) as DashyConfig;
    if (!body.sections || !Array.isArray(body.sections)) {
      return NextResponse.json({ error: "Missing 'sections' array" }, { status: 400 });
    }
    await writeFile(CONFIG_PATH, JSON.stringify(body, null, 2), 'utf-8');
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
