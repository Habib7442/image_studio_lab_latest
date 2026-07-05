const { createClient } = require('@sanity/client');
const fs = require('fs');
const path = require('path');

// Custom parser to load environment variables from .env.local without requiring npm dotenv
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const index = trimmed.indexOf('=');
      if (index !== -1) {
        const key = trimmed.slice(0, index).trim();
        let val = trimmed.slice(index + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        process.env[key] = val;
      }
    }
  });
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const token = process.env.SANITY_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Error: Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_WRITE_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-05-03',
  token,
  useCdn: false,
});

async function main() {
  console.log("Starting orphaned assets cleanup in Sanity...");
  
  // 1. Fetch all catalogs
  console.log("Fetching catalogs...");
  const catalogs = await client.fetch(`*[_type == "catalog"] { pagesJson }`);
  
  // 2. Extract all referenced asset IDs
  const activeAssetIds = new Set();
  const pattern = /https:\/\/cdn\.sanity\.io\/images\/[a-z0-9]+\/[a-z0-9]+\/([a-f0-9]+-[0-9]+x[0-9]+)\.([a-z]+)/gi;
  
  catalogs.forEach((c) => {
    if (c.pagesJson) {
      const matches = [...c.pagesJson.matchAll(pattern)];
      matches.forEach(m => {
        activeAssetIds.add(`image-${m[1]}-${m[2]}`);
      });
    }
  });

  console.log(`Found ${activeAssetIds.size} active referenced image assets in catalogs.`);

  // 3. Fetch all image assets in Sanity
  console.log("Fetching stored image assets from Sanity...");
  const allAssets = await client.fetch(`*[_type == "sanity.imageAsset"] { _id, originalFilename, size }`);
  console.log(`Found ${allAssets.length} total image assets stored in Sanity.`);

  // 4. Filter orphaned assets
  const orphanedAssets = allAssets.filter(a => !activeAssetIds.has(a._id));
  console.log(`Identified ${orphanedAssets.length} orphaned image assets.`);

  if (orphanedAssets.length === 0) {
    console.log("No orphaned assets to clean up!");
    return;
  }

  // 5. Delete orphaned assets
  let totalSaved = 0;
  let successCount = 0;
  for (const asset of orphanedAssets) {
    const filename = asset.originalFilename || 'unknown';
    const mbSize = (asset.size / 1024 / 1024).toFixed(2);
    console.log(`Deleting orphaned asset: ${asset._id} (${filename}, ${mbSize} MB)`);
    try {
      await client.delete(asset._id);
      totalSaved += asset.size;
      successCount++;
    } catch (e) {
      console.error(`Failed to delete asset ${asset._id}:`, e.message);
    }
  }

  console.log(`Cleanup complete! Successfully deleted ${successCount} assets. Reclaimed ${(totalSaved / 1024 / 1024).toFixed(2)} MB of space.`);
}

main().catch(console.error);
