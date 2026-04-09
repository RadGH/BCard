export interface AvailableFont {
  family: string;
  category: 'serif' | 'sans-serif' | 'display' | 'monospace';
  weights: number[];
}

export const availableFonts: AvailableFont[] = [
  // --- Serif ---
  { family: 'Playfair Display', category: 'serif', weights: [400, 500, 600, 700, 800, 900] },
  { family: 'Merriweather', category: 'serif', weights: [300, 400, 700, 900] },
  { family: 'DM Serif Display', category: 'serif', weights: [400] },
  { family: 'Cormorant Garamond', category: 'serif', weights: [300, 400, 500, 600, 700] },
  { family: 'Lora', category: 'serif', weights: [400, 500, 600, 700] },
  { family: 'Libre Baskerville', category: 'serif', weights: [400, 700] },
  { family: 'Crimson Text', category: 'serif', weights: [400, 600, 700] },
  { family: 'Bitter', category: 'serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Proza Libre', category: 'serif', weights: [400, 500, 600, 700, 800] },
  { family: 'Spectral', category: 'serif', weights: [200, 300, 400, 500, 600, 700, 800] },
  { family: 'Newsreader', category: 'serif', weights: [200, 300, 400, 500, 600, 700, 800] },
  { family: 'Literata', category: 'serif', weights: [200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Petrona', category: 'serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Crete Round', category: 'serif', weights: [400] },
  { family: 'EB Garamond', category: 'serif', weights: [400, 500, 600, 700, 800] },
  { family: 'Fraunces', category: 'serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Gloock', category: 'serif', weights: [400] },
  { family: 'Instrument Serif', category: 'serif', weights: [400] },
  { family: 'Libre Franklin', category: 'serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Bodoni Moda', category: 'serif', weights: [400, 500, 600, 700, 800, 900] },
  { family: 'Cinzel', category: 'serif', weights: [400, 500, 600, 700, 800, 900] },
  { family: 'Yeseva One', category: 'serif', weights: [400] },

  // --- Sans-Serif ---
  { family: 'Source Sans 3', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Montserrat', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Open Sans', category: 'sans-serif', weights: [300, 400, 500, 600, 700, 800] },
  { family: 'Raleway', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Lato', category: 'sans-serif', weights: [100, 300, 400, 700, 900] },
  { family: 'Poppins', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Inter', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Work Sans', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'DM Sans', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700] },
  { family: 'IBM Plex Sans', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700] },
  { family: 'Manrope', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700, 800] },
  { family: 'Archivo', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Josefin Sans', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700] },
  { family: 'Nunito', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Karla', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700, 800] },
  { family: 'Fira Sans', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Roboto', category: 'sans-serif', weights: [100, 300, 400, 500, 700, 900] },
  { family: 'Barlow', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Barlow Condensed', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Cabin', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { family: 'Figtree', category: 'sans-serif', weights: [300, 400, 500, 600, 700, 800, 900] },
  { family: 'Geologica', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Heebo', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Jost', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Lexend', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Mulish', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Noto Sans', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Outfit', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Plus Jakarta Sans', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700, 800] },
  { family: 'Public Sans', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Quicksand', category: 'sans-serif', weights: [300, 400, 500, 600, 700] },
  { family: 'Sora', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800] },
  { family: 'Ubuntu', category: 'sans-serif', weights: [300, 400, 500, 700] },
  { family: 'Urbanist', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Albert Sans', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Asap', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Atkinson Hyperlegible', category: 'sans-serif', weights: [400, 700] },
  { family: 'Didact Gothic', category: 'sans-serif', weights: [400] },
  { family: 'Hanken Grotesk', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Instrument Sans', category: 'sans-serif', weights: [400, 500, 600, 700] },
  { family: 'Readex Pro', category: 'sans-serif', weights: [200, 300, 400, 500, 600, 700] },
  { family: 'Red Hat Display', category: 'sans-serif', weights: [300, 400, 500, 600, 700, 800, 900] },
  { family: 'Rubik', category: 'sans-serif', weights: [300, 400, 500, 600, 700, 800, 900] },
  { family: 'Signika', category: 'sans-serif', weights: [300, 400, 500, 600, 700] },
  { family: 'Ysabeau', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Ysabeau Office', category: 'sans-serif', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },

  // --- Display ---
  { family: 'Oswald', category: 'display', weights: [200, 300, 400, 500, 600, 700] },
  { family: 'Space Grotesk', category: 'display', weights: [300, 400, 500, 600, 700] },
  { family: 'Archivo Black', category: 'display', weights: [400] },
  { family: 'Bebas Neue', category: 'display', weights: [400] },
  { family: 'Syne', category: 'display', weights: [400, 500, 600, 700, 800] },
  { family: 'Tenor Sans', category: 'display', weights: [400] },
  { family: 'Unbounded', category: 'display', weights: [200, 300, 400, 500, 600, 700, 800, 900] },
  { family: 'Wix Madefor Display', category: 'display', weights: [400, 500, 600, 700, 800] },
  { family: 'Ysabeau', category: 'display', weights: [100, 200, 300, 400, 500, 600, 700, 800, 900] },

  // --- Monospace ---
  { family: 'Source Code Pro', category: 'monospace', weights: [200, 300, 400, 500, 600, 700, 800, 900] },
];

// Deduplicate by family name (Ysabeau appears in both sans-serif and display above — keep one)
const _seen = new Set<string>();
export const uniqueAvailableFonts: AvailableFont[] = availableFonts.filter(f => {
  if (_seen.has(f.family)) return false;
  _seen.add(f.family);
  return true;
});

export const fontFamilyList: string[] = uniqueAvailableFonts.map(f => f.family);

export function getFontMeta(family: string): AvailableFont | undefined {
  return uniqueAvailableFonts.find(f => f.family === family);
}

export function getFontsByCategory(category: AvailableFont['category']): AvailableFont[] {
  return uniqueAvailableFonts.filter(f => f.category === category);
}
