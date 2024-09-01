import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateToLocal = (date: Date, locale: string = "en-US") => {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

const blogPostFormSchema = z.object({
  title: z.string(),
  description: z.string().min(100, { message: "Description must be at least 100 characters long" }),
  id: z.number().optional(),
});

export const validateBlogPostFormData = (formData: FormData) => {
  const validatedFields = blogPostFormSchema.safeParse(Object.fromEntries(formData.entries()));
  const post = {
    title: formData.get('title')?.toString() ?? "",
    description: formData.get('description')?.toString() ?? "",
  };
  return { validatedFields, post };
}
