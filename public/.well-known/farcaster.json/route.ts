import { NextResponse } from "next/server";

export async function GET() {
  try {
    const config = {
<<<<<<< HEAD
    "accountAssociation": {
      "header": "eyJmaWQiOjI1OTI1MiwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDllOEI3ZDAxM0JCMDYwMjQyZDMxMTUwYzkwMEZiMzFGNDQ2ODFCODkifQ",
      "payload": "eyJkb21haW4iOiJoeXBlcm1hdGNoLnZlcmNlbC5hcHAifQ",
      "signature": "qXLDa4/L6ui037A6xo9pJJIlwipWbw7XADr5UMgXTBQijUsY8wweiAM+TtpXY0f0xWyIsG+ABROZ9vvI4anMexw="
    },

   "miniapp": {
    "name": "HyperMatch"
    },

  "baseBuilder": {
    "ownerAddress": "0x25B8b9336Eec2Eb12adA22cD248aF206d22E8d88"
    }
  };

  return NextResponse.json(config);
=======
      frame: {
        name: "HyperMatch",
        tags: ["card", "game", "cardgame", "matchcard", "hypermatchcard"],
        homeUrl: "https://hypermatch.vercel.app/",
        iconUrl: "https://hypermatch.vercel.app/icon.png",
        ogTitle: "HyperMatch - Match your cards",
        version: "1",
        imageUrl: "https://hypermatch.vercel.app/og-image.png",
        subtitle: "Match your cards",
        ogImageUrl: "https://hypermatch.vercel.app/og-image.png",
        webhookUrl: "https://hypermatch.vercel.app/api/webhook",
        description: "Match your card",
        castShareUrl: "https://hypermatch.vercel.app/og-image.png",
        splashImageUrl: "https://hypermatch.vercel.app/og-image.png",
        primaryCategory: "games",
        splashBackgroundColor: "#6200EA",
      },
         "accountAssociation": {
    "header": "eyJmaWQiOjI1OTI1MiwidHlwZSI6ImF1dGgiLCJrZXkiOiIweDllOEI3ZDAxM0JCMDYwMjQyZDMxMTUwYzkwMEZiMzFGNDQ2ODFCODkifQ",
    "payload": "eyJkb21haW4iOiJoeXBlcm1hdGNoLnZlcmNlbC5hcHAifQ",
    "signature": "qXLDa4/L6ui037A6xo9pJJIlwipWbw7XADr5UMgXTBQijUsY8wweiAM+TtpXY0f0xWyIsG+ABROZ9vvI4anMexw="
  },
  "baseBuilder": {
    "ownerAddress": "0x25B8b9336Eec2Eb12adA22cD248aF206d22E8d88"
  }
    };
>>>>>>> 27f41863195eec6add8faa47fe64623f558e7a3c

  } catch (error: unknown) {
    console.error("Error generating metadata:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
