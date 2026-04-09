#!/usr/bin/env python3
"""Generate logos and portraits for bcard dummy data using OpenAI DALL-E 3."""

import os
import json
import base64
import time
import urllib.request
import urllib.error

API_KEY = "REDACTED_OPENAI_KEY"
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

def download_url(url, path):
    urllib.request.urlretrieve(url, path)

def generate_logo(company, industry_hint, filename):
    out_path = os.path.join(OUTPUT_LOGOS, filename)
    if os.path.exists(out_path):
        print(f"  [skip] {filename} already exists")
        return True
    prompt = (
        f"A single minimalist flat vector logo for a company called '{company}'. "
        f"{industry_hint}. "
        "Simple geometric shapes, 2-3 colors maximum, clean modern design, "
        "centered on white background, suitable for a business card. "
        "NO text, NO grid, NO multiple versions, NO mockups — just ONE single logo mark."
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
        download_url(url, out_path)
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
        download_url(url, out_path)
        print(f"  Saved: {filename}")
        time.sleep(1)
        return True
    except Exception as e:
        print(f"  ERROR generating {filename}: {e}")
        return False

# ─── Logos (20 companies from the 25 samples) ────────────────────────────────
logos = [
    ("Nexus Dynamics",        "tech startup, neural network nodes connected",           "nexus-dynamics.png"),
    ("Vertex Labs",           "software engineering lab, code brackets or lambda",      "vertex-labs.png"),
    ("Prism Studio",          "creative agency, triangular prism splitting light",       "prism-studio.png"),
    ("Metro Heart Institute", "medical cardiology, abstract heart outline",              "metro-heart.png"),
    ("Patel & Associates",    "law firm, scales of justice or column",                   "patel-associates.png"),
    ("Summit Realty Group",   "real estate, mountain peak or house silhouette",          "summit-realty.png"),
    ("Pixel & Flow",          "UX design agency, pixel grid flowing into curves",        "pixel-flow.png"),
    ("Meridian Wealth",       "financial advisory, compass rose or growth line",         "meridian-wealth.png"),
    ("CloudScale",            "cloud infrastructure SaaS, cloud with upward arrow",     "cloudscale.png"),
    ("Tierra Restaurant",     "upscale restaurant, leaf or fork and spoon",              "tierra-restaurant.png"),
    ("Foster Visuals",        "photography studio, abstract camera aperture",            "foster-visuals.png"),
    ("Quantum Analytics",     "data science AI, abstract atom or data nodes",            "quantum-analytics.png"),
    ("Bloom Agency",          "marketing agency, abstract flower bloom",                 "bloom-agency.png"),
    ("Elevation Design Co.",  "architecture firm, abstract building elevation sketch",   "elevation-design.png"),
    ("Serenity Wellness",     "wellness coaching, lotus flower or gentle wave",          "serenity-wellness.png"),
    ("InfraCore",             "DevOps infrastructure, abstract server rack or circuit",  "infracore.png"),
    ("Novak Interiors",       "interior design, abstract room corner or curved line",    "novak-interiors.png"),
    ("Brennan Capital",       "investment firm, bold B monogram or abstract growth bar", "brennan-capital.png"),
    ("Soundwave Studios",     "music production studio, stylized audio waveform",        "soundwave-studios.png"),
    ("Heritage Brewing Co.",  "craft brewery, hop cone or barrel silhouette",            "heritage-brewing.png"),
]

# ─── Portraits (10 people from the 25 samples) ───────────────────────────────
portraits = [
    ("Sarah Chen",       "a professional Asian woman in her 30s, CEO, wearing a sharp blazer",                   "sarah-chen.png"),
    ("Marcus Rodriguez", "a professional Latino man in his late 20s, software engineer, smart-casual attire",    "marcus-rodriguez.png"),
    ("Emily Whitfield",  "a creative professional white woman in her 30s, creative director, stylish attire",    "emily-whitfield.png"),
    ("Dr. James Okafor", "a professional Black man in his 40s, doctor, wearing a white coat or suit",             "james-okafor.png"),
    ("Aisha Patel",      "a professional South Asian woman in her 30s, attorney, formal business suit",          "aisha-patel.png"),
    ("Luna Bergstrom",   "a professional Scandinavian woman in her late 20s, UX designer, modern casual",        "luna-bergstrom.png"),
    ("Carlos Mendez",    "a professional Latino man in his 40s, chef, wearing chef whites or smart attire",      "carlos-mendez.png"),
    ("Grace O'Brien",    "a professional Irish woman in her 30s, marketing director, professional attire",        "grace-obrien.png"),
    ("Victoria Novak",   "a professional Eastern European woman in her 30s, interior designer, elegant attire",  "victoria-novak.png"),
    ("Yuki Tanaka",      "a professional Japanese person in their late 20s, graphic designer, creative attire",  "yuki-tanaka.png"),
]

print("=== Generating Logos ===")
for company, hint, fname in logos:
    generate_logo(company, hint, fname)

print("\n=== Generating Portraits ===")
for name, desc, fname in portraits:
    generate_portrait(name, desc, fname)

print("\nDone!")
