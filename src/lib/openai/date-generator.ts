import { openai } from "./client";
import { userProfile } from "../user-profile";

/**
 * Generate contextually relevant date night activities using OpenAI
 * 
 * @param count - Number of activities to generate (default: 20)
 * @returns Array of date night activity strings
 */
export async function generateDateActivities(
  count: number = 20
): Promise<string[]> {
  try {
    const prompt = `You are a creative date planner for a ${userProfile.demographics.age}-year-old ${userProfile.demographics.identity} living in the ${userProfile.demographics.location}.

Her interests include:
- Music: ${userProfile.interests.music.join(", ")}
- Beverages: ${userProfile.interests.beverages.join(", ")}
- Activities: ${userProfile.interests.activities.join(", ")}

Favorite places: ${userProfile.favoritePlaces.join(", ")}

Generate ${count} diverse, specific, and exciting date night activities that would appeal to her. Each activity should:
1. Be specific to the DMV area (mention actual venues, neighborhoods, or locations when possible)
2. Reflect her cultural background and interests
3. Be age-appropriate and fun for a 23-year-old
4. Vary in type (some chill, some active, some cultural, some nightlife)
5. Be short phrases starting with a verb (like "hitting up...", "catching...", "doing...", "grabbing...")

Format each activity as a short, casual phrase (max 6-8 words). Return ONLY a JSON array of strings, nothing else.

Example format: ["hitting up Glenstone Museum", "catching jazz at Bohemian Caverns", "doing sip and paint in Adams Morgan"]`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that generates creative date ideas. You only respond with valid JSON arrays.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 1.0, // High creativity
      max_tokens: 1000,
      response_format: { type: "json_object" },
    });

    const responseContent = completion.choices[0]?.message?.content;
    if (!responseContent) {
      throw new Error("No response from OpenAI");
    }

    // Parse the JSON response
    const parsed = JSON.parse(responseContent);
    
    // Handle different possible response formats
    let activities: string[] = [];
    if (Array.isArray(parsed)) {
      activities = parsed;
    } else if (parsed.activities && Array.isArray(parsed.activities)) {
      activities = parsed.activities;
    } else if (parsed.dates && Array.isArray(parsed.dates)) {
      activities = parsed.dates;
    } else {
      // If we get an object, try to extract the first array we find
      const firstArray = Object.values(parsed).find(Array.isArray);
      if (firstArray) {
        activities = firstArray as string[];
      }
    }

    if (activities.length === 0) {
      throw new Error("No activities found in response");
    }

    // Ensure we have the requested count
    return activities.slice(0, count);
  } catch (error) {
    console.error("Error generating date activities:", error);
    
    // Fallback activities if AI generation fails
    return [
      "hitting up Glenstone Museum",
      "doing Jazz in DC",
      "getting sushi in Dupont Circle",
      "sip and paint with white wine",
      "catching a show at The Fillmore",
      "brunch at Busboys and Poets",
      "rooftop vibes at POV Lounge",
      "exploring the Smithsonian museums",
      "dinner at Ben's Chili Bowl",
      "live music on U Street",
      "wine tasting at Urban Winery",
      "dancing at Decades DC",
      "Ethiopian food in Adams Morgan",
      "comedy show at DC Improv",
      "sunset at the Wharf",
      "karaoke in H Street NE",
      "catching a movie at AMC",
      "coffee and books at Busboys",
      "hitting up Georgetown waterfront",
      "checking out The Anthem",
    ];
  }
}
