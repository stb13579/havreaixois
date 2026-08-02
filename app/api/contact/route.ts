import { NextRequest, NextResponse } from "next/server";

const CONTACT_ENDPOINT = process.env.CONTACT_ENDPOINT || "";

export async function POST(request: NextRequest) {
  if (!CONTACT_ENDPOINT) {
    return NextResponse.json(
      { result: "error", message: "Contact endpoint not configured" },
      { status: 500 }
    );
  }

  const body = await request.text();

  let upstream: Response;
  try {
    upstream = await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
  } catch (error) {
    console.error("Contact form upstream request failed:", error);
    return NextResponse.json(
      { result: "error", message: "Failed to reach contact endpoint" },
      { status: 502 }
    );
  }

  if (!upstream.ok) {
    return NextResponse.json(
      { result: "error", message: "Contact endpoint returned an error" },
      { status: 502 }
    );
  }

  const text = await upstream.text();
  return new NextResponse(text, {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
