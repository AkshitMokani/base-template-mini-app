import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HyperMatch",
  description: "Match your cards",
  other: {
    "base:app_id": "6938574b4173bc2ae00fd646",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
