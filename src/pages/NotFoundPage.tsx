import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 text-center">
      <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
      <p className="text-slate-600 mb-6">Page not found.</p>
      <Link
        to="/"
        className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg no-underline hover:bg-blue-700 transition-colors"
      >
        Go Home
      </Link>
    </div>
  );
}
