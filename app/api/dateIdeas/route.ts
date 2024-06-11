import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import { url } from 'inspector';

const uri = process.env.MONGODB_URI || '';
const client = new MongoClient(uri);


/**
 * This handler function extracts the 'userId' and 'dateIdeas' from the request payload, 
 * connects to the MongoDB database, inserts the ideas into the 'dateIdeas' collection, 
 * and returns a success or error response.
 */
export async function POST(request: Request) {
    const { userID, dateIdeas } = await request.json();

  try {
    await client.connect();
    const database = client.db('dateBuddyDB');
    const collection = database.collection('dateIdeas');

    await collection.insertOne({ userID, dateIdeas });

    return new Response('Idea saved successfully', { status: 201 });
  } catch (error) {
    console.log('Error saving idea:', error);
    return NextResponse.json({ error: 'Error saving idea' }, { status: 500 });
  } finally {
    await client.close();
  }
}

/**
 * This handler function extracts the userID from the query parameterse, 
 * connects to the MongoDB database, 
 * retrieves the ideas associated with the specified 'userID' from the 'dateIdeas' collection,
 * return the ideas as a JSON response.
 */
export async function Get(request: Request) {
    const {searchParams} = new URL(request.url);
    const userID = searchParams.get('userID');

    try {
        await client.connect();
        const dateBuddyDB = client.db('dateBuddyDB');
        const dateIdeas = dateBuddyDB.collection('dateIdeas');

        const ideas = await dateIdeas.find({userID}).toArray();
        return NextResponse.json(ideas, {status: 200});
    } catch (error) {
        console.error('Error retrieving ideas:', error);
        return NextResponse.json({ error: 'Error retrieving ideas' }, { status: 500 });
    } finally {
        await client.close();
    }
}

