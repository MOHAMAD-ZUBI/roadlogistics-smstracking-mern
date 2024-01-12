"use client";
import { SessionProvider as NextSessionProvider } from "next-auth/react";
export default function Provider({ children, session }) {
  return (
    <NextSessionProvider session={session}>{children}</NextSessionProvider>
  );
}
