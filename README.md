# BCard - Business Card Generator

A client-side business card generator with 200+ templates, live preview, photo uploads, and print-quality SVG/PDF export. All data stays in your browser.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build for Production

```bash
npm run build
npm run preview
```

The `dist/` folder can be deployed to any static hosting (Netlify, Vercel, GitHub Pages, etc.).

## Technologies

| Technology | Purpose |
|---|---|
| React 19 | UI framework |
| TypeScript | Type safety |
| Vite | Build tool & dev server |
| Tailwind CSS v4 | Utility-first styling |
| react-router-dom | Client-side routing |
| IndexedDB (idb) | Client-side storage for saved cards & images |
| jsPDF + svg2pdf.js | PDF export |
| react-easy-crop | Image cropping |
| Google Fonts | Typography (loaded dynamically, embedded in exports) |

## Features

- **200+ Templates** generated from 15 layouts x 20 color schemes x 15 font pairings x 8 decoration styles
- **Live Preview** with instant updates as you type
- **Front & Back** card designs with separate back-of-card layouts
- **Color & Font Customization** override any template's colors or fonts
- **Photo Upload** for headshots, logos, and other image slots (stored client-side)
- **SVG Export** with embedded fonts (base64 woff2) for fully self-contained files
- **PDF Export** with front + back pages at print dimensions
- **Save & Load** cards via IndexedDB - persists across sessions
- **JSON Import/Export** for backup and sharing
- **Mobile-First** responsive design with touch-friendly controls
- **Print Quality** US standard 3.5" x 2" with 1/8" bleed area

## Card Dimensions

- Final size: 88.9 x 50.8 mm (3.5" x 2")
- With bleed: 95.25 x 57.15 mm
- Safe zone: 6.35 mm inset from edges
- SVG viewBox uses mm units (1 unit = 1 mm)

## Template System

Templates are generated combinatorially from independent building blocks:

- **Layouts** (15): left-aligned, centered, split-vertical, split-horizontal, sidebar-left, sidebar-right, header-footer, diagonal, asymmetric, corner-accent, banner, frame, overlay, minimal-edge, stacked
- **Color Schemes** (20): Ocean, Slate, Midnight, Navy, Charcoal, Sunset, Terra, Burgundy, Copper, Cream, Arctic, Sage, Lavender, Teal, Silver, Neon, Fire, Electric, Forest, Earth
- **Font Pairings** (15): Classic Serif, Modern Geometric, Elegant Thin, Friendly Modern, Clean Tech, Condensed Bold, Futuristic, Striking Contrast, Bold Uniform, Literary, Developer, Art Deco, Editorial, Academic, Transitional
- **Decorations** (8): None, Minimal Line, Subtle Border, Bold Stripe, Geometric Shapes, Gradient Wash, Corner Accents, Dot Pattern

Compatibility rules ensure only aesthetically coherent combinations are generated. Each template includes category tags (corporate, creative, minimal, bold, tech, medical, legal, etc.) for filtering.

## Project Structure

```
src/
├── types/          TypeScript interfaces
├── constants/      Dimensions, categories, sample data
├── templates/      Template engine
│   ├── layouts/         15 front + 4 back layout patterns
│   ├── color-schemes/   20 color schemes
│   ├── typography/      15 font pairings
│   ├── decorations/     8 decoration sets
│   ├── svg-components/  Reusable SVG sub-components
│   ├── generator.ts     Combinatorial template generator
│   └── registry.ts      Template lookup & filtering
├── components/     React UI components
│   ├── layout/          App shell, header
│   ├── showcase/        Home page template grid
│   └── editor/          Card editor, preview, panels
├── hooks/          Custom React hooks
├── lib/            Utilities (DB, export, fonts, images)
└── pages/          Route pages
```

## Roadmap

- [ ] AI-generated templates from the same data structure
- [ ] User accounts for cloud-synced cards
- [ ] Print & mail real cards via fulfillment partner
- [ ] QR code generation
- [ ] Image cropping UI
- [ ] Template search
- [ ] Dark mode

## Browser Support

Tested on modern browsers: Chrome, Firefox, Safari, Edge. Requires ES2020+ and IndexedDB support.

## License

MIT
