import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || '',
});

const dateIdeasJSON: Record<string, string[]> = {
  "Adventurous": [
    "Go Bowling - Have a fun time at the bowling alley.",
    "Visit a Museum - Explore a local museum and learn something new.",
    "Go to a Comedy Show - Enjoy a night of laughter at a comedy club.",
    "Take a Dance Class - Learn some new dance moves together.",
    "Go Mini Golfing - Have a playful competition at mini-golf.",
    "Go to a Concert - Enjoy live music from your favorite band or artist.",
    "Go to a Fair or Carnival - Have fun with rides, games, and fair food.",
    "Attend a Sporting Event - Cheer for your favorite team at a live game.",
    "Go to a Local Festival - Experience local culture and festivities.",
    "Visit an Aquarium - Explore the underwater world at an aquarium.",
    "Go for a Hike - Spend time outdoors on a scenic hike.",
    "Have a Picnic - Pack a lunch and enjoy a meal outside.",
    "Go to the Beach - Relax and have fun at the beach.",
    "Take a Bike Ride - Enjoy a bike ride through your neighborhood or park.",
    "Stargaze - Spend the night looking at the stars.",
    "Visit a Park - Take a walk or have a picnic in a local park.",
    "Go to a Free Event - Look for free events in your area.",
    "Plan a Slow Food Picnic - Spend quality time together preparing and grazing on good, clean, locally sourced foods.",
    "Be Adventurous - Try biking, hiking on a trail or kayaking; enjoy an afternoon in nature.",
    "Sing Karaoke - Pick a few favorite duet karaoke songs and enjoy.",
    "Go Dancing - Choose a spot that plays your favorite tunes or try something new and different.",
    "Take a Pottery-Making Class - This DIY activity can be romantic too. Get creative with a DIY pottery kit at home instead.",
    "Visit an Amusement Park - Share the adrenaline rush of a roller-coaster ride or walk through a funhouse.",
    "Drive a Go Kart - Test your driving skills and create some friendly competition with a spin around a go-kart race track.",
    "Try Axe Throwing - Put your axe-throwing skills to the test and consider joining a league together.",
    "Play Mini-Golf - Navigate your way around the holes at a mini-golf course.",
    "Go Shopping - Browse through vintage shops, buy vinyl on Record Store Day, and explore art galleries or specialty shops.",
    "Do Sunday Brunch - A brunch date is always a good idea, and a brunch double date is twice as fun.",
    "Tailgate - Mingle with your fellow football fans.",
    "Visit Your Local Farmer's Market - Pick up fresh produce to cook a delicious meal together.",
    "Visit the Zoo or Aquarium - Marvel at the exhibits and learn about your favorite animals together.",
    "Rent a Convertible - The perfect spring date idea, go cruising through scenic parkways and rural back roads to celebrate the change in season.",
    "Go Horseback Riding - Ride off into the sunset together on horseback.",
    "Take a Road Trip - Plan a road trip together and explore new places.",
    "Hop on the Alphabet Date Idea Trend - Add some order to your date night planning by working your way through alphabet date ideas.",
    "Go to an Arcade - Love the nostalgia of old-school arcade games, or, an immersive virtual reality video game experience? There are lots of options to try.",

  ],
  "Creative": [
    "Take a Pottery Class - Create something unique with a pottery class.",
    "Paint Together - Have a fun time painting or doing an art project.",
    "Write a Story Together - Collaborate on writing a short story.",
    "Make a Playlist - Curate a playlist of your favorite songs.",
    "Do a Photo Shoot - Have fun taking pictures together.",
    "Attend a Workshop - Learn a new skill at a workshop or class.",
    "Build Something - Work on a DIY project together.",
    "Create a Time Capsule - Make a time capsule to open in the future.",
    "Have a Themed Night - Plan a night around a specific theme.",
  ],
  "At-Home": [
    "Do a Science Experiment - Have fun with a simple science experiment at home.",
    "Take an Aerial Yoga Class - Not your typical yoga class, but an anti-gravity one where you'll be suspended in air.",
    "Learn to Trapeze - Swinging your partner through the air is the ultimate thrilling couple experience.",
    "Try Indoor Bouldering - Clambering about a rock climbing gym is a great way to work together and break a sweat.",
    "Take a Cooking Class - This is another date night idea with lots of options and the chance to try cooking a new cuisine. You could even sign up for a meal subscription like Blue Apron, so you can make delicious, chef-designed recipes at home with fresh, pre-measured ingredients.",
    "Escape Room - Enjoy the rush of entering the unknown and working together to solve a riddle.",
    "Murder Mystery Night - Also intriguing, solving a crime at a Murder Mystery event. If you haven't tried one before, you're in for an experience. At-home murder mystery games are a fun alternative to going out that'll give you and your partner hours of fun sleuthing.",
    "Indoor Beach Volleyball - If it's miserable outside, get those summer vibes with an afternoon playing indoor volleyball.",
    "Have an Indoor Picnic - Sprawl out on the living room floor and graze on picnic-style food and drink.",
    "Read Spooky Stories - Set the scene with a roaring fire and cozy blanket.",
    "Binge on a TV Series - If you've fallen into the trap of using your screen time to each of you watching different TV shows, schedule a Netflix and chill night to binge on a show together or watch a movie —choose one with a relationship theme that you can discuss afterward, as Boykin suggests.",
    "Rearrange your Living Room - Switch up your living space for a change of scenery. It doesn't have to be permanent. Make it a temporary change for a coffee table dinner date or a comfy pillow crash pad in front of the fireplace or TV.",
    "Research your Family History - Share what you know about your family history. Take it a step further and do a DNA test with a service like Ancestry.com.",
    "Create a Video - Edit together old video clips on your phone using an app like Splice or shoot some new footage of something fun—a funny pet, party tricks, a dance routine.",
    "Make a Slideshow - Prefer stills to video? Go through your old photos to create a slideshow that documents your relationship, a trip or a joint project.",
    "Make a TikTok - Get creative making a TikTok video. Who knows, it may even go viral.",
    "Have a Backyard Campout - Set up a tent and camp out in the backyard.",
    "Make Homemade Pizza - Spend the night making and baking pizzas.",
    "Do a Home Improvement Project - Work on improving something in your home.",
    "Create a DIY Craft - Make something creative together.",
    "Make a Vision Board - Create vision boards for your goals and dreams.",
    "Have a Karaoke Night - Sing your favorite songs with a karaoke session.",
    "Do a Workout Together - Exercise together with a workout video.",
    "Have a Game Night - Play video games or board games together.",
    "Try a Virtual Experience - Explore a virtual museum or take a virtual tour.",
    "Cook Together - Spend the night making a meal from scratch.",
    "Plan a Wine Tasting Night - Have a cozy evening with your favorite wines.",
    "Have a Spa Night - Set up a spa night with massages and relaxation.",
    "Play a Board Game - Have fun with classic board games or try a new one.",
    "Create a Scrapbook - Put together a scrapbook of your favorite memories.",
    "Host a Movie Marathon - Watch a series of your favorite movies.",
    "Do a Puzzle Together - Work together on a challenging puzzle.",
    "Try a New Recipe - Experiment with cooking a new dish.",
    "Read Together - Enjoy reading a book or articles together.",
    "Write Each Other Letters - Write love letters to each other and read them aloud."
  ],
  "Romantic": [
    "Plan a Date Night Surprise - It can be having a simple candlelit dinner waiting when they get home, but the fact that it's a surprise will make it special.",
    "Plant a Garden - Whether it's an herb garden, cacti or mini fruit trees, this is a fun, sweet activity that can be as labor-intensive or simple as you want it to be.",
    "Go to a Drive-In Movie - Kick it old school and catch the latest movie release at a drive-in theater. Watch it from the comfort and privacy of your front seat or back seat;). Or for a classier vibe, go to the oldest movie theatre in town and take in the ambiance, as well as the show.",
    "Order a Subscription Box - We love the idea of signing up for one of these cute date night subscription boxes.",
    "Go Apple Picking - Head to the countryside for a stroll through an apple orchard. Bring home some apples to make a pie.",
    "Make it a Double Date - Plan a double date with your BFFs. 'Research shows that double dating can be good for your relationship because it often sparks deeper and more meaningful conversation than when we go out alone.' Boykin says.",
    "Dinner Date Night - Have dinner at a quiet, quaint romantic restaurant or make something at home, paired with a good bottle of wine. Make it extra special and dress up, even if you're dining in.",
    "See a Comedy Show - The couple that laughs together, stays together. 'Laughter is the fiber of intimacy,' Greer says. 'Laughing together helps people bond.'",
    "Book a Spa Day - Put a focus on self-care and wellness by booking a couple's massage, manis, pedis and other treatments. Spoil yourselves to some time at a spa or invite a Soothe professional to give you a treatment at home.",
    "Get a Couple Tattoo - Seal the deal and proclaim your love to one another with some permanent ink. The design can be a subtle nod to your relationship or a more obvious declaration of love. It's up to you.",
    "Plan a Weekend Away - Plan a ski trip, a stay at a cozy cabin, or a quick getaway to a nearby city. A change of scenery is a great way to recharge your relationship.",
    "Take a Wine Tasting Tour - This is a great date for wine enthusiasts or newbies interested in learning a little more about wine. Head to a wine region to tour some wineries or keep it close to home and visit some local wine bars in your area.",
    "Rent a Rowboat - Recreate a romantic scene from The Notebook and paddle around a pond or river for the afternoon. Surprise your partner by reciting some passages of poetry.",
    "See a Band - Have a night out listening to a local band that plays covers of your favorite artist or a band you saw together early in your relationship.",
    "Relive your First Date - Go back to the restaurant or coffee shop where you had your first date. Before you go home, consider re-creating your first kiss too.",
    "Relive the Wedding, if You're Married - A double date with your maid of honor and best man or another favorite couple can be a really great way to share your love and memories.",
    "Plan a Staycation - Spend 24/7 time together with a staycation. Stay in a swank hotel, get drinks at the hottest new bar, see a show and have fun!",
    "Start a New Tradition - Whether it's taking a selfie each year to add to your wedding album or reading your wedding guest book, make it an annual tradition.",
    "Book a Helicopter Ride - Plan an OTT date for a special anniversary date experience—booking sites like Viator can help. Score bonus points by planning a stop along the way on a mountaintop or another remote location for a private moment together.",
    "Go Stargazing - Escape the city on a clear evening and seek out a good dark viewing point of the night sky.",
    "Ride a Motorcycle - The added level of physical closeness and trust involved when riding a motorcycle or scooter can turn a casual afternoon into a very romantic experience without much effort.",
    "Celebrate an Anniversary - Go beyond wedding anniversaries to celebrate other sentimental moments like the anniversary of the day you met, moved in together, got engaged, etc. That way you'll have multiple milestones to inspire extra romantic anniversary date nights."
  ],
};

