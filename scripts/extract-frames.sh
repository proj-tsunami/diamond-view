#!/usr/bin/env bash
set -euo pipefail

# Extract evenly-spaced frames from a video as WebP images.
# Usage: ./scripts/extract-frames.sh <input-video> <output-dir> <frame-count> [width]
# Example: ./scripts/extract-frames.sh reel.mp4 public/sequences/hero/desktop 90 1920

INPUT="${1:?Usage: extract-frames.sh <input> <output-dir> <count> [width]}"
OUTPUT_DIR="${2:?Missing output directory}"
COUNT="${3:?Missing frame count}"
WIDTH="${4:-}"

if ! command -v ffmpeg &>/dev/null; then
  echo "Error: ffmpeg is required but not found in PATH." >&2
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "Error: Input file '$INPUT' not found." >&2
  exit 1
fi

mkdir -p "$OUTPUT_DIR"

# Get video duration in seconds
DURATION=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$INPUT")

# Calculate interval between frames
INTERVAL=$(echo "$DURATION / $COUNT" | bc -l)

# Build scale filter
SCALE_FILTER=""
if [ -n "$WIDTH" ]; then
  SCALE_FILTER="-vf scale=${WIDTH}:-2"
fi

echo "Extracting $COUNT frames from '$INPUT' (${DURATION}s) → '$OUTPUT_DIR/'"
echo "Interval: ${INTERVAL}s between frames"
[ -n "$WIDTH" ] && echo "Scale: ${WIDTH}px wide"

for i in $(seq 1 "$COUNT"); do
  TIMESTAMP=$(echo "($i - 1) * $INTERVAL" | bc -l)
  PADDED=$(printf "%03d" "$i")
  # shellcheck disable=SC2086
  ffmpeg -y -ss "$TIMESTAMP" -i "$INPUT" -frames:v 1 -q:v 80 $SCALE_FILTER \
    "$OUTPUT_DIR/frame-${PADDED}.webp" -loglevel error
  printf "\r  Frame %s/%s" "$PADDED" "$COUNT"
done

echo ""
echo "Done. $COUNT frames saved to $OUTPUT_DIR/"
