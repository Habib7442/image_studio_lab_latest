import { defineField, defineType } from "sanity";

export const catalog = defineType({
  name: "catalog",
  title: "Catalog",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
    }),
    defineField({
      name: "brandName",
      title: "Brand Name",
      type: "string",
    }),
    defineField({
      name: "palettePreset",
      title: "Palette Preset",
      type: "string",
    }),
    defineField({
      name: "pagesJson",
      title: "Pages JSON String",
      type: "text",
      description: "Stringified JSON array representing the lookbook sheets",
    }),
    defineField({
      name: "userId",
      title: "User ID (Clerk)",
      type: "string",
    }),
    defineField({
      name: "views",
      title: "Total Views",
      type: "number",
      initialValue: 0,
    }),
  ],
});
