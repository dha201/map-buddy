import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { placeName } = await request.json();
        console.log('Received place name:', placeName);

        if (!placeName) {
            return NextResponse.json({ error: 'Place name is required' }, { status: 400 });
        }

        const apiKey = process.env.GOOGLE_API_KEY;
        if (!apiKey) {
            return NextResponse.json({ error: 'Google API key is missing' }, { status: 500 });
        }

        const findPlaceUrl = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${encodeURIComponent(placeName)}&inputtype=textquery&fields=place_id&key=${apiKey}`;
        const findPlaceResponse = await fetch(findPlaceUrl);
        if (!findPlaceResponse.ok) {
            return NextResponse.json({ error: 'Error fetching place ID' }, { status: 500 });
        }

        const findPlaceData = await findPlaceResponse.json();
        if (!findPlaceData.candidates || findPlaceData.candidates.length === 0) {
            return NextResponse.json({ error: 'No place found' }, { status: 404 });
        }

        const placeId = findPlaceData.candidates[0].place_id;

        const placeDetailsUrl = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=photos,website&key=${apiKey}`;
        const placeDetailsResponse = await fetch(placeDetailsUrl);
        if (!placeDetailsResponse.ok) {
            return NextResponse.json({ error: 'Error fetching place details' }, { status: 500 });
        }

        const placeDetailsData = await placeDetailsResponse.json();
        if (!placeDetailsData.result.photos || placeDetailsData.result.photos.length === 0) {
            return NextResponse.json({ error: 'No photos available for this place' }, { status: 404 });
        }

        const photos = placeDetailsData.result.photos.map((photo: any) => {
            return `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo.photo_reference}&key=${apiKey}`;
        });

        const website = placeDetailsData.result.website || 'No website available';

        return NextResponse.json({ photos, website });

    } catch (error) {
        return NextResponse.json({ error: 'An error occurred while fetching place images' }, { status: 500 });
    }
}
