
import { db } from "@/db";
import { agents } from "@/db/schema";
import { createTRPCRouter, baseProcedure, protectedProcedure } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { agentsInsertSchema } from "../schemas";
import { z } from "zod";
import { eq, getTableColumns } from "drizzle-orm";

export const agentsRouter = createTRPCRouter({
        getOne: protectedProcedure.input(z.object({id: z.string()})).query(async({input})=>{
        const [existingAgent] = await db
        .select({
            ...getTableColumns(agents), 
        })
        .from(agents)
        .where(eq(agents.id, input.id));

  
        return existingAgent || null;
    }),
    // TOODO: Implement "GETMANY" TO USE "PROTECTED PROCEDURE"
    getMany: protectedProcedure.query(async()=>{
        const data = await db
        .select()
        .from(agents)

  
        return data
    }),
    create: protectedProcedure
    .input(agentsInsertSchema)
    .mutation(async({input,ctx})=>{
        const [createdAgent] = await db
        .insert(agents)
        .values({
            ...input,
            userId: ctx.auth.user.id
        })
        .returning()
        return createdAgent
    })
});