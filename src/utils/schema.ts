import * as z from "zod";

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .trim(),
    lastName: z
      .string()
      .min(2, "First name must be at least 2 characters")
      .trim(),
    email: z
      .string()
      .email("Please enter a valid email address")
      .trim()
      .toLowerCase(),
    phoneNumber: z
      .string()
      .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(32, "Password should not be more than 32 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address").trim(),
  password: z.string().min(1, "Password is required"),
});

export const editProfileSchema = z.object({
  firstName: z.string().min(2, "Name must be at least 2 characters").trim(),
  email: z.string().email("Please enter a valid email address").trim(),
  phoneNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Please enter a valid 10-digit phone number"),
});

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one digit")
      .regex(
        /[^a-zA-Z0-9]/,
        "Password must contain at least one special character"
      ),
    confirmNewPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "New passwords do not match",
    path: ["confirmNewPassword"],
  });

export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type EditProfileInput = z.infer<typeof editProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
