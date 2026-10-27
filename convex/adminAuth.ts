import type { QueryCtx, MutationCtx } from "./_generated/server";

export async function requireSuperAdmin(ctx: QueryCtx | MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) throw new Error("Unauthorized");

  const allowed = (process.env.ADMIN_CLERK_USER_IDS ?? "")
    .split(",").map(id => id.trim()).filter(Boolean);

  if (!allowed.includes(identity.subject)) {
    throw new Error("Forbidden: Super Admin only");
  }

  return identity;
}
