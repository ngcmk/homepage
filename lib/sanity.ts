import imageUrlBuilder from "@sanity/image-url";

export const sanityProjectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "l9cwvtr7";
export const sanityDataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

const builder = imageUrlBuilder({ projectId: sanityProjectId, dataset: sanityDataset });

export function urlFor(source: any) {
  return builder.image(source);
}

export async function sanityQuery<T>(query: string, params: Record<string, string> = {}): Promise<T> {
  const search = new URLSearchParams();
  search.set("query", query);
  for (const [key, value] of Object.entries(params)) search.set(`$${key}`, JSON.stringify(value));
  const url =
    `https://${sanityProjectId}.api.sanity.io/v2025-02-19/data/query/${sanityDataset}?${search.toString()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Sanity query failed: ${res.status}`);
  const json = await res.json();
  return json.result as T;
}
