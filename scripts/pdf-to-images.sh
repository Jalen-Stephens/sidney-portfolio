#!/usr/bin/env bash
set -euo pipefail

# Convert PDF pages to high-quality PNG images.
# Usage:
#   ./scripts/pdf-to-images.sh
#   ./scripts/pdf-to-images.sh "/path/to/file.pdf"

INPUT_PDF="${1:-Final Portfolio-combined.pdf}"
OUTPUT_DIR="output-images"
DPI=300

if ! command -v pdftoppm >/dev/null 2>&1; then
  echo "Error: pdftoppm is not installed."
  echo "Install Poppler and try again:"
  echo "  macOS: brew install poppler"
  echo "  Ubuntu/Debian: sudo apt-get install poppler-utils"
  exit 1
fi

if [[ ! -f "$INPUT_PDF" ]]; then
  echo "Error: PDF file not found: $INPUT_PDF"
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

# Clean previous generated images from this script naming pattern.
rm -f "$OUTPUT_DIR"/page-*.png

tmp_prefix="$OUTPUT_DIR"/tmp-page

# Generate PNG files at 300 DPI using a temporary prefix.
pdftoppm -png -r "$DPI" "$INPUT_PDF" "$tmp_prefix"

# Rename to page-01.png, page-02.png, ... for consistent sorting.
shopt -s nullglob
tmp_files=( "$tmp_prefix"-*.png )
count="${#tmp_files[@]}"

if [[ "$count" -eq 0 ]]; then
  echo "Error: No images were generated from $INPUT_PDF"
  exit 1
fi

for i in "${!tmp_files[@]}"; do
  page_num=$((i + 1))
  new_name=$(printf "%s/page-%02d.png" "$OUTPUT_DIR" "$page_num")
  mv "${tmp_files[$i]}" "$new_name"
done

echo "Success: Generated $count image(s) in '$OUTPUT_DIR' from '$INPUT_PDF'."
