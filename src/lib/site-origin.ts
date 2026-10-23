/** Invalid deployment settings must not crash metadata or the build. */
export function parseSiteOrigin(value: string | undefined): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(value.trim());
    if (
      !["http:", "https:"].includes(url.protocol) ||
      url.username ||
      url.password
    )
      return undefined;
    return url.origin;
  } catch {
    return undefined;
  }
}

export function resolveSiteOrigin(
  configured: string | undefined,
  productionHost: string | undefined,
): string | undefined {
  return (
    parseSiteOrigin(configured) ??
    parseSiteOrigin(productionHost ? `https://${productionHost}` : undefined)
  );
}
