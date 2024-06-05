import { NextResponse } from 'next/server';
import OpenAI from 'openai';


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});


export async function POST(req: Request) {
    try {
        const { mood, budget, location, specialNote } = await req.json();
        console.log('Received data:', { mood, budget, location, specialNote });

        // Array to store previously generated date ideas
        const previousDateIdeas: any[] = [];

        // Function to generate varied date ideas
        const generateDateIdea = async (mood: string, budget: string, location: string, specialNote: string) => {

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
                    If the date is at home, AlWAYS include 'At Home, [city]' and DO NOT response with 'Home', 'home', 'Your Home' . Otherwise, ALWAYS DOUBLE CHECK if you provide an accurate and detailed location for the date and MAKE SURE to provide the key place in 'date location' for example response with date location: 'Potomac River, Washington, D.C.' and NOT date location: 'Washington, D.C.'.
                    ALWAYS MAKE SURE to double check with your previous responses to ensure no duplication in the suggestions.
                    
                    Instructions:
                    Provide a detailed date idea suggestion based on the mood, budget, and location. Use the list of date ideas below for inspiration but you do not have to:
                    (Note: this list is not exhaustive and you can come up with your own creative ideas!)

                    Adventurous/Fun Date Ideas
                      Go Bowling - Have a fun time at the bowling alley.
                      Visit a Museum - Explore a local museum and learn something new.
                      Go to a Comedy Show - Enjoy a night of laughter at a comedy club.
                      Take a Dance Class - Learn some new dance moves together.
                      Go Mini Golfing - Have a playful competition at mini-golf.
                      Go to a Concert - Enjoy live music from your favorite band or artist.
                      Go to a Fair or Carnival - Have fun with rides, games, and fair food.
                      Attend a Sporting Event - Cheer for your favorite team at a live game.
                      Go to a Local Festival - Experience local culture and festivities.
                      Visit an Aquarium - Explore the underwater world at an aquarium.
                     
                    Cheap Date Ideas
                      Go for a Hike - Spend time outdoors on a scenic hike.
                      Have a Picnic - Pack a lunch and enjoy a meal outside.
                      Visit a Farmers Market - Explore a local farmers market and try fresh produce.
                      Go to the Beach - Relax and have fun at the beach.
                      Take a Bike Ride - Enjoy a bike ride through your neighborhood or park.
                      Stargaze - Spend the night looking at the stars.
                      Visit a Park - Take a walk or have a picnic in a local park.
                      Go to a Free Event - Look for free events in your area.
                      Volunteer Together - Spend time helping others and volunteering.
                      Go to a Library - Explore books and resources at a local library.
                      
                    Creative Date Ideas
                      Take a Pottery Class - Create something unique with a pottery class.
                      Paint Together - Have a fun time painting or doing an art project.
                      Write a Story Together - Collaborate on writing a short story.
                      Make a Playlist - Curate a playlist of your favorite songs.
                      Do a Photo Shoot - Have fun taking pictures together.
                      Attend a Workshop - Learn a new skill at a workshop or class.
                      Build Something - Work on a DIY project together.
                      Create a Time Capsule - Make a time capsule to open in the future.
                      Have a Themed Night - Plan a night around a specific theme.
                      Do a Science Experiment - Have fun with a simple science experiment at home.
                      
                    At-Home Date Ideas
                      Have a Backyard Campout - Set up a tent and camp out in the backyard.
                      Make Homemade Pizza - Spend the night making and baking pizzas.
                      Do a Home Improvement Project - Work on improving something in your home.
                      Create a DIY Craft - Make something creative together.
                      Make a Vision Board - Create vision boards for your goals and dreams.
                      Have a Karaoke Night - Sing your favorite songs with a karaoke session.
                      Do a Workout Together - Exercise together with a workout video.
                      Have a Game Night - Play video games or board games together.
                      Try a Virtual Experience - Explore a virtual museum or take a virtual tour.
                      Cook Together - Spend the night making a meal from scratch.
                      Plan a Wine Tasting Night - Have a cozy evening with your favorite wines.
                      Have a Spa Night - Set up a spa night with massages and relaxation.
                      Play a Board Game - Have fun with classic board games or try a new one.
                      Create a Scrapbook - Put together a scrapbook of your favorite memories.
                      Host a Movie Marathon - Watch a series of your favorite movies.
                      Do a Puzzle Together - Work together on a challenging puzzle.
                      Try a New Recipe - Experiment with cooking a new dish.
                      Read Together - Enjoy reading a book or articles together.
                      Write Each Other Letters - Write love letters to each other and read them aloud.
                `},
                {
                    role: 'user',
                    content: `Suggest a detailed date idea for a ${mood} mood with a ${budget} budget in ${location} and make sure to focus on ${specialNote}. Respond in the following JSON format:

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
                temperature: 0.5,
            });

            let rawContent = response.choices[0].message.content;

            if (rawContent !== null) {
              rawContent = rawContent.replace(/\\n/g, ' ').replace(/\n/g, ' ').replace(/\\'/g, "'");

              const jsonString = rawContent.match(/{[\s\S]*}/);
              if (!jsonString) {
                  throw new Error('Failed to extract JSON from response');
              }

              const dateIdea = JSON.parse(jsonString[0]);
              console.log('Generated date idea:', dateIdea);
              return dateIdea;
            }

        };

        // Generate 3 varied date ideas
        const isSimilarDateIdea = async (name1: string, name2: string): Promise<boolean> => {
          const messages: OpenAI.ChatCompletionMessageParam[] = [
            {
              role: 'user',
              content: `Are the following date ideas similar? \n1. ${name1} \n2. ${name2} \nAnswer with "true" or "false".`,
            },
          ];
        
          const response = await openai.chat.completions.create({
            model: 'gpt-4o', // Use the appropriate model
            messages: messages,
            max_tokens: 5,
            n: 1,
            stop: null,
            temperature: 0.5,
          });
        
          const messageContent = response.choices[0].message.content;
        
          if (messageContent === null) {
            throw new Error('Received null content from OpenAI API');
          }
        
          const answer = messageContent.trim().toLowerCase();
          return answer === 'true';
        };
        
      
      const dateIdeas = [];
      while (dateIdeas.length < 3) {
        const idea = await generateDateIdea(mood, budget, location, specialNote);
      
        // Extract the first part of the date location before the comma
        const locationName = idea['date location'].split(',')[0].trim();
      
        // Check for duplicates based on the first part of 'date location' and 'name'
        const isDuplicate = previousDateIdeas.some(prevIdea => {
          const prevLocationName = prevIdea['date location'].split(',')[0].trim();
          return prevLocationName === locationName && prevIdea['name'] === idea['name'];
        });
      
        let isSimilar = false;
        if (idea['date location'] === 'At Home') {
          for (const prevIdea of previousDateIdeas) {
            if (prevIdea['date location'] === 'At Home') {
              isSimilar = await isSimilarDateIdea(prevIdea['name'], idea['name']);
              if (isSimilar) break;
            }
          }
        }
      
        if (idea['date location'] !== 'At Home' && !isDuplicate) {
          dateIdeas.push(idea);
          previousDateIdeas.push(idea);
        } else if (idea['date location'] === 'At Home' && !isSimilar) {
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
