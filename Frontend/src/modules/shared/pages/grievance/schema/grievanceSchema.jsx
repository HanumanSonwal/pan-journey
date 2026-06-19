import { z } from "zod";

export const grievanceSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name cannot exceed 100 characters"),

  email: z.string().trim().email("Please enter a valid email address"),

  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit mobile number"),

  bookingRefNo: z.string().trim().optional(),

  supportTicketId: z.string().trim().optional(),

  category: z.string().min(1, "Please select an issue category"),

  subject: z
    .string()
    .trim()
    .min(5, "Subject must be at least 5 characters")
    .max(150, "Subject cannot exceed 150 characters"),

  description: z.string().trim().optional(),
});
