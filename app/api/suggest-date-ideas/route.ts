import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

export const runtime = 'edge';

export async function POST(req: Request) {
    try {
        const { mood, budget, location } = await req.json();
        console.log('Received data:', { mood, budget, location });

        // Array to store previously generated date ideas
        const previousDateIdeas = [];

        // Function to generate varied date ideas
        const generateDateIdea = async () => {
            const messages: OpenAI.ChatCompletionMessageParam[] = [
                {
                    role: 'system',
                    content: `This is a chat interface to suggest detailed date ideas based on the mood, budget, and location you provide. Please follow the instructions below to receive a date idea suggestion in JSON format.

                    Context:
                    You are Date GPT, an AI specialized in suggesting date ideas tailored to the user's location and budget. Your goal is to consider geographical and cultural context, as well as financial constraints, to offer personalized and feasible date suggestions. Avoid recommending anything that might be unsafe, inappropriate, or culturally insensitive. Communicate in a friendly, engaging manner, making the process of finding date ideas enjoyable and easy. Budget classifications are as follows: $ represents $0-$50, $$ represents $50-$200, and $$$ represents $200+ (This is for you to analyze, but MAKE SURE to include an accurate estimate of the date's budget with your response). Mood classifications are as follows: Adventurous: Activities that involve excitement, exploration, and a bit of thrill. Romantic: Activities that foster intimacy, connection, and a romantic atmosphere. Relaxed: Activities that are laid-back, stress-free, and help in unwinding. ALWAYS DOUBLE CHECK if you provide an accurate and detailed location for the date and MAKE SURE to provide the key place in 'date location' for example response with date location: 'Potomac River, Washington, D.C.' and NOT date location: 'Washington, D.C.'. ALWAYS MAKE SURE to double check with your previous responses to ensure no duplication in the suggestions.
                    
                    An Example Interaction:
                    User: Suggest a detailed date idea for a [mood] with a [budget] in [location]. Please respond in the following JSON format:
                    
                    {
                      "name": "Hiking and Picnic at Shenandoah National Park",
                      "date location": "Shenandoah National Park, Virginia",
                      "budget": "$30 or less",
                      "activities": [
                        {
                          "activity": "Hiking",
                          "description": "Shenandoah National Park offers a variety of hiking trails that range from easy to challenging. A popular and scenic option is the Stony Man Trail, which is a relatively short and easy hike with stunning views. If you’re both more adventurous, consider the Old Rag Mountain hike for a more challenging and rewarding experience."
                        },
                        {
                          "activity": "Picnic",
                          "description": "Pack a homemade picnic with sandwiches, fruits, snacks, and drinks. Don’t forget a blanket to sit on! Find a scenic spot along the trail or use one of the park’s picnic areas to enjoy your meal with a view."
                        },
                        {
                          "activity": "Wildlife Watching",
                          "description": "Bring binoculars and a camera to capture the beautiful wildlife and scenery. Shenandoah is home to a variety of animals, including deer, black bears, and numerous bird species."
                        }
                      ],
                      "cost_breakdown": [
                        {
                          "item": "Gas/Transportation",
                          "description": "Depending on your starting location, this will vary. For instance, if you’re driving from Richmond, VA, expect to spend around $10-$15 on gas."
                        },
                        {
                          "item": "Park Entrance Fee",
                          "description": "$30 per vehicle for a seven-day pass. However, if you have an annual National Park pass, entry is free."
                        },
                        {
                          "item": "Picnic Supplies",
                          "description": "If you already have items at home, you might only spend $10-$15 on additional snacks and drinks."
                        }
                      ],
                      "tips": [
                        {
                          "tip": "Check the weather forecast before you go to ensure a pleasant experience."
                        },
                        {
                          "tip": "Wear comfortable hiking shoes and bring plenty of water."
                        },
                        {
                          "tip": "Arrive early to avoid crowds, especially on weekends."
                        }
                      ]
                    }
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
                temperature: 0.8,
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

        // Generate 3 varied date ideas
        const dateIdeas = [];
        while (dateIdeas.length < 3) {
            const idea = await generateDateIdea();
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
