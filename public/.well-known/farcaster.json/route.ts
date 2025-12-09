import { NextResponse } from "next/server";

export async function GET() {
  try {
    const config = {
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

  } catch (error: unknown) {
    console.error("Error generating metadata:", error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Unknown error" }, { status: 500 });
  }
}
