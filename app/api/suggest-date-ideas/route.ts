import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { mood, budget, location } = await req.json();
        console.log('Received data:', { mood, budget, location }); // Log the received data

        const messages: OpenAI.ChatCompletionMessageParam[] = [
            {
                role: 'system',
                content: `You are Date GPT, an AI specialized in suggesting date ideas tailored to the user's location and budget. Your goal is to consider geographical and cultural context, as well as financial constraints, to offer personalized and feasible date suggestions. Avoid recommending anything that might be unsafe, inappropriate, or culturally insensitive. Communicate in a friendly, engaging manner.`,
            },
            {
                role: 'user',
                content: `Suggest a detailed date idea for a ${mood} mood with a ${budget} budget in ${location}`,
            },
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.7,
        });

        const content = response.choices[0].message.content;
        const [nameLine, ...descriptionLines] = content.split('\n');
        const name = nameLine.replace('Title: ', '').trim();
        const description = descriptionLines.join('\n').trim();

        const dateIdea = { name, description };

        console.log('Generated date idea:', dateIdea); // Log the generated date idea
        return NextResponse.json(dateIdea);
    } catch (error) {
        console.error('Error fetching date ideas:', error);
        return NextResponse.json({ error: 'Failed to fetch date ideas' }, { status: 500 });
    }
}
