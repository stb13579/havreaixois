import { NextResponse } from "next/server";

const ICAL_URL = "https://www.airbnb.fr/calendar/ical/727978460809376762.ics?s=a747d32f6194face238248934e95f15d";

interface BookedRange {
  start: string; // YYYY-MM-DD
  end: string; // YYYY-MM-DD
}

/**
 * Parse iCal VEVENT data and extract booked date ranges
 */
function parseICalData(icalText: string): BookedRange[] {
  const bookedRanges: BookedRange[] = [];
  
  // Split into events
  const events = icalText.split("BEGIN:VEVENT");
  
  for (const event of events) {
    if (!event.includes("END:VEVENT")) continue;
    
    // Extract DTSTART and DTEND
    const dtStartMatch = event.match(/DTSTART(?:;VALUE=DATE)?:(\d{8})/);
    const dtEndMatch = event.match(/DTEND(?:;VALUE=DATE)?:(\d{8})/);
    
    if (dtStartMatch && dtEndMatch) {
      const start = dtStartMatch[1];
      const end = dtEndMatch[1];
      
      // Convert YYYYMMDD to YYYY-MM-DD
      const formatDate = (dateStr: string) => {
        return `${dateStr.slice(0, 4)}-${dateStr.slice(4, 6)}-${dateStr.slice(6, 8)}`;
      };
      
      bookedRanges.push({
        start: formatDate(start),
        end: formatDate(end),
      });
    }
  }
  
  return bookedRanges;
}

export async function GET() {
  try {
    const response = await fetch(ICAL_URL, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch iCal: ${response.status}`);
    }
    
    const icalText = await response.text();
    const bookedRanges = parseICalData(icalText);
    
    return NextResponse.json({
      success: true,
      bookedRanges,
      lastUpdated: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error fetching availability:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch availability data",
        bookedRanges: [],
      },
      { status: 500 }
    );
  }
}
