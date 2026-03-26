#!/usr/bin/env node

const fs = require("fs/promises");
const path = require("path");

const BASE_DIR = "/Users/jalenstephens/Dev/sidney-portfolio/output-images";
const PORTFOLIO_DIR = path.join(BASE_DIR, "portfolio");

const FILE_MAPPINGS = [
  { sources: ["page-01.png", "cover-final-portfolio.png"], target: "cover/cover-final-portfolio.png" },

  { sources: ["page-02.png", "blumarine-moodboard-01.png"], target: "blumarine/moodboards/blumarine-moodboard-01.png" },
  { sources: ["page-03.png", "blumarine-title-01.png"], target: "blumarine/title/blumarine-title-01.png" },
  { sources: ["page-04.png", "blumarine-lineup-01.png"], target: "blumarine/lineup/blumarine-lineup-01.png" },
  { sources: ["page-05.png", "blumarine-look-01.png"], target: "blumarine/looks/blumarine-look-01.png" },
  { sources: ["page-06.png", "blumarine-look-02.png"], target: "blumarine/looks/blumarine-look-02.png" },
  { sources: ["page-07.png", "blumarine-look-03.png"], target: "blumarine/looks/blumarine-look-03.png" },
  { sources: ["page-08.png", "blumarine-look-04.png"], target: "blumarine/looks/blumarine-look-04.png" },
  { sources: ["page-09.png", "blumarine-look-05.png"], target: "blumarine/looks/blumarine-look-05.png" },
  { sources: ["page-10.png", "blumarine-look-06.png"], target: "blumarine/looks/blumarine-look-06.png" },
  { sources: ["page-11.png", "blumarine-handbag-01.png"], target: "blumarine/handbags/blumarine-handbag-01.png" },
  { sources: ["page-12.png", "blumarine-handbag-02.png"], target: "blumarine/handbags/blumarine-handbag-02.png" },
  { sources: ["page-13.png", "blumarine-textiles-01.png"], target: "blumarine/textiles/blumarine-textiles-01.png" },
  { sources: ["page-14.png", "blumarine-inspiration-01.png"], target: "blumarine/inspiration/blumarine-inspiration-01.png" },
  { sources: ["page-15.png", "blumarine-process-01.png"], target: "blumarine/process/blumarine-process-01.png" },
  { sources: ["page-16.png", "blumarine-process-02.png"], target: "blumarine/process/blumarine-process-02.png" },
  {
    sources: ["page-17.png", "blumarine-garments-blazers-dresses-01.png"],
    target: "blumarine/garments/blumarine-garments-blazers-dresses-01.png",
  },
  { sources: ["page-18.png", "blumarine-garments-dresses-01.png"], target: "blumarine/garments/blumarine-garments-dresses-01.png" },
  { sources: ["page-19.png", "blumarine-garments-cardigans-01.png"], target: "blumarine/garments/blumarine-garments-cardigans-01.png" },
  { sources: ["page-20.png", "blumarine-garments-minis-tops-01.png"], target: "blumarine/garments/blumarine-garments-minis-tops-01.png" },
  { sources: ["page-21.png", "blumarine-purses-01.png"], target: "blumarine/purses/blumarine-purses-01.png" },
  { sources: ["page-22.png", "blumarine-purses-02.png"], target: "blumarine/purses/blumarine-purses-02.png" },

  { sources: ["page-23.png", "aw26-moodboard-01.png"], target: "aw26/moodboards/aw26-moodboard-01.png" },
  { sources: ["page-24.png", "aw26-moodboard-02.png"], target: "aw26/moodboards/aw26-moodboard-02.png" },
  { sources: ["page-25.png", "aw26-lineup-01.png"], target: "aw26/lineup/aw26-lineup-01.png" },
  { sources: ["page-50.png", "methodology-lineup-01.png"], target: "aw26/lineup/aw26-lineup-02.png" },
  { sources: ["page-52.png", "methodology-lineup-02.png"], target: "aw26/lineup/aw26-lineup-03.png" },
  { sources: ["page-54.png", "methodology-lineup-03.png"], target: "aw26/lineup/aw26-lineup-04.png" },
  { sources: ["page-26.png", "aw26-process-01.png"], target: "aw26/process/aw26-process-01.png" },
  { sources: ["page-27.png", "aw26-process-02.png"], target: "aw26/process/aw26-process-02.png" },
  { sources: ["page-28.png", "aw26-process-03.png"], target: "aw26/process/aw26-process-03.png" },
  { sources: ["page-29.png", "aw26-process-04.png"], target: "aw26/process/aw26-process-04.png" },
  { sources: ["page-42.png", "methodology-process-01.png"], target: "aw26/process/aw26-process-05.png" },
  { sources: ["page-43.png", "methodology-process-02.png"], target: "aw26/process/aw26-process-06.png" },
  { sources: ["page-44.png", "methodology-process-03.png"], target: "aw26/process/aw26-process-07.png" },
  { sources: ["page-45.png", "methodology-process-04.png"], target: "aw26/process/aw26-process-08.png" },
  { sources: ["page-46.png", "methodology-process-05.png"], target: "aw26/process/aw26-process-09.png" },
  { sources: ["page-47.png", "methodology-process-06.png"], target: "aw26/process/aw26-process-10.png" },
  { sources: ["page-48.png", "methodology-bag-process-01.png"], target: "aw26/bag-process/aw26-bag-process-01.png" },
  { sources: ["page-49.png", "methodology-bag-process-02.png"], target: "aw26/bag-process/aw26-bag-process-02.png" },
  { sources: ["page-32.png", "aw26-look-01.png"], target: "aw26/looks/aw26-look-01.png" },
  { sources: ["page-33.png", "aw26-look-02.png"], target: "aw26/looks/aw26-look-02.png" },
  { sources: ["page-34.png", "aw26-look-03.png"], target: "aw26/looks/aw26-look-03.png" },
  { sources: ["page-35.png", "aw26-look-04.png"], target: "aw26/looks/aw26-look-04.png" },
  { sources: ["page-36.png", "aw26-look-05.png"], target: "aw26/looks/aw26-look-05.png" },
  { sources: ["page-61.png", "final-looks-01.png"], target: "aw26/looks/aw26-look-06.png" },
  { sources: ["page-62.png", "final-looks-02.png"], target: "aw26/looks/aw26-look-07.png" },
  { sources: ["page-30.png", "aw26-knit-dress-development-01.png"], target: "aw26/textiles/aw26-knit-dress-development-01.png" },
  { sources: ["page-31.png", "aw26-merino-wool-samples-01.png"], target: "aw26/textiles/aw26-merino-wool-samples-01.png" },
  { sources: ["page-39.png", "methodology-textile-samples-01.png"], target: "aw26/textiles/aw26-textile-samples-01.png" },
  { sources: ["page-60.png", "methodology-fabric-choice-01.png"], target: "aw26/textiles/aw26-fabric-choice-01.png" },
  { sources: ["page-51.png", "methodology-flats-01.png"], target: "aw26/flats/aw26-flats-01.png" },
  { sources: ["page-53.png", "methodology-flats-02.png"], target: "aw26/flats/aw26-flats-02.png" },
  { sources: ["page-55.png", "methodology-flats-03.png"], target: "aw26/flats/aw26-flats-03.png" },
  { sources: ["page-63.png", "final-flats-01.png"], target: "aw26/flats/aw26-flats-04.png" },
  { sources: ["page-64.png", "final-flats-02.png"], target: "aw26/flats/aw26-flats-05.png" },
  { sources: ["page-37.png", "methodology-moodboard-01.png"], target: "aw26/inspiration/aw26-inspiration-01.png" },
  { sources: ["page-38.png", "methodology-moodboard-02.png"], target: "aw26/inspiration/aw26-inspiration-02.png" },
  { sources: ["page-56.png", "methodology-inspiration-01.png"], target: "aw26/inspiration/aw26-inspiration-03.png" },
  { sources: ["page-57.png", "methodology-inspiration-02.png"], target: "aw26/inspiration/aw26-inspiration-04.png" },
  { sources: ["page-40.png", "methodology-title-aw26-01.png"], target: "aw26/concept/aw26-title-01.png" },
  { sources: ["page-41.png", "methodology-target-market-01.png"], target: "aw26/concept/aw26-target-market-01.png" },
  { sources: ["page-58.png", "methodology-concept-development-01.png"], target: "aw26/concept/aw26-concept-development-01.png" },
  { sources: ["page-59.png", "methodology-concept-development-02.png"], target: "aw26/concept/aw26-concept-development-02.png" },
];

