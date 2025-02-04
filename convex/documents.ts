import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";

export const create = mutation({
  args: { title: v.optional(v.string()), initialContent: v.optional(v.string()) },
  handler: async (ctx, args) => {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    return await ctx.db.insert("documents", {
      title: args.title ?? "untitled coument",
      ownerId: user.subject,
      initialContent: args.initialContent
    });
  }
})

export const getDocuments = query({
  handler: async (ctx) => {
    return await ctx.db.query("documents").collect();
  },
});

export const get = query({
  args: { paginationOpts: paginationOptsValidator },
  handler: async (ctx, args) => {
    const foo = await ctx.db
      .query("documents")
      .order("desc")
      .paginate(args.paginationOpts);
    return foo;
  },
})

export const removeById = mutation({
  args: { id: v.id("documents") },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.id);
    if (!document) throw new ConvexError("Document not found");

    const isOwner = document.ownerId === user.subject;
    if (!isOwner) throw new ConvexError("Unauthorized");

    return await ctx.db.delete(args.id);
  },
})

export const updateById = mutation({
  args: { id: v.id("documents"), title: v.string() },
  async handler(ctx, args) {
    const user = await ctx.auth.getUserIdentity();
    if (!user) throw new ConvexError("Unauthorized");

    const document = await ctx.db.get(args.id);
    if (!document) throw new ConvexError("Document not found");

    const isOwner = document.ownerId === user.subject;
    if (!isOwner) throw new ConvexError("Unauthorized");

    return await ctx.db.patch(args.id, { title: args.title });
  },
})