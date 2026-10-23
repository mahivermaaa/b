import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import { CollectionCard } from "@/components/collection-card";
import { FAQList, FinalCTA } from "@/components/sections";
import { heroVideo } from "@/lib/config";
export default function Home() {
  return (
    <main id="main" className="homepage">
      <section className="hero">
        <div className="hero-art">
          {heroVideo.enabled && heroVideo.src ? (
            <video
              className="hero-video"
              controls
              playsInline
              preload="none"
              poster={heroVideo.poster ?? undefined}
            >
              <source src={heroVideo.src} />
            </video>
          ) : (
            <Image
              src="/images/editorial/bengal-campaign.webp"
              alt="Illustrative campaign still life of burgundy and ivory textiles in a heritage interior; not actual Bunonbari stock"
              fill
              preload
              sizes="100vw"
              quality={80}
            />
          )}
        </div>
        <div className="hero-shade" aria-hidden="true" />
        <div className="hero-copy">
          <div className="eyebrow">
            <span className="eyebrow-line" /> BENGAL HANDLOOM COLLECTIONS
          </div>
          <h1>
            <span>Pure Handloom</span>
            <em>Sarees.</em>
          </h1>
          <div className="hero-poetry">
            A story in every weave. A connection in every collection.
          </div>
          <p>
            Explore traditional Bengal handloom saree collections for boutiques,
            stores and resellers. Connect with our team over a WhatsApp video
            call to view current stock and choose your collection.
          </p>
          <div className="hero-actions">
            <Link href="/contact#viewing" className="button">
              Schedule a Video Call <span>↗︎</span>
            </Link>
            <Link className="text-link" href="/collections">
              Explore Collections <span>→</span>
            </Link>
          </div>
        </div>
        <span className="hero-side-note">
          ROOTED IN BENGAL
          <br />
          CHOSEN FOR YOUR BUSINESS
        </span>
        <div className="hero-bottom">
          <span className="campaign-caption">
            AI-CREATED CAMPAIGN VISUAL · NOT PRODUCT STOCK
          </span>
        </div>
      </section>
      <section className="section featured" id="collection-edit">
        <div className="section-heading">
          <div>
            <h2>
              The art of the weave.
              <br />
              <em>The start of your collection.</em>
            </h2>
          </div>
          <Link className="text-link" href="/collections">
            View All Collections <span>↗︎</span>
          </Link>
        </div>
        <div className="collection-grid featured-grid">
          {categories
            .filter((c) => c.featured)
            .map((c) => (
              <CollectionCard category={c} key={c.id} />
            ))}
        </div>
        <p className="image-disclaimer">
          AI-created mood studies, not Bunonbari product photographs. View
          actual designs and current stock with our team.
        </p>
      </section>
      <section className="story-section story-backdrop">
        <div className="story-image">
          <Image
            src="/images/editorial/thread-story.webp"
            alt="AI-created textile still life with a wooden shuttle and cotton threads; conceptual artwork, not a Bunonbari facility"
            fill
            sizes="100vw"
          />
          <span className="story-image-caption">
            A STUDY IN THREAD & TRADITION · ILLUSTRATIVE
          </span>
        </div>
        <div className="story-copy">
          <div className="eyebrow">THE THREAD THAT CONNECTS US</div>
          <h2>
            A story in
            <br />
            every thread.
            <br />
            <em>A person behind it.</em>
          </h2>
          <p>
            We work from Pune, in direct connection with weavers in West Bengal.
            Bringing handloom collections to the boutiques, stores and resellers
            who give them their next chapter.
          </p>
          <p>
            See the weave. Find your colours. Ask your questions. Our team
            brings the collection to you, one personal video call at a time.
          </p>
          <Link className="text-link" href="/why-us">
            Discover Our Story <span>↗︎</span>
          </Link>
        </div>
      </section>
      <section className="ordering section">
        <div className="section-heading">
          <div>
            <div className="eyebrow">A SIMPLE, PERSONAL PROCESS</div>
            <h2>
              Your next collection,
              <br />
              <em>one conversation away.</em>
            </h2>
          </div>
          <p>
            From first look to final selection, our team
            <br className="desktop-break" /> is here to guide you.
          </p>
        </div>
        <div className="steps">
          {[
            [
              "Explore Collections",
              "Find the collections that speak to your business.",
            ],
            [
              "Request a Video Call",
              "Share your business details and a preferred time.",
            ],
            [
              "View Available Stock",
              "See current designs live with our team on WhatsApp.",
            ],
            [
              "Confirm Your Order",
              "Coordinate your selection, payment and dispatch directly.",
            ],
          ].map(([title, body], i) => (
            <article key={title}>
              <div className="step-top">
                <span>0{i + 1}</span>
                <span aria-hidden="true">→</span>
              </div>
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section faq-section">
        <div>
          <div className="eyebrow">A LITTLE CLARITY</div>
          <h2>
            Before we <em>begin.</em>
          </h2>
          <p>
            Answers to the things you may be wondering.
          </p>
          <Link href="/faqs" className="text-link">
            All FAQs <span>↗︎</span>
          </Link>
        </div>
        <FAQList />
      </section>
      <FinalCTA />
    </main>
  );
}
