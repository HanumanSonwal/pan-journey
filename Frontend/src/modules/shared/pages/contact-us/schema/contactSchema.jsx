import { z } from "zod";

export const contactSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  bookingRefId: z.string().min(1, "Please enter a booking reference ID"),
  fullName: z
    .string()
    .trim()
    .min(3, "Full Name must be at least 3 characters")
    .max(100, "Full Name is too long"),

  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  subject: z
    .string()
    .trim()
    .min(3, "Subject must be at least 3 characters")
    .max(200, "Subject is too long"),

  message: z.string().trim().optional(),
});
