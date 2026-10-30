import type { QueryCtx, MutationCtx } from "./_generated/server";

export async function requireSuperAdmin(ctx: QueryCtx | MutationCtx, sessionToken?: string) {
  if (sessionToken && sessionToken.length === 64) {
    const session = await ctx.db.query("adminSessions").withIndex("by_token", q => q.eq("token", sessionToken)).unique();
    if (session && session.expiresAt > Date.now()) return;
  }
  // Preserve existing Clerk access for other API consumers until migration is complete.
  const identity = await ctx.auth.getUserIdentity();
  const allowed = (process.env.ADMIN_CLERK_USER_IDS ?? "").split(",").map(x => x.trim()).filter(Boolean);
  if (!identity || !allowed.includes(identity.subject)) throw new Error("Unauthorized");
}
