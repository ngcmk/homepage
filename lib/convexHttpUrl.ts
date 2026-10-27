export function convexHttpUrl(): string {
  const explicit=process.env.NEXT_PUBLIC_CONVEX_HTTP_URL;
  if(explicit) return explicit.replace(/\/$/,"");
  const cloud=process.env.NEXT_PUBLIC_CONVEX_URL;
  if(!cloud) throw new Error("Missing NEXT_PUBLIC_CONVEX_URL");
  return cloud.replace(/\.convex\.cloud\/?$/, ".convex.site").replace(/\/$/,"");
}
