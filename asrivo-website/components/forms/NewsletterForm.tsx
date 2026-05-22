"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterFormProps {
  source?: string;
  variant?: "inline" | "stacked";
  className?: string;
}

export default function NewsletterForm({
  source = "home",
  variant = "inline",
  className,
}: NewsletterFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    // TODO: Submit to Supabase newsletter_subscribers table
    // Simulating submission
    await new Promise((resolve) => setTimeout(resolve, 800));
    setStatus("success");
    setEmail("");
    setTimeout(() => setStatus("idle"), 4000);
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "flex items-center gap-2 text-brand-success",
          className
        )}
      >
        <CheckCircle className="h-5 w-5" />
        <span className="text-sm font-medium">Thanks for subscribing!</span>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        variant === "inline"
          ? "flex items-center gap-2"
          : "flex flex-col gap-3",
        className
      )}
    >
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        required
        disabled={status === "loading"}
        className={cn(
          "h-11 rounded-lg border border-border bg-white px-4 text-sm placeholder:text-brand-gray-400 focus:border-brand-electric focus:outline-none focus:ring-2 focus:ring-brand-electric/20 disabled:opacity-50",
          variant === "inline" ? "flex-1" : "w-full"
        )}
        aria-label="Email address for newsletter"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-brand-orange px-5 text-sm font-semibold text-white transition-all hover:bg-brand-orange/90 hover:shadow-lg hover:shadow-brand-orange/25 active:scale-[0.98] disabled:opacity-50"
      >
        {status === "loading" ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          <>
            Subscribe
            <Send className="h-3.5 w-3.5" />
          </>
        )}
      </button>
    </form>
  );
}
