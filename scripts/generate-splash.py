#!/usr/bin/env python3
"""Generate splash art for the parallax scene via Replicate."""

import os
import urllib.request
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

import replicate

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "..", "public", "images", "splash")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# 16:9 aspect, composed for parallax scrolling with breathing room
prompt = """Dark moody cinematic matte painting style artwork of a historic 2-story red brick cigar factory building in Tampa Ybor City, dramatic corner perspective, tall arched windows, bold vibrant street art mural on the brick facade with DREAM BIG in large mixed typography, teal blue and burnt orange paint splashes contrasting against aged brick, ominous dark stormy overcast sky with volumetric god rays piercing through heavy clouds, thick atmospheric fog and mist wrapping around the base of the building and drifting across the scene, Spanish moss draping from large oak trees flanking both sides, wet ground with moody reflections, deep shadows, the entire image fades to pure black (#181919) on all edges creating a seamless dark border, hyper cinematic color grading with crushed blacks and teal shadows, painterly quality like a concept art matte painting for a film, dramatic chiaroscuro lighting, 8K detail, heavy film grain, dark atmospheric mood"""

print("Generating splash art via Replicate (flux-1.1-pro)...")
print("This may take 30-60 seconds...\n")

output = replicate.run(
    "black-forest-labs/flux-1.1-pro",
    input={
        "prompt": prompt,
        "aspect_ratio": "16:9",
        "output_format": "png",
        "safety_tolerance": 5,
        "prompt_upsampling": True,
    }
)

# output is a FileOutput URL
url = str(output)
print(f"Generated: {url}")

out_path = os.path.join(OUTPUT_DIR, "building-parallax.png")
print(f"Downloading to {out_path}...")
urllib.request.urlretrieve(url, out_path)
print(f"Saved: {out_path}")
print("Done!")
