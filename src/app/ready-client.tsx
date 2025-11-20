// src/app/ready-client.tsx
"use client";

import { useEffect } from "react";
import { sdk } from "@farcaster/frame-sdk";

export default function ClientReady() {
  useEffect(() => {
    sdk.actions.ready();
  }, []);

  return null;
}
