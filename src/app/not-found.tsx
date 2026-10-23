import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="page-intro not-found">
      <div className="eyebrow">404 / A THREAD OUT OF PLACE</div>
      <h1>
        Let’s find
        <br />
        <em>your way back.</em>
      </h1>
      <p>
        This page is not available. Discover our collection families instead.
      </p>
      <Link href="/collections" className="button">
        Explore Collections ↗︎
      </Link>
    </main>
  );
}
