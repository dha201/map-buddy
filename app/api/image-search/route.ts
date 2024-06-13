import { NextResponse } from 'next/server';
import Scraper from 'images-scraper';
import fetch from 'node-fetch';
import { promisify } from 'util';
import { imageSize } from 'image-size';

const sizeOf = promisify(imageSize);

const google = new Scraper({
  puppeteer: {
    headless: true,
  } as any, //ignore type checking for headless due to incompatible types from an older version of puppeteer
});

export async function POST(request: Request) {
  try {
    const { query } = await request.json();
    console.log('Received query:', query);

    if (!query) {
      return NextResponse.json({ error: 'Place name is required' }, { status: 400 });
    }

    const results = await google.scrape(query, 10); // Adjust the number of images as needed

    // Filter images by dimensions of 400px or less
    const photos = [];
    for (const result of results) {
      try {
        const response = await fetch(result.url);
        const arrayBuffer = await response.arrayBuffer(); // read the response body as a binary buffer
        const buffer = Buffer.from(arrayBuffer); //convert the ArrayBuffer to a Buffer
        const dimensions = await sizeOf(buffer as unknown as string);

        if (dimensions && dimensions.width && dimensions.width <= 400) {
          photos.push(result.url);
        }
      } catch (error) {
        console.error('Error fetching image size:', error);
      }
    }

    return NextResponse.json({ photos });
  } catch (error) {
    console.error('Error fetching place images:', error);
    return NextResponse.json({ error: 'An error occurred while fetching place images' }, { status: 500 });
  }
}
