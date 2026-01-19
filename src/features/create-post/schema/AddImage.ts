import z from "zod";

export const fileSchema = (allowedTypes: string[], maxSizeMB: number) =>
  z
    .instanceof(File, { message: "File is required" })
    .refine((file) => allowedTypes.includes(file.type), "Invalid file type")
    .refine(
      (file) => file.size <= maxSizeMB * 1024 * 1024,
      `File size must be less than ${maxSizeMB}MB`,
    );

export const AddImageSchema = z.object({
  images: z
    .any()
    .transform((files) =>
      files instanceof FileList ? Array.from(files) : files || [],
    )
    .pipe(
      z
        .array(
          z
            .instanceof(File)
            .refine(
              (file) =>
                ["image/jpeg", "image/png", "image/webp"].includes(file.type),
              "Invalid file type",
            )
            .refine(
              (file) => file.size <= 10 * 1024 * 1024,
              "File must be <=10MB",
            ),
        )
        .min(1, "At Least one image is needed")
        .max(6, "You can upload up to 6 images"),
    ),
});

export type AddImageInput = z.infer<typeof AddImageSchema>;