export async function POST(req: Request) {

    try {
        const { mood, budget, location, specialNote, userId } = await req.json();
        console.log('Received data:', { mood, budget, location, specialNote, userId });

        const previousDateIdeas: any[] = [];

        const systemMessages = [
            `This is a chat interface to suggest detailed date ideas based on the mood, budget, and location you provide. Please follow the instructions below to receive a date idea suggestion in JSON format.

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

            If the Idea is within the list below. 
              "At-Home": [
                "Have a Backyard Campout - Set up a tent and camp out in the backyard.",
                "Make Homemade Pizza - Spend the night making and baking pizzas.",
                "Do a Home Improvement Project - Work on improving something in your home.",
                "Create a DIY Craft - Make something creative together.",
                "Make a Vision Board - Create vision boards for your goals and dreams.",
                "Have a Karaoke Night - Sing your favorite songs with a karaoke session.",
                "Do a Workout Together - Exercise together with a workout video.",
                "Have a Game Night - Play video games or board games together.",
                "Try a Virtual Experience - Explore a virtual museum or take a virtual tour.",
                "Cook Together - Spend the night making a meal from scratch.",
                "Plan a Wine Tasting Night - Have a cozy evening with your favorite wines.",
                "Have a Spa Night - Set up a spa night with massages and relaxation.",
                "Play a Board Game - Have fun with classic board games or try a new one.",
                "Create a Scrapbook - Put together a scrapbook of your favorite memories.",
                "Host a Movie Marathon - Watch a series of your favorite movies.",
                "Do a Puzzle Together - Work together on a challenging puzzle.",
                "Try a New Recipe - Experiment with cooking a new dish.",
                "Read Together - Enjoy reading a book or articles together.",
                "Write Each Other Letters - Write love letters to each other and read them aloud.",
                "Have a Backyard Campout - Set up a tent and camp out in the backyard.",
              ]
              NEVER NEVER NEVER include anything related to 'Living room' or 'Backyard' or 'Kitchen' in the 'date location' field. ONLY include 'At Home' in the 'date location' along with the city name.
              And ALWAYS include at home in the 'name' field along with the date idea name. For example, "name": "At Home, Have a Backyard Campout".
              `
        ];

        const generateDateIdea = async (randomIdea: string, budget: string, location: string, specialNote: string) => {
            const selectedSystemMessage = systemMessages[Math.floor(Math.random() * systemMessages.length)];
            const messages: OpenAI.ChatCompletionMessageParam[] = [
                {
                    role: 'system',
                    content: selectedSystemMessage
                },
                {
                    role: 'user',
                    content: `Suggest a detailed date idea for a ${randomIdea} mood with a ${budget} budget in ${location} and make sure to focus on ${specialNote}. Respond in the following JSON format:

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
                    }
                    
                    If the Idea is within the list below. 
                      "At-Home": [
                        "Have a Backyard Campout - Set up a tent and camp out in the backyard.",
                        "Make Homemade Pizza - Spend the night making and baking pizzas.",
                        "Do a Home Improvement Project - Work on improving something in your home.",
                        "Create a DIY Craft - Make something creative together.",
                        "Make a Vision Board - Create vision boards for your goals and dreams.",
                        "Have a Karaoke Night - Sing your favorite songs with a karaoke session.",
                        "Do a Workout Together - Exercise together with a workout video.",
                        "Have a Game Night - Play video games or board games together.",
                        "Try a Virtual Experience - Explore a virtual museum or take a virtual tour.",
                        "Cook Together - Spend the night making a meal from scratch.",
                        "Plan a Wine Tasting Night - Have a cozy evening with your favorite wines.",
                        "Have a Spa Night - Set up a spa night with massages and relaxation.",
                        "Play a Board Game - Have fun with classic board games or try a new one.",
                        "Create a Scrapbook - Put together a scrapbook of your favorite memories.",
                        "Host a Movie Marathon - Watch a series of your favorite movies.",
                        "Do a Puzzle Together - Work together on a challenging puzzle.",
                        "Try a New Recipe - Experiment with cooking a new dish.",
                        "Read Together - Enjoy reading a book or articles together.",
                        "Write Each Other Letters - Write love letters to each other and read them aloud.",
                        "Have a Backyard Campout - Set up a tent and camp out in the backyard.",
                      ]
                      NEVER NEVER NEVER include anything related to 'Living room' or 'Backyard' or 'Kitchen' in the 'date location' field. ONLY include 'At Home' in the 'date location' along with the city name.
                      And ALWAYS include at home in the 'name' field along with the date idea name. For example, "name": "At Home, Have a Backyard Campout".

                      `
                },
            ];

            const response = await openai.chat.completions.create({
                model: 'gpt-3.5-turbo-0125',
                messages: messages,
                temperature: 0.7,
            });

            let rawContent = response.choices[0].message.content;

            if (rawContent !== null) {
              rawContent = rawContent.replace(/\\n/g, ' ').replace(/\n/g, ' ').replace(/\\'/g, "'");

              const jsonString = rawContent.match(/{[\s\S]*}/);
              if (!jsonString) {
                  throw new Error('Failed to extract JSON from response');
              }

              const dateIdea = JSON.parse(jsonString[0]);
              return dateIdea;
            }

        };

        const isSimilarDateIdea = async (name1: string, name2: string): Promise<boolean> => {
          const messages: OpenAI.ChatCompletionMessageParam[] = [
            {
              role: 'user',
              content: `Are the following date ideas similar? \n1. ${name1} \n2. ${name2} \nAnswer with "true" or "false".`,
            },
          ];
        
          const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages: messages,
            max_tokens: 5,
            n: 1,
            stop: null,
            temperature: 1,
          });
        
          const messageContent = response.choices[0].message.content;
        
          if (messageContent === null) {
            throw new Error('Received null content from OpenAI API');
          }
        
          const answer = messageContent.trim().toLowerCase();
          return answer === 'true';
        };

        const dateIdeas = [];
        while (dateIdeas.length < 6) {
            const selectedIdeas = dateIdeasJSON[mood] || [];
            const randomIdea = selectedIdeas[Math.floor(Math.random() * selectedIdeas.length)];

            const idea = await generateDateIdea(randomIdea, budget, location, specialNote);
            const locationName = idea['date location'].split(',')[0].trim();

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
