import { Link } from 'react-router-dom';

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
      <Link to="/" className="text-sm text-blue-600 hover:text-blue-800 mb-6 inline-block">&larr; Back to Home</Link>

      <h1 className="text-3xl font-bold text-slate-900 mb-6">Terms of Service</h1>
      <p className="text-sm text-slate-500 mb-8">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

      <div className="prose prose-slate max-w-none space-y-6 text-slate-700 text-sm leading-relaxed">
        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Acceptance</h2>
          <p>By using BCard, you agree to these Terms of Service. If you do not agree, please do not use the application.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Description of Service</h2>
          <p>BCard is a free, client-side business card design tool. It provides templates, customization tools, and export functionality. The service runs entirely in your web browser.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Your Content</h2>
          <p>You retain all rights to the content you create using BCard, including your business card designs, uploaded images, and entered data. BCard does not claim any ownership over your content.</p>
          <p className="mt-2">You are responsible for ensuring you have the right to use any images, logos, or other content you upload to the application.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Templates</h2>
          <p>The business card templates provided by BCard are available for personal and commercial use. You may use generated business cards for any lawful purpose. Templates may not be redistributed as a template pack or competing product.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Disclaimer of Warranties</h2>
          <p>BCard is provided "as is" without warranties of any kind. We do not guarantee that the service will be uninterrupted, error-free, or that exported files will be compatible with all printing services.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Limitation of Liability</h2>
          <p>BCard shall not be liable for any indirect, incidental, or consequential damages arising from the use of this service, including but not limited to printing errors, data loss from browser storage clearing, or compatibility issues with third-party services.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Data Loss</h2>
          <p>Since all data is stored locally in your browser, clearing your browser data, using incognito/private mode, or switching browsers will result in loss of saved work. BCard is not responsible for data loss. We recommend using the JSON export feature to create backups of important designs.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Analytics</h2>
          <p>We use Google Analytics for aggregate usage statistics. By accepting cookies via the cookie banner, you consent to analytics data collection as described in our <Link to="/privacy" className="text-blue-600 hover:text-blue-800">Privacy Policy</Link>. You may decline analytics at any time and continue using BCard without tracking.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900 mt-8 mb-3">Changes</h2>
          <p>These terms may be updated at any time. Continued use of BCard after changes constitutes acceptance of the revised terms.</p>
        </section>
      </div>
    </div>
  );
}
