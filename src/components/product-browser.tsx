"use client";
import { useState } from "react";
import type { Product } from "@/types/catalogue";
import { ProductCard } from "./product-card";

const STEP = 50;
const MIN_PRICE = 1000; // the price bar always starts at ₹1,000
const money = (n: number) => `₹${n.toLocaleString("en-IN")}`;

type Option = { key: string; label: string; on: boolean; toggle: () => void };
type Group = { key: string; label: string; on: boolean; options: Option[] };

const toggle = (list: string[], value: string) =>
  list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

function PriceSlider({
  min,
  max,
  lo,
  hi,
  onChange,
}: {
  min: number;
  max: number;
  lo: number;
  hi: number;
  onChange: (lo: number, hi: number) => void;
}) {
  const pct = (value: number) => ((value - min) / (max - min)) * 100;
  return (
    <div className="price-slider">
      <div className="price-values">
        <span>{money(lo)}</span>
        <span>{money(hi)}</span>
      </div>
      <div className="price-track">
        <div
          className="price-fill"
          style={{ left: `${pct(lo)}%`, width: `${pct(hi) - pct(lo)}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={STEP}
          value={lo}
          aria-label="Minimum price"
          onChange={(event) =>
            onChange(Math.min(Number(event.target.value), hi - STEP), hi)
          }
        />
        <input
          type="range"
          min={min}
          max={max}
          step={STEP}
          value={hi}
          aria-label="Maximum price"
          onChange={(event) =>
            onChange(lo, Math.max(Number(event.target.value), lo + STEP))
          }
        />
      </div>
    </div>
  );
}

export function ProductBrowser({
  products,
  variant,
}: {
  products: Product[];
  variant: number;
}) {
  const [inStock, setInStock] = useState(false);
  const [range, setRange] = useState<[number, number] | null>(null);
  const [fabrics, setFabrics] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const allFabrics = [...new Set(products.map((p) => p.fabric).filter(Boolean))] as string[];
  const allColors = [...new Set(products.map((p) => p.color).filter(Boolean))] as string[];

  const prices = products
    .map((p) => p.price)
    .filter((price): price is number => price != null);
  const min = Math.min(MIN_PRICE, Math.floor(Math.min(...prices) / STEP) * STEP);
  const max = Math.ceil(Math.max(...prices) / STEP) * STEP;
  const hasPrices = prices.length > 0 && max - min > STEP;
  const lo = range ? range[0] : min;
  const hi = range ? range[1] : max;
  const priceActive = hasPrices && (lo > min || hi < max);

  const shown = products.filter((p) => {
    if (inStock && p.available === false) return false;
    if (priceActive && (p.price == null || p.price < lo || p.price > hi)) return false;
    if (fabrics.length && !(p.fabric && fabrics.includes(p.fabric))) return false;
    if (colors.length && !(p.color && colors.includes(p.color))) return false;
    return true;
  });

  const slider = hasPrices ? (
    <PriceSlider
      min={min}
      max={max}
      lo={lo}
      hi={hi}
      onChange={(nextLo, nextHi) => setRange([nextLo, nextHi])}
    />
  ) : null;

  const groups: Group[] = [
    {
      key: "availability",
      label: "Availability",
      on: inStock,
      options: [
        {
          key: "stock",
          label: "In stock",
          on: inStock,
          toggle: () => setInStock(!inStock),
        },
      ],
    },
    {
      key: "color",
      label: "Colors",
      on: colors.length > 0,
      options: allColors.map((color) => ({
        key: color,
        label: color,
        on: colors.includes(color),
        toggle: () => setColors(toggle(colors, color)),
      })),
    },
    {
      key: "fabric",
      label: "Fabric",
      on: fabrics.length > 0,
      options: allFabrics.map((fabric) => ({
        key: fabric,
        label: fabric,
        on: fabrics.includes(fabric),
        toggle: () => setFabrics(toggle(fabrics, fabric)),
      })),
    },
    ...(hasPrices
      ? [{ key: "price", label: "Prices", on: priceActive, options: [] }]
      : []),
  ];
  const openGroup = groups.find((group) => group.key === openKey);
  const active = inStock || priceActive || fabrics.length + colors.length > 0;

  return (
    <div className="shop-layout">
      <aside className="shop-filters" aria-label="Browse by option">
        <div className="browse-inline">
          <h2>Browse by</h2>
          <div className="browse-options">
            {groups.map((group) => (
              <button
                key={group.key}
                type="button"
                aria-expanded={openKey === group.key}
                className={openKey === group.key ? "is-open" : undefined}
                onClick={() =>
                  setOpenKey(openKey === group.key ? null : group.key)
                }
              >
                {group.label}
                {group.on ? " •" : ""}
              </button>
            ))}
          </div>
          {openGroup && openGroup.key === "price" && (
            <div className="browse-sub">{slider}</div>
          )}
          {openGroup && openGroup.key !== "price" && (
            <div className="browse-options browse-sub">
              {openGroup.options.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  aria-pressed={option.on}
                  className={option.on ? "is-on" : undefined}
                  onClick={option.toggle}
                >
                  {option.label}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="filter-groups">
          <details className="filter-group">
            <summary>Availability</summary>
            <label>
              <input
                type="checkbox"
                checked={inStock}
                onChange={() => setInStock(!inStock)}
              />
              In stock
            </label>
          </details>
          {hasPrices && (
            <details className="filter-group">
              <summary>Price</summary>
              {slider}
            </details>
          )}
          <details className="filter-group">
            <summary>Fabric</summary>
            {allFabrics.map((fabric) => (
              <label key={fabric}>
                <input
                  type="checkbox"
                  checked={fabrics.includes(fabric)}
                  onChange={() => setFabrics(toggle(fabrics, fabric))}
                />
                {fabric}
              </label>
            ))}
          </details>
          <details className="filter-group">
            <summary>Color</summary>
            {allColors.map((color) => (
              <label key={color}>
                <input
                  type="checkbox"
                  checked={colors.includes(color)}
                  onChange={() => setColors(toggle(colors, color))}
                />
                {color}
              </label>
            ))}
          </details>
        </div>
        {active && (
          <button
            type="button"
            className="filter-clear"
            onClick={() => {
              setInStock(false);
              setRange(null);
              setFabrics([]);
              setColors([]);
            }}
          >
            Clear all filters
          </button>
        )}
      </aside>
      <div className="shop-results">
        <p className="shop-count">
          {shown.length} {shown.length === 1 ? "product" : "products"}
        </p>
        {shown.length > 0 ? (
          <div className="product-grid">
            {shown.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                variant={variant}
              />
            ))}
          </div>
        ) : (
          <p className="shop-empty">No products match these filters.</p>
        )}
      </div>
    </div>
  );
}
