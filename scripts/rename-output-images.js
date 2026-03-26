#!/usr/bin/env node

const path = require("path");
const { rename } = require("fs/promises");

const OUTPUT_DIR = "/Users/jalenstephens/Dev/sidney-portfolio/output-images";

const renameMap = {
  "page-01.png": "cover-final-portfolio.png",
  "page-02.png": "blumarine-moodboard-01.png",
  "page-03.png": "blumarine-title-01.png",
  "page-04.png": "blumarine-lineup-01.png",
  "page-05.png": "blumarine-look-01.png",
  "page-06.png": "blumarine-look-02.png",
  "page-07.png": "blumarine-look-03.png",
  "page-08.png": "blumarine-look-04.png",
  "page-09.png": "blumarine-look-05.png",
  "page-10.png": "blumarine-look-06.png",
  "page-11.png": "blumarine-handbag-01.png",
  "page-12.png": "blumarine-handbag-02.png",
  "page-13.png": "blumarine-textiles-01.png",
  "page-14.png": "blumarine-inspiration-01.png",
  "page-15.png": "blumarine-process-01.png",
  "page-16.png": "blumarine-process-02.png",
  "page-17.png": "blumarine-garments-blazers-dresses-01.png",
  "page-18.png": "blumarine-garments-dresses-01.png",
  "page-19.png": "blumarine-garments-cardigans-01.png",
  "page-20.png": "blumarine-garments-minis-tops-01.png",
  "page-21.png": "blumarine-purses-01.png",
  "page-22.png": "blumarine-purses-02.png",
  "page-23.png": "aw26-moodboard-01.png",
  "page-24.png": "aw26-moodboard-02.png",
  "page-25.png": "aw26-lineup-01.png",
  "page-26.png": "aw26-process-01.png",
  "page-27.png": "aw26-process-02.png",
  "page-28.png": "aw26-process-03.png",
  "page-29.png": "aw26-process-04.png",
  "page-30.png": "aw26-knit-dress-development-01.png",
  "page-31.png": "aw26-merino-wool-samples-01.png",
  "page-32.png": "aw26-look-01.png",
  "page-33.png": "aw26-look-02.png",
  "page-34.png": "aw26-look-03.png",
  "page-35.png": "aw26-look-04.png",
  "page-36.png": "aw26-look-05.png",
  "page-37.png": "methodology-moodboard-01.png",
  "page-38.png": "methodology-moodboard-02.png",
  "page-39.png": "methodology-textile-samples-01.png",
  "page-40.png": "methodology-title-aw26-01.png",
  "page-41.png": "methodology-target-market-01.png",
  "page-42.png": "methodology-process-01.png",
  "page-43.png": "methodology-process-02.png",
  "page-44.png": "methodology-process-03.png",
  "page-45.png": "methodology-process-04.png",
  "page-46.png": "methodology-process-05.png",
  "page-47.png": "methodology-process-06.png",
  "page-48.png": "methodology-bag-process-01.png",
  "page-49.png": "methodology-bag-process-02.png",
  "page-50.png": "methodology-lineup-01.png",
  "page-51.png": "methodology-flats-01.png",
  "page-52.png": "methodology-lineup-02.png",
  "page-53.png": "methodology-flats-02.png",
  "page-54.png": "methodology-lineup-03.png",
  "page-55.png": "methodology-flats-03.png",
  "page-56.png": "methodology-inspiration-01.png",
  "page-57.png": "methodology-inspiration-02.png",
  "page-58.png": "methodology-concept-development-01.png",
  "page-59.png": "methodology-concept-development-02.png",
  "page-60.png": "methodology-fabric-choice-01.png",
  "page-61.png": "final-looks-01.png",
  "page-62.png": "final-looks-02.png",
  "page-63.png": "final-flats-01.png",
  "page-64.png": "final-flats-02.png",
};

async function run() {
  for (const [sourceName, targetName] of Object.entries(renameMap)) {
    const sourcePath = path.join(OUTPUT_DIR, sourceName);
    const targetPath = path.join(OUTPUT_DIR, targetName);

    try {
      await rename(sourcePath, targetPath);
      console.log(`renamed: ${sourceName} -> ${targetName}`);
    } catch (error) {
      if (error && error.code === "ENOENT") {
        console.warn(`skipped (missing): ${sourceName}`);
        continue;
      }

      if (error && error.code === "EEXIST") {
        console.warn(`skipped (target exists): ${targetName}`);
        continue;
      }

      console.error(`error renaming ${sourceName} -> ${targetName}:`, error.message);
    }
  }
}

run().catch((error) => {
  console.error("fatal error during rename:", error);
  process.exitCode = 1;
});
