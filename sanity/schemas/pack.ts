import { defineType, defineField } from "sanity";

export const pack = defineType({
  name: "pack",
  title: "Prompt Pack",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "segment",
      title: "Segment",
      type: "string",
      options: {
        list: [
          { title: "Free", value: "free" },
          { title: "Paid", value: "paid" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "gumroadUrl",
      title: "Gumroad URL",
      type: "url",
    }),
    defineField({
      name: "masterPrompt",
      title: "Master Prompt (Optional)",
      type: "text",
      description: "Global system-level or Director persona prompt for the entire pack.",
    }),
    defineField({
      name: "prompts",
      title: "Prompts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "prompt" }] }],
    }),
    defineField({
      name: "upvotes",
      title: "Upvotes",
      type: "number",
      initialValue: 0,
    }),
  ],
});
