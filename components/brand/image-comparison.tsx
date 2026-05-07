"use client"

import React, { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ImageComparisonProps {
  beforeImage: string
  afterImage: string
  className?: string
}

export const ImageComparison = ({
  beforeImage,
  afterImage,
  className,
}: ImageComparisonProps) => {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [isResizing, setIsResizing] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleCursorMove = (e: MouseEvent | TouchEvent) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    const x = "touches" in e ? e.touches[0].clientX : e.clientX
    const relativeX = x - rect.left
    const position = Math.max(0, Math.min(100, (relativeX / rect.width) * 100))
    
    setSliderPosition(position)
  }

  const handleMouseDown = () => setIsResizing(true)
  const handleMouseUp = () => setIsResizing(false)

  useEffect(() => {
    if (isResizing) {
      window.addEventListener("mousemove", handleCursorMove)
      window.addEventListener("mouseup", handleMouseUp)
      window.addEventListener("touchmove", handleCursorMove)
      window.addEventListener("touchend", handleMouseUp)
    } else {
      window.removeEventListener("mousemove", handleCursorMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleCursorMove)
      window.removeEventListener("touchend", handleMouseUp)
    }

    return () => {
      window.removeEventListener("mousemove", handleCursorMove)
      window.removeEventListener("mouseup", handleMouseUp)
      window.removeEventListener("touchmove", handleCursorMove)
      window.removeEventListener("touchend", handleMouseUp)
    }
  }, [isResizing])

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full overflow-hidden select-none touch-none",
        className
      )}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
    >
      {/* After Image (Background) */}
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={afterImage}
          alt="After"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Before Image (Overlay) */}
      <div
        className="absolute inset-0 aspect-[3/4] w-full overflow-hidden"
        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
      >
        <Image
          src={beforeImage}
          alt="Before"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Slider Line */}
      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white cursor-ew-resize"
        style={{ left: `${sliderPosition}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-black/20 backdrop-blur-md">
          <div className="flex gap-1">
            <div className="h-1.5 w-1.5 rounded-full bg-white" />
            <div className="h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute bottom-4 left-4 z-20 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
        Before
      </div>
      <div className="absolute bottom-4 right-4 z-20 rounded-full bg-black/50 px-3 py-1 text-[10px] font-bold text-white backdrop-blur-sm">
        After
      </div>
    </div>
  )
}
