import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 mb-6 inline-block">&larr; Back to Home</Link>

      <h1 className="text-3xl font-bold text-slate-900 mb-6">Privacy Policy</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Overview</h2>
          <p>Your business card data never leaves your browser. We use Google Analytics for aggregate site statistics only. BCard does not operate servers that receive, process, or store any of your personal information or business card data.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Data Storage</h2>
          <p>All data you enter into BCard is stored locally on your device using your browser's built-in storage mechanisms (localStorage and IndexedDB). This includes:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li>Business card field data (names, contact info, etc.)</li>
            <li>Uploaded images (photos, logos)</li>
            <li>Saved people, style presets, and card designs</li>
            <li>Your current working draft</li>
          </ul>
          <p className="mt-2">This data is accessible only to you through your browser. Clearing your browser data will permanently remove it.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">External Services</h2>
          <p>BCard uses the following external services:</p>
          <ul className="list-disc pl-6 mt-2 space-y-1">
            <li><strong>Google Fonts</strong> — BCard loads fonts from Google Fonts to render templates. This means your browser makes requests to Google's servers to download font files. Google's privacy policy governs how they handle those requests. No business card data is sent to Google.</li>
            <li><strong>Google Analytics</strong> — With your consent, BCard uses Google Analytics to understand how the site is used. See the Cookies &amp; Tracking section below for details.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Cookies &amp; Tracking</h2>
          <p>BCard uses Google Analytics to understand how the site is used. Analytics are only loaded if you consent via the cookie banner. Google Analytics may set cookies and collect usage data including pages visited, time on site, and general location. See <a href="https://policies.google.com/privacy" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">Google's privacy policy</a> for details. You can withdraw consent at any time by clearing your browser's localStorage (specifically the <code>bcard-cookie-consent</code> key).</p>
          <p className="mt-2">If you decline analytics, no tracking cookies are set and no analytics data is collected.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Exports</h2>
          <p>When you export a business card as SVG, PDF, or PNG, the file is generated entirely in your browser and downloaded directly to your device. No data is transmitted to any server during the export process.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Children's Privacy</h2>
          <p>BCard does not knowingly collect information from children under 13. The application does not collect any personal information from any user.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Changes</h2>
          <p>If this privacy policy changes, the updated version will be posted on this page with a revised date.</p>
        </section>
      </div>
    </div>
  );
}
