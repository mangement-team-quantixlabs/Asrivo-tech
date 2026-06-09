"use client";

import { useState, useTransition } from "react";
import { loginAction } from "@/app/actions/admin-actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { LogIn, AlertCircle, Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function handleSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await loginAction(formData);
      if (result && !result.success) {
        setError(result.error);
      }
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#06153A] via-[#0A2463] to-[#1B4FD8] px-4">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-[#00C6BE]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-[#1B4FD8]/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00C6BE]/5 blur-3xl" />
      </div>

      <Card className="relative w-full max-w-md border-white/10 bg-white/[0.03] backdrop-blur-xl shadow-2xl">
        <CardHeader className="text-center pb-2">
          {/* Logo / Brand */}
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#00C6BE] to-[#1B4FD8] shadow-lg shadow-[#00C6BE]/25">
            <span className="text-xl font-bold text-white font-[var(--font-sora)]">A</span>
          </div>
          <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-sora)]">
            ASCIRVO Admin
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Sign in to your admin dashboard
          </p>
        </CardHeader>

        <CardContent className="pt-4">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form action={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 text-sm font-medium">
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="admin@ascirvo.com"
                required
                autoComplete="email"
                disabled={isPending}
                className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-[#00C6BE]/50 focus:ring-[#00C6BE]/20"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                required
                autoComplete="current-password"
                disabled={isPending}
                className="h-11 bg-white/5 border-white/10 text-white placeholder:text-slate-500 focus:border-[#00C6BE]/50 focus:ring-[#00C6BE]/20"
              />
            </div>

            <Button
              type="submit"
              disabled={isPending}
              className="w-full h-11 bg-gradient-to-r from-[#00C6BE] to-[#1B4FD8] hover:from-[#00B3AC] hover:to-[#1845C0] text-white font-semibold shadow-lg shadow-[#00C6BE]/20 transition-all duration-300"
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="h-4 w-4" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Protected admin portal — authorized personnel only
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
