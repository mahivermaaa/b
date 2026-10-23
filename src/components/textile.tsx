export function Textile({
  variant = 0,
  hero = false,
}: {
  variant?: number;
  hero?: boolean;
}) {
  return (
    <div
      className={`textile textile-${variant % 4} ${hero ? "textile-hero" : ""}`}
      role="img"
      aria-label="Abstract woven textile illustration; not a product photograph"
    >
      <div className="cloth cloth-back" />
      <div className="cloth cloth-front">
        <div className="cloth-border" />
        <div className="motifs">
          {Array.from({ length: 24 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
      {hero && (
        <>
          <div className="textile-seal">
            <span>বুননবাড়ি</span>
            <small>BENGAL TO YOUR BUSINESS</small>
          </div>
          <span className="visual-caption">
            A STUDY IN THREAD & TRADITION · ILLUSTRATION
          </span>
        </>
      )}
    </div>
  );
}
