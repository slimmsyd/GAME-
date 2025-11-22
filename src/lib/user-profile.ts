/**
 * User Profile Configuration
 * 
 * This defines the preferences and demographics for personalized date suggestions.
 * Modify this to customize the AI-generated date night activities.
 */

export const userProfile = {
  demographics: {
    age: 23,
    location: "DMV area (DC, Maryland, Virginia)",
    identity: "Black woman",
  },
  interests: {
    music: ["jazz", "hip hop", "R&B", "Afrobeats"],
    beverages: ["white wine", "cocktails", "craft beer"],
    activities: [
      "museums and art galleries",
      "live music venues",
      "sip and paint",
      "brunches",
      "rooftop bars",
      "cultural events",
      "food experiences",
      "nightlife",
      "outdoor activities",
    ],
  },
  favoritePlaces: [
    "Glenstone Museum",
    "Jazz venues in DC",
    "The Wharf",
    "U Street Corridor",
    "H Street NE",
  ],
  vibe: "Fun, cultured, spontaneous, and ready to explore",
};

export type UserProfile = typeof userProfile;
