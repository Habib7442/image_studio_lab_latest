"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEGMENTS } from "@/lib/constants";

interface GalleryFiltersProps {
  activeSegment: string;
  onSegmentChange: (segment: string) => void;
}

export const GalleryFilters = ({ activeSegment, onSegmentChange }: GalleryFiltersProps) => {
  return (
    <div className="flex w-full flex-col items-center gap-8 py-12">
      <Tabs
        defaultValue="all"
        value={activeSegment}
        onValueChange={onSegmentChange}
        className="w-auto"
      >
        <TabsList className="bg-background border border-border h-auto p-1 rounded-full gap-1">
          <TabsTrigger
            value="all"
            className="rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-widest data-[state=active]:bg-foreground data-[state=active]:text-background transition-all"
          >
            All
          </TabsTrigger>
          {SEGMENTS.map((segment) => (
            <TabsTrigger
              key={segment.id}
              value={segment.id}
              className="rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-widest data-[state=active]:bg-foreground data-[state=active]:text-background transition-all"
            >
              {segment.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </div>
  );
};
