import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireSuperAdmin } from "./adminAuth";

export const submit = mutation({
  args: {editToken:v.string(),contactName:v.optional(v.string()),contactEmail:v.optional(v.string()),company:v.string(), industry:v.string(), language:v.union(v.literal("mk"),v.literal("en"),v.literal("sr")),
    answers:v.array(v.array(v.string())), answersText:v.string(), note:v.string(), recommendation:v.string(),
    solutionName:v.string(),problem:v.string(),proposedSolution:v.string(),benefits:v.array(v.string())},
  handler: async (ctx,args) => {
    if(args.answers.length!==5 || args.answers.some(a=>a.length===0)) throw new Error("Incomplete assessment");
    if(args.company.length>100 || args.note.length>600 || args.answersText.length>8000 || args.industry.length>120) throw new Error("Input too long");
    if(args.contactName && (args.contactName.length>100 || !args.contactEmail || args.contactEmail.length>200 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.contactEmail))) throw new Error("Invalid contact");
    return await ctx.db.insert("businessChecks",{...args,status:"new",createdAt:Date.now()});
  }
});
export const list = query({args:{},handler:async ctx=>{await requireSuperAdmin(ctx);return await ctx.db.query("businessChecks").withIndex("by_created_at").order("desc").take(500);}});
export const updateStatus = mutation({args:{id:v.id("businessChecks"),status:v.union(v.literal("new"),v.literal("in_progress"),v.literal("contacted"),v.literal("closed"))},handler:async(ctx,args)=>{await requireSuperAdmin(ctx);await ctx.db.patch(args.id,{status:args.status});}});

// A random per-assessment token is required to add optional contact details.
// The public route cannot modify arbitrary assessments using just an ID.
export const addContact = mutation({
  args:{id:v.id("businessChecks"),editToken:v.string(),contactName:v.string(),contactEmail:v.string()},
  handler:async(ctx,args)=>{
    const item=await ctx.db.get(args.id);
    if(!item || !item.editToken || item.editToken!==args.editToken) throw new Error("Invalid assessment token");
    if(args.contactName.length>100 || args.contactEmail.length>200 ||
       (args.contactEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(args.contactEmail))) throw new Error("Invalid contact");
    await ctx.db.patch(args.id,{contactName:args.contactName,contactEmail:args.contactEmail});
  }
});
