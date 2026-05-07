import { defineType, defineField } from "sanity";

export const prompt = defineType({
  name: "prompt",
  title: "AI Prompt",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Prompt Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "layout",
      title: "Image Layout",
      type: "string",
      options: {
        list: [
          { title: "Single Image", value: "single" },
          { title: "Before/After Comparison", value: "comparison" },
        ],
        layout: "radio",
      },
      initialValue: "single",
    }),
    defineField({
      name: "mainImage",
      title: "Main Sample Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => document?.layout === "comparison",
    }),
    defineField({
      name: "beforeImage",
      title: "Before Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => document?.layout !== "comparison",
    }),
    defineField({
      name: "afterImage",
      title: "After Image",
      type: "image",
      options: { hotspot: true },
      hidden: ({ document }) => document?.layout !== "comparison",
    }),
    defineField({
      name: "mood",
      title: "Mood Line",
      type: "string",
      description: "One evocative italic sentence",
    }),
    defineField({
      name: "chatGPTVersion",
      title: "ChatGPT Version",
      type: "text",
    }),
    defineField({
      name: "geminiVersion",
      title: "Gemini Version",
      type: "text",
    }),
  ],
});
