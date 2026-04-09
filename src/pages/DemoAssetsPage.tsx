import { useEffect } from 'react';

const portraits = [
  { file: 'aisha-patel.webp', name: 'Aisha Patel' },
  { file: 'carlos-mendez.webp', name: 'Carlos Mendez' },
  { file: 'emily-whitfield.webp', name: 'Emily Whitfield' },
  { file: 'grace-obrien.webp', name: "Grace O'Brien" },
  { file: 'james-okafor.webp', name: 'James Okafor' },
  { file: 'luna-bergstrom.webp', name: 'Luna Bergström' },
  { file: 'marcus-rodriguez.webp', name: 'Marcus Rodriguez' },
  { file: 'sarah-chen.webp', name: 'Sarah Chen' },
  { file: 'victoria-novak.webp', name: 'Victoria Novak' },
  { file: 'yuki-tanaka.webp', name: 'Yuki Tanaka' },
];

const logos = [
  { file: 'bloom-agency.webp', name: 'Bloom Agency' },
  { file: 'brennan-capital.webp', name: 'Brennan Capital' },
  { file: 'cloudscale.webp', name: 'CloudScale' },
  { file: 'elevation-design.webp', name: 'Elevation Design Co.' },
  { file: 'foster-visuals.webp', name: 'Foster Visuals' },
  { file: 'heritage-brewing.webp', name: 'Heritage Brewing Co.' },
  { file: 'infracore.webp', name: 'InfraCore' },
  { file: 'meridian-wealth.webp', name: 'Meridian Wealth' },
  { file: 'metro-heart.webp', name: 'Metro Heart Institute' },
  { file: 'nexus-dynamics.webp', name: 'Nexus Dynamics' },
  { file: 'novak-interiors.webp', name: 'Novak Interiors' },
  { file: 'patel-associates.webp', name: 'Patel & Associates' },
  { file: 'pixel-flow.webp', name: 'Pixel & Flow' },
  { file: 'prism-studio.webp', name: 'Prism Studio' },
  { file: 'quantum-analytics.webp', name: 'Quantum Analytics' },
  { file: 'serenity-wellness.webp', name: 'Serenity Wellness' },
  { file: 'soundwave-studios.webp', name: 'Soundwave Studios' },
  { file: 'summit-realty.webp', name: 'Summit Realty Group' },
  { file: 'tierra-restaurant.webp', name: 'Tierra Restaurant' },
  { file: 'vertex-labs.webp', name: 'Vertex Labs' },
];

export default function DemoAssetsPage() {
  useEffect(() => {
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    return () => { document.head.removeChild(meta); };
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-1">Demo Assets</h1>
      <p className="text-sm text-slate-500 mb-10">Internal review page — not linked from the site.</p>

      {/* Portraits */}
      <section className="mb-14">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">
          Portraits <span className="text-slate-400 font-normal text-sm">({portraits.length})</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {portraits.map(({ file, name }) => (
            <div key={file} className="flex flex-col items-center gap-2 text-center">
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm">
                <img
                  src={`/images/portraits/${file}`}
                  alt={name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 leading-tight">{name}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{file}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Logos */}
      <section>
        <h2 className="text-lg font-semibold text-slate-800 mb-4 pb-2 border-b border-slate-200">
          Logos <span className="text-slate-400 font-normal text-sm">({logos.length})</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {logos.map(({ file, name }) => (
            <div key={file} className="flex flex-col items-center gap-2 text-center">
              <div className="w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm flex items-center justify-center p-3" style={{ aspectRatio: '2/1' }}>
                <img
                  src={`/images/logos/${file}`}
                  alt={name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-700 leading-tight">{name}</p>
                <p className="text-xs text-slate-400 font-mono mt-0.5">{file}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
