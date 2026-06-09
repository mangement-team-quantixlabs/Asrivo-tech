import { NextResponse } from "next/server";
import { createClient } from "./server";
import type { SupabaseClient, User } from "@supabase/supabase-js";

/**
 * Shared authentication guard for all admin API route handlers.
 *
 * Usage:
 *   const result = await requireAdmin();
 *   if (result instanceof NextResponse) return result;  // 401
 *   const { supabase, user } = result;
 *
 * Returns a 401 NextResponse when the request has no valid session,
 * otherwise returns { supabase, user } for the authenticated caller.
 */
export async function requireAdmin(): Promise<
  NextResponse | { supabase: SupabaseClient; user: User }
> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Please sign in." },
      { status: 401 }
    );
  }

  return { supabase, user };
}

/**
 * Type-guard helper so callers can narrow the result without repeating the
 * instanceof check verbosely.
 *
 * Example:
 *   const auth = await requireAdmin();
 *   if (isUnauthorized(auth)) return auth;
 *   const { supabase } = auth;
 */
export function isUnauthorized(
  result: NextResponse | { supabase: SupabaseClient; user: User }
): result is NextResponse {
  return result instanceof NextResponse;
}
