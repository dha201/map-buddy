import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);

export async function POST(request: Request) {
    const { userId, dateIdeas } = await request.json();

    console.log('Received POST request!!');
    console.log('userId:', userId);
    console.log('Saving generated date ideas....');

    try {
        await client.connect();
        const database = client.db('dateBuddyDB');
        const collection = database.collection('dateIdeas');

        const existingUser = await collection.findOne({ userId });

        if (existingUser) {
            await collection.updateOne(
                { userId },
                { $addToSet: { dateIdeas: { $each: dateIdeas } } }
            );
            console.log('Updated existing user');
        } else {
            await collection.insertOne({ userId, dateIdeas });
            console.log('Inserted new user');
        }

        console.log('Idea saved successfully');
        return new Response('Idea saved successfully', { status: 201 });
    } catch (error) {
        console.error('Error saving idea:', error);
        return NextResponse.json({ error: 'Error saving idea' }, { status: 500 });
    } finally {
        await client.close();
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    console.log('Received GET request!!');
    console.log('userId:', userId);

    try {
        await client.connect();
        const dateBuddyDB = client.db('dateBuddyDB');
        const dateIdeas = dateBuddyDB.collection('dateIdeas');

        const ideas = await dateIdeas.find({ userId }).toArray();
        console.log('Retrieved ideas:', ideas);

        return NextResponse.json(ideas, { status: 200 });
    } catch (error) {
        console.error('Error retrieving ideas:', error);
        return NextResponse.json({ error: 'Error retrieving ideas' }, { status: 500 });
    } finally {
        await client.close();
    }
}
