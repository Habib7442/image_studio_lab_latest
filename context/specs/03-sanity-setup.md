# Unit 03: Sanity CMS Integration

## Goal
Connect a Headless CMS (Sanity) to manage Prompt Packs and Sample Images dynamically without code updates.

## Implementation

### 1. Schema Definitions
- **`Pack` Schema**:
    - `title` (string)
    - `slug` (slug)
    - `segment` (selection: Sellers, Creators, Fans, Professionals)
    - `priceUSD` (number)
    - `priceINR` (number)
    - `coverImage` (image)
    - `description` (text)
    - `prompts` (array of references to Prompt)
- **`Prompt` Schema**:
    - `title` (string)
    - `mood` (string)
    - `chatGPTVersion` (text)
    - `geminiVersion` (text)
    - `sampleImages` (array of images)
    - `intensityVariants` (boolean toggle)

### 2. Configuration
- Setup `sanity.config.ts` in the root.
- Setup `sanity/env.ts` for Project ID and Dataset.
- Setup `sanity/schema.ts` to register the new types.

### 3. Next.js Client (`lib/sanity/`)
- `client.ts`: Configure the read client.
- `image.ts`: Setup the Sanity image URL builder.
- `queries.ts`: Define GROQ queries for fetching packs and individual prompts.

## Dependencies
- `next-sanity`
- `sanity`
- `@sanity/image-url`
- `@sanity/vision` (optional for testing)

## Verification Checklist
- [ ] Sanity Studio is accessible via `/admin` or `/studio` (optional, can be separate).
- [ ] Schemas for `Pack` and `Prompt` are correctly defined.
- [ ] Next.js can fetch a test pack from Sanity via GROQ.
- [ ] Images are correctly resolved via the image-url builder.
