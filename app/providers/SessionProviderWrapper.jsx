"use client";

import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "@/lib/Supabaseclient";

export function SessionProviderWrapper({ children, session }) {
  return (
    <SessionContextProvider supabaseclient={supabase} initialSession={session}>
      {children}
    </SessionContextProvider>
  );
}