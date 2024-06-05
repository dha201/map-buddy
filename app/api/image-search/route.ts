// app/api/image-search/route.ts
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const API_KEY = process.env.GOOGLE_API_KEY as string;
const CSE_ID = process.env.GOOGLE_CSE_ID as string;

type SearchResult = {
  items: Array<{
    link: string;
    title: string;
  }>;
};

const googleImageSearch = async (query: string): Promise<SearchResult> => {
  const searchUrl = `https://www.googleapis.com/customsearch/v1?q=${query}&cx=${CSE_ID}&key=${API_KEY}&searchType=image`;
  const response = await axios.get(searchUrl);
  return response.data;
};

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name } = body;

  if (!name || typeof name !== 'string') {
    return NextResponse.json({ error: 'Invalid name provided' }, { status: 400 });
  }

  try {
    const results = await googleImageSearch(name);
    return NextResponse.json({ items: results.items });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({ status: 'ok' }, { status: 200 });
}
