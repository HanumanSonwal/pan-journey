import { z } from "zod";

const guestFieldsSchema = z.object({
  title: z.string().min(1, "Select gender"),
  firstName: z.string().trim().min(2, "First name required"),
  lastName: z.string().trim().optional(),
  email: z.string().email("Enter valid email"),
  mobile: z.string().regex(/^[0-9]{10}$/, "Enter valid mobile"),
  phoneCode: z.string().optional(),
});

export const primaryGuestSchema = z.object({
  bookingFor: z.string(),
  customerAddress: z.string().trim().min(2, "Address required"),
  customerPostalCode: z
    .string()
    .trim()
    .regex(/^[0-9]{6}$/, "Enter valid postal code"),
  panNumber: z.string().trim().optional(),
  paxDetails: z.record(guestFieldsSchema),
});

export const guestSchema = guestFieldsSchema.extend({
  isChild: z.boolean().optional(),
});
