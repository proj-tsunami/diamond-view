#!/usr/bin/env bash
set -euo pipefail

# Generate placeholder test frames for scroll sequence development.
# Creates gradient-colored frames with frame numbers.

if ! command -v ffmpeg &>/dev/null; then
  echo "Error: ffmpeg is required but not found in PATH." >&2
  exit 1
fi

generate_frames() {
  local dir="$1"
  local count="$2"
  local width="$3"
  local height="$4"

  mkdir -p "$dir"

  for i in $(seq 1 "$count"); do
    local padded
    padded=$(printf "%03d" "$i")
    local hue=$(( (i * 360 / count) % 360 ))

    # Generate a solid color frame with frame number text
    ffmpeg -y -f lavfi -i "color=size=${width}x${height}:duration=0.04:rate=1:color=0x1a1a2e" \
      -vf "drawtext=text='Frame ${padded}':fontsize=$(( height / 8 )):fontcolor=white@0.3:x=(w-text_w)/2:y=(h-text_h)/2" \
      -frames:v 1 "${dir}/frame-${padded}.webp" -loglevel error 2>/dev/null || \
    ffmpeg -y -f lavfi -i "color=size=${width}x${height}:duration=0.04:rate=1:color=0x1a1a2e" \
      -frames:v 1 "${dir}/frame-${padded}.webp" -loglevel error

    printf "\r  %s: frame %s/%s" "$dir" "$padded" "$count"
  done
  echo ""
}

echo "Generating test frames..."

# Hero
generate_frames "public/sequences/hero/desktop" 30 1920 1080
generate_frames "public/sequences/hero/mobile" 15 960 540

# Interstitials
for name in interstitial-a interstitial-b interstitial-c; do
  generate_frames "public/sequences/${name}/desktop" 20 1920 1080
  generate_frames "public/sequences/${name}/mobile" 10 960 540
done

echo "Done! Test frames generated."
