import { groq } from "next-sanity";

export const allPromptsQuery = groq`
  *[_type == "prompt"] | order(_createdAt desc) {
    _id,
    title,
    layout,
    mainImage,
    beforeImage,
    afterImage,
    mood,
    chatGPTVersion,
    geminiVersion,
    "segment": *[_type == "pack" && references(^._id)][0].segment
  }
`;

export const promptsBySegmentQuery = groq`
  *[_type == "prompt" && *[_type == "pack" && references(^._id) && segment == $segment][0]] | order(_createdAt desc) {
    _id,
    title,
    layout,
    mainImage,
    beforeImage,
    afterImage,
    mood,
    chatGPTVersion,
    geminiVersion,
    "segment": $segment
  }
`;

export const allPacksQuery = groq`
  *[_type == "pack"] | order(priority asc) {
    _id,
    title,
    slug,
    segment,
    coverImage,
    description,
    gumroadUrl
  }
`;

export const singlePackQuery = groq`
  *[_type == "pack" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    segment,
    coverImage,
    description,
    gumroadUrl,
    masterPrompt,
    prompts[]-> {
      _id,
      title,
      layout,
      mainImage,
      beforeImage,
      afterImage,
      mood,
      chatGPTVersion,
      geminiVersion
    }
  }
`;

export const relatedPacksQuery = groq`
  *[_type == "pack" && segment == $segment && slug.current != $slug][0...3] {
    _id,
    title,
    slug,
    segment,
    coverImage
  }
`;
