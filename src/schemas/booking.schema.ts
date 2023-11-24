import { z } from "zod";

export const bookingSchema = z.object({
  propertyId: z.string().uuid(),
  dateRange: z
    .object(
      {
        from: z.date(),
        to: z.date(),
      },
      {
        required_error: "Please select a valid period.",
      }
    )
    .refine((o) => o.to > o.from),
});

export type BookingParams = z.infer<typeof bookingSchema>;
