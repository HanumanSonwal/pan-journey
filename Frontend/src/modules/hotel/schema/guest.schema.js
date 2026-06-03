import { z } from "zod";

export const primaryGuestSchema = z.object({
  bookingFor: z.string(),

  title: z.string().min(1, "Select gender"),

  firstName: z.string().trim().min(2, "First name required"),

  lastName: z.string().trim().min(1, "Last name required"),

  email: z.string().email("Enter valid email"),

  mobile: z.string().regex(/^[0-9]{10}$/, "Enter valid mobile"),
});

export const guestSchema = z.object({
  title: z.string().min(1, "Select gender"),

  firstName: z.string().trim().min(2, "First name required"),

  lastName: z.string().trim().min(1, "Last name required"),

  email: z.string().email("Enter valid email"),

  mobile: z.string().regex(/^[0-9]{10}$/, "Enter valid mobile"),

  isChild: z.boolean().optional(),
});
