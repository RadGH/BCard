import { Link } from 'react-router-dom';
import { APP_VERSION } from '../../lib/version';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-400 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">BCard</h3>
            <p className="text-sm leading-relaxed">
              Create professional business cards in minutes. 200+ templates, full customization, print-ready exports. All free, all client-side.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-3">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-white transition-colors">Browse Templates</Link></li>
              <li><Link to="/editor" className="hover:text-white transition-colors">Card Editor</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wide mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>No account required</li>
              <li>Data stays in your browser</li>
              <li>Export as SVG, PDF, or PNG</li>
              <li>
                <a href="mailto:support@bcardbuilder.com" className="hover:text-white transition-colors">
                  support@bcardbuilder.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs">&copy; {year} BCard. All rights reserved. {APP_VERSION}</p>
          <p className="text-xs">
            Your card data never leaves your browser.
          </p>
        </div>
      </div>
    </footer>
  );
}
