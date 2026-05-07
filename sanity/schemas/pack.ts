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
          { title: "Sellers", value: "sellers" },
          { title: "Creators", value: "creators" },
          { title: "Fans", value: "fans" },
          { title: "Professionals", value: "professionals" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priceUSD",
      title: "Price (USD)",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priceINR",
      title: "Price (INR)",
      type: "number",
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "prompts",
      title: "Prompts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "prompt" }] }],
    }),
  ],
});
