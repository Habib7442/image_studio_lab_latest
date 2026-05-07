"use client";

import { useEffect, useState } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Prevent admin dashboard from being accessible in production
  if (process.env.NODE_ENV === "production") {
    return null; // Or you could use notFound() from next/navigation
  }

  if (!mounted) return null;


  return <NextStudio config={config} />;
}
