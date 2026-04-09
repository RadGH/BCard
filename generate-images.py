#!/usr/bin/env python3
"""Generate logos and portraits for bcard dummy data using OpenAI DALL-E 3."""

import os
import json
import base64
import time
import urllib.request
import urllib.error
from PIL import Image
import io

def load_env(path):
    """Load key=value pairs from a .env file into os.environ."""
    if not os.path.exists(path):
        return
    with open(path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith('#') and '=' in line:
                k, v = line.split('=', 1)
                os.environ.setdefault(k.strip(), v.strip())

load_env(os.path.join(os.path.dirname(__file__), '.env.local'))

API_KEY = os.environ.get("OPENAI_API_KEY", "")
if not API_KEY:
    raise RuntimeError("OPENAI_API_KEY not set. Add it to .env.local")

OUTPUT_LOGOS = "/home/radgh/claude/bcard/public/images/logos"
OUTPUT_PORTRAITS = "/home/radgh/claude/bcard/public/images/portraits"

def call_openai(payload):
    data = json.dumps(payload).encode('utf-8')
    req = urllib.request.Request(
        "https://api.openai.com/v1/images/generations",
        data=data,
        headers={
            "Authorization": f"Bearer {API_KEY}",
            "Content-Type": "application/json",
        },
        method="POST"
    )
    with urllib.request.urlopen(req, timeout=120) as resp:
        return json.loads(resp.read().decode('utf-8'))

def download_as_webp(url, out_path, quality=50):
    """Download a PNG from url and save as WebP."""
    with urllib.request.urlopen(url) as resp:
        data = resp.read()
    img = Image.open(io.BytesIO(data))
    img.save(out_path, 'WEBP', quality=quality, method=6)

def generate_logo(company, industry_hint, filename):
    out_path = os.path.join(OUTPUT_LOGOS, filename)
    if os.path.exists(out_path):
        print(f"  [skip] {filename} already exists")
        return True
    prompt = (
        f"A single minimalist flat vector logo mark for '{company}'. "
        f"{industry_hint}. "
        "Solid flat colors only — no gradients, no shadows, no textures, no glow. "
        "2 colors maximum. Simple bold geometric shape, centered on a plain white background. "
        "NO text, NO letterforms, NO grid, NO multiple versions, NO mockups — exactly ONE logo mark."
    )
    print(f"  Generating logo: {filename} ({company})")
    try:
        result = call_openai({
            "model": "dall-e-3",
            "prompt": prompt,
            "n": 1,
            "size": "1024x1024",
            "quality": "standard",
            "style": "natural",
            "response_format": "url",
        })
        url = result["data"][0]["url"]
        download_as_webp(url, out_path)
        print(f"  Saved: {filename}")
        time.sleep(1)
        return True
    except Exception as e:
        print(f"  ERROR generating {filename}: {e}")
        return False

def generate_portrait(name, description, filename):
    out_path = os.path.join(OUTPUT_PORTRAITS, filename)
    if os.path.exists(out_path):
        print(f"  [skip] {filename} already exists")
        return True
    prompt = (
        f"Professional headshot portrait photo of {description}. "
        "Studio lighting, neutral gray or white background, professional attire, "
        "looking at camera with a confident smile. "
        "Photorealistic, high quality, business portrait style. "
        "Tight framing showing head and shoulders only."
    )
    print(f"  Generating portrait: {filename} ({name})")
    try:
        result = call_openai({
            "model": "dall-e-3",
            "prompt": prompt,
            "n": 1,
            "size": "1024x1024",
            "quality": "standard",
            "style": "natural",
            "response_format": "url",
        })
        url = result["data"][0]["url"]
        download_as_webp(url, out_path, quality=70)
        print(f"  Saved: {filename}")
        time.sleep(1)
        return True
    except Exception as e:
        print(f"  ERROR generating {filename}: {e}")
        return False

# ─── Logos (20 companies from the 25 samples) ────────────────────────────────
logos = [
    ("Nexus Dynamics",        "tech startup, neural network nodes connected",           "nexus-dynamics.webp"),
    ("Vertex Labs",           "software engineering lab, code brackets or lambda",      "vertex-labs.webp"),
    ("Prism Studio",          "creative agency, triangular prism splitting light",       "prism-studio.webp"),
    ("Metro Heart Institute", "medical cardiology, abstract heart outline",              "metro-heart.webp"),
    ("Patel & Associates",    "law firm, scales of justice or column",                   "patel-associates.webp"),
    ("Summit Realty Group",   "real estate, mountain peak or house silhouette",          "summit-realty.webp"),
    ("Pixel & Flow",          "UX design agency, pixel grid flowing into curves",        "pixel-flow.webp"),
    ("Meridian Wealth",       "financial advisory, compass rose or growth line",         "meridian-wealth.webp"),
    ("CloudScale",            "cloud infrastructure SaaS, cloud with upward arrow",     "cloudscale.webp"),
    ("Tierra Restaurant",     "upscale restaurant, leaf or fork and spoon",              "tierra-restaurant.webp"),
    ("Foster Visuals",        "photography studio, abstract camera aperture",            "foster-visuals.webp"),
    ("Quantum Analytics",     "data science AI, abstract atom or data nodes",            "quantum-analytics.webp"),
    ("Bloom Agency",          "marketing agency, abstract flower bloom",                 "bloom-agency.webp"),
    ("Elevation Design Co.",  "architecture firm, bold abstract building silhouette or single arch shape", "elevation-design.webp"),
    ("Serenity Wellness",     "wellness coaching, lotus flower or gentle wave",          "serenity-wellness.webp"),
    ("InfraCore",             "DevOps infrastructure, abstract server rack or circuit",  "infracore.webp"),
    ("Novak Interiors",       "interior design, abstract room corner or curved line",    "novak-interiors.webp"),
    ("Brennan Capital",       "investment firm, bold B monogram or abstract growth bar", "brennan-capital.webp"),
    ("Soundwave Studios",     "music production studio, stylized audio waveform",        "soundwave-studios.webp"),
    ("Heritage Brewing Co.",  "craft brewery, hop cone or barrel silhouette",            "heritage-brewing.webp"),
]

# ─── Portraits (10 people from the 25 samples) ───────────────────────────────
portraits = [
    ("Sarah Chen",       "a professional Asian woman in her 30s, CEO, wearing a sharp blazer",                   "sarah-chen.webp"),
    ("Marcus Rodriguez", "a professional Latino man in his late 20s, software engineer, smart-casual attire",    "marcus-rodriguez.webp"),
    ("Emily Whitfield",  "a creative professional white woman in her 30s, creative director, stylish attire",    "emily-whitfield.webp"),
    ("Dr. James Okafor", "a professional Black man in his 40s, doctor, wearing a white coat or suit",            "james-okafor.webp"),
    ("Aisha Patel",      "a professional South Asian woman in her 30s, attorney, formal business suit",          "aisha-patel.webp"),
    ("Luna Bergstrom",   "a professional Scandinavian woman in her late 20s, UX designer, modern casual",        "luna-bergstrom.webp"),
    ("Carlos Mendez",    "a professional Latino man in his 40s, chef, wearing chef whites or smart attire",      "carlos-mendez.webp"),
    ("Grace O'Brien",    "a professional Irish woman in her 30s, marketing director, professional attire",       "grace-obrien.webp"),
    ("Victoria Novak",   "a professional Eastern European woman in her 30s, interior designer, elegant attire",  "victoria-novak.webp"),
    ("Yuki Tanaka",      "a professional Japanese person in their late 20s, graphic designer, creative attire",  "yuki-tanaka.webp"),
]

if __name__ == "__main__":
    import sys
    only = sys.argv[1] if len(sys.argv) > 1 else None

    print("=== Generating Logos ===")
    for company, hint, fname in logos:
        if only and only not in fname:
            continue
        generate_logo(company, hint, fname)

    print("\n=== Generating Portraits ===")
    for name, desc, fname in portraits:
        if only and only not in fname:
            continue
        generate_portrait(name, desc, fname)

    print("\nDone!")
