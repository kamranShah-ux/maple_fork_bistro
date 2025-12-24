import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { createReservation, getReservations } from "./db";

export const appRouter = router({
    // if you need to use socket.io, read and register route in server/_core/index.ts, all api should start with '/api/' so that the gateway can route correctly
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  reservations: router({
    create: publicProcedure
      .input(z.object({
        guestName: z.string().min(1, "Name is required"),
        guestEmail: z.string().email("Valid email is required"),
        guestPhone: z.string().min(10, "Valid phone number is required"),
        partySize: z.number().int().min(1).max(20),
        reservationDate: z.date(),
        specialRequests: z.string().optional(),
      }))
      .mutation(async ({ input }) => {
        try {
          const result = await createReservation({
            guestName: input.guestName,
            guestEmail: input.guestEmail,
            guestPhone: input.guestPhone,
            partySize: input.partySize,
            reservationDate: input.reservationDate,
            specialRequests: input.specialRequests || null,
            status: "pending",
          });
          return { success: true, message: "Reservation created successfully!" };
        } catch (error) {
          console.error("Failed to create reservation:", error);
          throw new Error("Failed to create reservation. Please try again.");
        }
      }),
    list: publicProcedure
      .input(z.object({
        limit: z.number().default(50),
        offset: z.number().default(0),
      }))
      .query(async ({ input }) => {
        try {
          const reservationsList = await getReservations(input.limit, input.offset);
          return reservationsList;
        } catch (error) {
          console.error("Failed to fetch reservations:", error);
          return [];
        }
      }),
  }),
});

export type AppRouter = typeof appRouter;
