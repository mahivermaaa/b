"use client";
export default function Error({ reset }: { reset: () => void }) {
  return (
    <main id="main" className="page-intro">
      <h1>
        A little
        <br />
        <em>interruption.</em>
      </h1>
      <p>We couldn’t load this page. Please try again.</p>
      <button className="button" onClick={reset}>
        Try again ↗︎
      </button>
    </main>
  );
}
