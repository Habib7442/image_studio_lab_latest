import React from "react";
import { Check, FileText, Zap, Award, BookOpen } from "lucide-react";

export const PackChecklist = () => {
  const items = [
    { icon: <Zap className="h-5 w-5 text-accent" />, title: "25 Master Prompts", desc: "Tested for consistency and aesthetic quality." },
    { icon: <Award className="h-5 w-5 text-accent" />, title: "The Master Director", desc: "System-level persona for relighting control." },
    { icon: <FileText className="h-5 w-5 text-accent" />, title: "40+ Page PDF Guide", desc: "Clean, editorial layout ready for offline reference." },
    { icon: <BookOpen className="h-5 w-5 text-accent" />, title: "Troubleshooting Guide", desc: "How to fix common AI image artifacts." },
  ];

  return (
    <section className="bg-background py-24 border-t border-border">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16">
          <h2 className="font-serif text-4xl font-light text-foreground">
            What's inside the <em className="italic">Guide.</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div key={i} className="flex flex-col">
              <div className="mb-6 h-12 w-12 flex items-center justify-center rounded-lg bg-accent/5 border border-accent/10">
                {item.icon}
              </div>
              <h4 className="font-serif text-xl font-medium text-foreground">{item.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
