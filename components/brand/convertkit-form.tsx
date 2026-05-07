"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

export const ConvertKitForm = () => {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // Replace with your actual ConvertKit Form ID
    const FORM_ID = "YOUR_FORM_ID"; 
    const url = `https://app.convertkit.com/forms/${FORM_ID}/subscriptions`;

    try {
      // Note: This usually requires a server action or a proxy to avoid CORS
      // For now, we simulate the success state for the UI build
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-accent/20 bg-accent/5 p-12 text-center animate-in fade-in zoom-in duration-500">
        <CheckCircle2 className="mb-4 h-12 w-12 text-accent" />
        <h3 className="font-serif text-2xl font-medium text-foreground">Welcome to the Lab.</h3>
        <p className="mt-2 text-muted max-w-xs">
          Your free sample pack is flying to your inbox right now.
        </p>
        <Button className="mt-8 rounded-full bg-foreground px-8 py-6 text-sm font-semibold" asChild>
          <a href="/downloads/free-sample.pdf" download>Download Directly</a>
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
        <div className="relative">
          <Input
            type="email"
            placeholder="Enter your editorial email..."
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-16 rounded-full border-border bg-background px-8 text-base focus-visible:ring-accent"
          />
          <Button 
            type="submit" 
            disabled={status === "loading"}
            className="absolute right-2 top-2 h-12 w-12 rounded-full bg-foreground p-0 text-background hover:bg-accent transition-all"
          >
            {status === "loading" ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              <ArrowRight className="h-5 w-5" />
            )}
          </Button>
        </div>
        <p className="px-6 text-[10px] uppercase tracking-widest text-muted-foreground font-semibold">
          No spam. Just master prompts & updates.
        </p>
      </form>
      {status === "error" && (
        <p className="mt-4 text-center text-xs text-red-500">
          Something went wrong. Please try again or contact support.
        </p>
      )}
    </div>
  );
};
