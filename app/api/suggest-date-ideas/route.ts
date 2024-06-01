import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import puppeteer from 'puppeteer';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { mood, budget, location } = await req.json();
        console.log('Received data:', { mood, budget, location });

        // Array to store previously generated date ideas
        const previousDateIdeas: any[] = [];

        // Function to fetch real-time data using puppeteer
        const fetchRealTimeData = async () => {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('https://www.theknot.com/content/date-ideas');

            const data = await page.evaluate(() => {
                const results: { title: string; description: string }[] = [];
                const items = document.querySelectorAll('h3');
                items.forEach(item => {
                    const title = item.innerText;
                    const nextElement = item.nextElementSibling as HTMLElement;
                    const description = nextElement?.tagName === 'P' ? nextElement.innerText : '';
                    if (description) {
                        results.push({ title, description });
                    }
                });
                return results;
            });

            console.log('Scraped data:', data); 

            await browser.close();
            return data;
        };

        // Function to generate varied date ideas
        const generateDateIdea = async (realTimeData: any[], mood: string, budget: string, location: string) => {
            const realTimeDataFormatted = realTimeData.map(item => `
            - ${item.title}: ${item.description}`).join('\n');

            const messages: OpenAI.ChatCompletionMessageParam[] = [
                {
                    role: 'system',
                    content: `This is a chat interface to suggest detailed date ideas based on the mood, budget, and location you provide. Please follow the instructions below to receive a date idea suggestion in JSON format.

                    Context:
                    You are Date GPT, an AI specialized in suggesting date ideas tailored to the user's location and budget.
                    Your goal is to consider geographical and cultural context, as well as financial constraints, to offer personalized and feasible date suggestions.
                    Avoid recommending anything that might be unsafe, inappropriate, or culturally insensitive.
                    Communicate in a friendly, engaging manner, making the process of finding date ideas enjoyable and easy.
                    Budget classifications are as follows: $ represents $0-$50, $$ represents $50-$200, and $$$ represents $200+ (This is for you to analyze, but MAKE SURE to include an accurate estimate of the date's budget with your response).
                    Mood classifications are as follows: Adventurous: Activities that involve excitement, exploration, and a bit of thrill. 
                    Romantic: Activities that foster intimacy, connection, and a romantic atmosphere.
                    Relaxed: Activities that are laid-back, stress-free, and help in unwinding. 
                    ALWAYS DOUBLE CHECK if you provide an accurate and detailed location for the date and MAKE SURE to provide the key place in 'date location' for example response with date location: 'Potomac River, Washington, D.C.' and NOT date location: 'Washington, D.C.'.
                    ALWAYS MAKE SURE to double check with your previous responses to ensure no duplication in the suggestions.

                    Here are some real-time date ideas from a popular website:
                    ${realTimeDataFormatted}
                `},
                {
                    role: 'user',
                    content: `Suggest a detailed date idea for a ${mood} mood with a ${budget} budget in ${location}. Please respond in the following JSON format:

                    {
                      "name": "Name of the date idea",
                      "date location": "name of the place, Location of the date",
                      "budget": "Estimated budget for the date",
                      "activities": [
                        {
                          "activity": "Activity 1",
                          "description": "Description of Activity 1"
                        },
                        {
                          "activity": "Activity 2",
                          "description": "Description of Activity 2"
                        },
                        {
                          "activity": "Activity 3",
                          "description": "Description of Activity 3"
                        }
                      ],
                      "cost_breakdown": [
                        {
                          "item": "Cost Breakdown Item 1",
                          "description": "Description of Cost Breakdown Item 1"
                        },
                        {
                          "item": "Cost Breakdown Item 2",
                          "description": "Description of Cost Breakdown Item 2"
                        },
                        {
                          "item": "Cost Breakdown Item 3",
                          "description": "Description of Cost Breakdown Item 3"
                        }
                      ],
                      "tips": [
                        {
                          "tip": "Tip 1"
                        },
                        {
                          "tip": "Tip 2"
                        },
                        {
                          "tip": "Tip 3"
                        }
                      ]
                    }`,
                },
            ];

            const response = await openai.chat.completions.create({
                model: 'gpt-4o',
                messages: messages,
                temperature: 0.2,
            });

            let rawContent = response.choices[0].message.content;

            rawContent = rawContent.replace(/\\n/g, ' ').replace(/\n/g, ' ').replace(/\\'/g, "'");

            const jsonString = rawContent.match(/{[\s\S]*}/);
            if (!jsonString) {
                throw new Error('Failed to extract JSON from response');
            }

            const dateIdea = JSON.parse(jsonString[0]);
            console.log('Generated date idea:', dateIdea);
            return dateIdea;
        };

        // Fetch real-time data
        const realTimeData = await fetchRealTimeData();

        // Generate 3 varied date ideas
        const dateIdeas = [];
        while (dateIdeas.length < 3) {
            const idea = await generateDateIdea(realTimeData, mood, budget, location);
            const isDuplicate = previousDateIdeas.some(prevIdea => prevIdea.name === idea.name && prevIdea['date location'] === idea['date location']);
            if (!isDuplicate) {
                dateIdeas.push(idea);
                previousDateIdeas.push(idea);
            }
        }

        return NextResponse.json(dateIdeas);

    } catch (error) {
        console.error('Error fetching date ideas:', error);
        return NextResponse.json({ error: 'Failed to fetch date ideas' }, { status: 500 });
    }
}
