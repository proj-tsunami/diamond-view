#!/usr/bin/env python3
"""Generate mock portfolio/hero imagery for Diamond View website using NanoBanana."""

import replicate
import os
import urllib.request
import sys

os.environ["REPLICATE_API_TOKEN"] = "REPLICATE_TOKEN_REMOVED"

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "generated")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Image prompts for Diamond View site sections
PROMPTS = {
    "hero": "Cinematic wide shot of a professional film production set with dramatic lighting, LED volume wall glowing in background, camera crew silhouettes, moody atmosphere, dark tones with warm accent lighting, 16:9 aspect ratio, photorealistic",

    "project-01": "Behind the scenes of a high-end commercial shoot, camera on dolly track, soft warm lighting on set, shallow depth of field, cinematic color grade with warm amber tones, professional production environment",

    "project-02": "Virtual production LED volume stage with Unreal Engine environment displayed, camera crew working, blue and orange lighting, futuristic production setup, cinematic wide angle",

    "project-03": "Close-up of a colorist working at a professional grading suite, multiple monitors showing cinematic footage, dark room with screen glow, moody atmosphere, shallow depth of field",

    "project-04": "Aerial establishing shot of a modern city at golden hour, cinematic color grade, warm light hitting glass buildings, slight haze in atmosphere, wide cinematic composition",

    "project-05": "Professional sports photography setup at a stadium, dramatic stadium lighting, action frozen in motion, cinematic depth of field, high contrast lighting",

    "project-06": "Creative studio workspace with storyboards on wall, style frames pinned up, warm desk lighting, design tools scattered artistically, shallow depth of field, moody creative atmosphere",
}

def generate_image(name, prompt):
    """Generate a single image using NanoBanana."""
    output_path = os.path.join(OUTPUT_DIR, f"{name}.jpg")

    if os.path.exists(output_path):
        print(f"  Skipping {name} (already exists)")
        return output_path

    print(f"  Generating: {name}...")

    try:
        output = replicate.run(
            "google/nano-banana-2",
            input={
                "prompt": prompt,
                "aspect_ratio": "16:9",
            }
        )

        # Output could be a FileOutput, URL string, or list
        if hasattr(output, 'url'):
            url = output.url
        elif isinstance(output, list) and len(output) > 0:
            item = output[0]
            url = item.url if hasattr(item, 'url') else str(item)
        elif isinstance(output, str):
            url = output
        else:
            url = str(output)

        print(f"  Downloading: {name}...")
        urllib.request.urlretrieve(url, output_path)
        print(f"  Saved: {output_path}")
        return output_path

    except Exception as e:
        print(f"  Error generating {name}: {e}")
        return None

if __name__ == "__main__":
    print("Diamond View — Generating mock imagery with NanoBanana\n")

    # Allow generating specific images by name
    targets = sys.argv[1:] if len(sys.argv) > 1 else PROMPTS.keys()

    for name in targets:
        if name in PROMPTS:
            generate_image(name, PROMPTS[name])
        else:
            print(f"  Unknown image: {name}")

    print("\nDone! Images saved to public/images/generated/")
