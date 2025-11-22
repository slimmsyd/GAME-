import { NextResponse } from "next/server";
import { generateDateActivities } from "@/lib/openai/date-generator";

// In-memory cache to reduce API calls
let cachedActivities: string[] | null = null;
let cacheTimestamp: number | null = null;

const CACHE_DURATION = 1000 * 60 * 60; // 1 hour

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const forceRefresh = searchParams.get("refresh") === "true";
    const count = parseInt(searchParams.get("count") || "20");

    // Check if we have valid cached data
    const now = Date.now();
    const cacheIsValid =
      cachedActivities &&
      cacheTimestamp &&
      now - cacheTimestamp < CACHE_DURATION;

    // Use cache unless force refresh is requested
    if (cacheIsValid && !forceRefresh) {
      return NextResponse.json({
        activities: cachedActivities,
        cached: true,
        timestamp: cacheTimestamp,
      });
    }

    // Generate new activities
    const activities = await generateDateActivities(count);

    // Update cache
    cachedActivities = activities;
    cacheTimestamp = now;

    return NextResponse.json({
      activities,
      cached: false,
      timestamp: now,
    });
  } catch (error) {
    console.error("Error in generate-dates API:", error);

    return NextResponse.json(
      {
        error: "Failed to generate date activities",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
