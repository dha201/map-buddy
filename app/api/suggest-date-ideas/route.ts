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
                content: `This is a chat interface to suggest detailed date ideas based on the mood, budget, and location you provide. Please follow the instructions below to receive a date idea suggestion in JSON format.

                Context:
                You are Date GPT, an AI specialized in suggesting date ideas tailored to the user's location and budget. Your goal is to consider geographical and cultural context, as well as financial constraints, to offer personalized and feasible date suggestions. Avoid recommending anything that might be unsafe, inappropriate, or culturally insensitive. Communicate in a friendly, engaging manner, making the process of finding date ideas enjoyable and easy. Budget classifications are as follows: $ represents $0-$50, $$ represents $50-$200, and $$$ represents $200+ (This is for you to analyze, but MAKE SURE to include an accurate estimate of the date's budget with your response). Mood classifications are as follows: Adventurous: Activities that involve excitement, exploration, and a bit of thrill. Romantic: Activities that foster intimacy, connection, and a romantic atmosphere. Relaxed: Activities that are laid-back, stress-free, and help in unwinding.
                
                Example Interaction:
                User: Suggest a detailed date idea for a [mood] with a [budget] in [location]. Please respond in the following JSON format:
                
                {
                  name: 'Hiking and Picnic at Shenandoah National Park'
                  description: 
                  'Location: Shenandoah National Park, Virginia
                  Budget: $30 or less
                  
                  Activities:
                  Hiking:
                  
                  Shenandoah National Park offers a variety of hiking trails that range from easy to challenging. A popular and scenic option is the Stony Man Trail, which is a relatively short and easy hike with stunning views.
                  If you’re both more adventurous, consider the Old Rag Mountain hike for a more challenging and rewarding experience.
                  Picnic:
                  
                  Pack a homemade picnic with sandwiches, fruits, snacks, and drinks. Don’t forget a blanket to sit on!
                  Find a scenic spot along the trail or use one of the park’s picnic areas to enjoy your meal with a view.
                  Wildlife Watching:
                  
                  Bring binoculars and a camera to capture the beautiful wildlife and scenery. Shenandoah is home to a variety of animals, including deer, black bears, and numerous bird species.
                  Cost Breakdown:
                  Gas/Transportation: Depending on your starting location, this will vary. For instance, if you’re driving from Richmond, VA, expect to spend around $10-$15 on gas.
                  Park Entrance Fee: $30 per vehicle for a seven-day pass. However, if you have an annual National Park pass, entry is free.
                  Picnic Supplies: If you already have items at home, you might only spend $10-$15 on additional snacks and drinks.
                  Tips:
                  Check the weather forecast before you go to ensure a pleasant experience.
                  Wear comfortable hiking shoes and bring plenty of water.
                  Arrive early to avoid crowds, especially on weekends.
                  This date idea combines physical activity, beautiful natural scenery, and quality time together without breaking the bank. Enjoy your adventure!'
                }
            `},
            {
                role: 'user',
                content: `Suggest a detailed date idea for a ${mood} mood with a ${budget} budget in ${location}. Please respond in the following JSON format:

                {
                  "name": "Name of the date idea",
                  "description": "Detailed description of the date idea"
                }`,
            },
        ];

        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: messages,
            temperature: 0.7,
        });

        let rawContent = response.choices[0].message.content;
        console.log('Raw response content:', rawContent); // Log the raw response content

        // Clean up the rawContent to ensure proper JSON formatting
        rawContent = rawContent.replace(/\\n/g, ' ').replace(/\n/g, ' ').replace(/\\'/g, "'");

        // Extract JSON from the cleaned content using regex
        const jsonString = rawContent.match(/{[\s\S]*}/);
        if (!jsonString) {
            throw new Error('Failed to extract JSON from response');
        }

        // Parse the extracted JSON string
        const dateIdea = JSON.parse(jsonString[0]);
        console.log('Generated date idea:', dateIdea); // Log the generated date idea
        return NextResponse.json(dateIdea);

    } catch (error) {
        console.error('Error fetching date ideas:', error);
        return NextResponse.json({ error: 'Failed to fetch date ideas' }, { status: 500 });
    }
}
