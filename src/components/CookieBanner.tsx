import { useState, useEffect } from 'react';

const CONSENT_KEY = 'bcard-cookie-consent';
const GA_ID = 'G-0RBZ89HBF7';

function loadGoogleAnalytics() {
  // Avoid double-loading
  if (document.getElementById('ga-script')) return;

  const script = document.createElement('script');
  script.id = 'ga-script';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  const inline = document.createElement('script');
  inline.id = 'ga-inline';
  inline.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${GA_ID}');
  `;
  document.head.appendChild(inline);
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    } else if (consent === 'accepted') {
      loadGoogleAnalytics();
    }

    function handleShowBanner() { setVisible(true); }
    window.addEventListener('bcard-show-cookie-banner', handleShowBanner);
    return () => window.removeEventListener('bcard-show-cookie-banner', handleShowBanner);
  }, []);

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    loadGoogleAnalytics();
    setVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900 text-slate-200 px-4 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <p className="text-sm flex-1">
          We use cookies to analyze site traffic via Google Analytics. Accept to enable analytics, or decline to browse without tracking.
        </p>
        <div className="flex gap-2 shrink-0">
          <button
            onClick={handleAccept}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={handleDecline}
            className="px-4 py-2 bg-slate-700 text-slate-200 text-sm font-medium rounded-lg hover:bg-slate-600 transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
