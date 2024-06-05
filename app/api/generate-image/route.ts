import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export async function POST(req: Request) {
  const { prompt, width = '512', height = '512', image_generator_version = 'standard', negative_prompt = '' } = await req.json();

  try {
    if (!prompt) {
      throw new Error('Prompt is required');
    }

    const apiKey = process.env.DEEP_AI_API_KEY;
    if (!apiKey) {
      throw new Error('DeepAI API key is missing');
    }

    console.log('Sending request to DeepAI with prompt:', prompt);

    const formData = new URLSearchParams();
    formData.append('text', prompt);
    formData.append('width', width);
    formData.append('height', height);
    formData.append('image_generator_version', image_generator_version);
    if (negative_prompt) {
      formData.append('negative_prompt', negative_prompt);
    }

    const response = await fetch('https://api.deepai.org/api/text2img', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'api-key': apiKey,
      },
      body: formData.toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error from DeepAI: ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error generating image:', error);

    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ error: 'Failed to generate image', details: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'Failed to generate image', details: 'Unknown error' }, { status: 500 });
    }
  }
}

export function OPTIONS() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
