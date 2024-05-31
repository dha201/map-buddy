// /app/api/get-place-images/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { placeName } = await request.json();

        if (!placeName) {
            return NextResponse.json({ error: 'Place name is required' }, { status: 400 });
        }

        const apiKey = process.env.GOOGLE_API_KEY;

        // 1. Find Place Request to get place_id
        const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
        const findPlaceResponse = await fetch(findPlaceUrl);
        const findPlaceData = await findPlaceResponse.json();

        if (!findPlaceData.candidates || findPlaceData.candidates.length === 0) {
            return NextResponse.json({ error: 'No place found' }, { status: 404 });
        }

        const placeId = findPlaceData.candidates[0].place_id;

        // 2. Place Details Request to get photo references
        const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos&key=${apiKey}`;
        const placeDetailsResponse = await fetch(placeDetailsUrl);
        const placeDetailsData = await placeDetailsResponse.json();

        if (!placeDetailsData.result.photos || placeDetailsData.result.photos.length === 0) {
            return NextResponse.json({ error: 'No photos available for this place' }, { status: 404 });
        }

        const photoReference = placeDetailsData.result.photos[0].photo_reference;

        // 3. Place Photo Request to get the actual photo URL
        const photoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoReference}&key=${apiKey}`;

        return NextResponse.json({ photoUrl });
    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching place images' }, { status: 500 });
    }
}
