import { Link } from 'react-router-dom';
import { getAllFrontLayouts, getAllBackLayouts } from '../templates/registry';
import ShowcaseGrid from '../components/showcase/ShowcaseGrid';

export default function HomePage() {
  const frontCount = getAllFrontLayouts().length;
  const backCount = getAllBackLayouts().length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <section className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 sm:mb-4">
          Professional Business Cards
        </h1>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto mb-4 sm:mb-6">
          {frontCount} front layouts, {backCount} back layouts — choose your structure, then customize colors, fonts, and save your style.
        </p>
        <Link
          to="/editor"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-base sm:text-lg font-medium no-underline hover:bg-blue-700 transition-colors"
        >
          Start Designing
        </Link>
      </section>

      <ShowcaseGrid />
    </div>
  );
}
