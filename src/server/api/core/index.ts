import { and, eq } from "drizzle-orm";
import { z } from "zod";

import { ApiKey, genId } from "@/schema/schema";
import { createTRPCRouter, protectedProcedure  } from "../trpc";

export const coreRouter = createTRPCRouter({
  getApiKeys: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db
      .select({ key: ApiKey.key })
      .from(ApiKey)
      .where(eq(ApiKey.userId, ctx.user.id));
  }),
  rollApiKey: protectedProcedure
    .input(z.object({ apiKey: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db
        .delete(ApiKey)
        .where(
          and(eq(ApiKey.userId, ctx.user.id), eq(ApiKey.key, input.apiKey)),
        );
      const apiKey = genId.apikey();
      await ctx.db.insert(ApiKey).values({
        userId: ctx.user.id,
        key: apiKey,
      });
      return apiKey;
    }),
});
