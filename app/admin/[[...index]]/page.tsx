"use client";

import { useEffect, useState } from "react";
import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { notFound } from "next/navigation";

export default function AdminPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  // Prevent admin dashboard from being accessible in production
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  if (!mounted) return null;


  return <NextStudio config={config} />;
}
