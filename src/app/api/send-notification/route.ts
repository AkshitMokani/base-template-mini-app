import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📩 Notification Request Received:", body);

    // Example: Send to Farcaster, Twitter, or internal webhook here
    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { success: false, error: "Failed to send notification" },
      { status: 500 }
    );
  }
}

// ✅ Export something to make it a valid module
export const dynamic = "force-dynamic";
