'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="de">
      <body className="font-sans antialiased">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center" style={{ backgroundColor: '#fafafa' }}>
          <h1 className="text-6xl font-bold" style={{ color: '#dc2626' }}>Fehler</h1>
          <h2 className="mt-4 text-2xl font-semibold">Etwas ist schiefgelaufen</h2>
          <p className="mt-2" style={{ color: '#737373' }}>
            Bitte versuchen Sie es erneut oder kontaktieren Sie uns.
          </p>
          <button
            onClick={() => reset()}
            className="mt-8 inline-flex items-center justify-center rounded-md px-6 py-3 text-sm font-medium transition-colors"
            style={{ backgroundColor: '#171717', color: '#fafafa' }}
          >
            Erneut versuchen
          </button>
        </div>
      </body>
    </html>
  );
}