async function pathExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function moveMappedFile(mapping, counts) {
  const targetPath = path.join(PORTFOLIO_DIR, mapping.target);
  const targetDir = path.dirname(targetPath);

  try {
    await fs.mkdir(targetDir, { recursive: true });

    const targetExists = await pathExists(targetPath);
    if (targetExists) {
      counts.skipped += 1;
      console.log(`[SKIP_EXISTS] ${mapping.target}`);
      return;
    }

    let resolvedSource = null;
    for (const sourceName of mapping.sources) {
      const candidate = path.join(BASE_DIR, sourceName);
      if (await pathExists(candidate)) {
        resolvedSource = candidate;
        break;
      }
    }

    if (!resolvedSource) {
      counts.missing += 1;
      console.log(
        `[MISSING] none found for ${mapping.target} (checked: ${mapping.sources.join(", ")})`
      );
      return;
    }

    await fs.rename(resolvedSource, targetPath);
    counts.moved += 1;
    console.log(`[MOVED] ${path.basename(resolvedSource)} -> ${mapping.target}`);
  } catch (error) {
    counts.skipped += 1;
    const message = error instanceof Error ? error.message : String(error);
    console.error(`[ERROR] ${mapping.target}: ${message}`);
  }
}

async function main() {
  const counts = {
    moved: 0,
    skipped: 0,
    missing: 0,
    total: FILE_MAPPINGS.length,
  };

  console.log(`Starting reorganization from: ${BASE_DIR}`);
  console.log(`Target root: ${PORTFOLIO_DIR}`);
  console.log(`Total mapped files: ${counts.total}`);

  for (const mapping of FILE_MAPPINGS) {
    await moveMappedFile(mapping, counts);
  }

  console.log("\nSummary");
  console.log(`- Total mappings: ${counts.total}`);
  console.log(`- Moved: ${counts.moved}`);
  console.log(`- Skipped: ${counts.skipped}`);
  console.log(`- Missing: ${counts.missing}`);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Fatal error: ${message}`);
  process.exitCode = 1;
});
