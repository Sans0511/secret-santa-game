import * as z from "zod";

const santaSchema = z
  .object({
    Employee_Name: z.string().min(1, "Employee Name is required"),
    Employee_EmailID: z.string().email("Invalid email format"),
    Secret_Child_Name: z.string().min(1, "Secret Child Name is required"),
    Secret_Child_EmailID: z.string().email("Invalid email format"),
  })
  .strict();

const santaArraySchema = z.array(santaSchema);

export type Santa = z.infer<typeof santaSchema>;

export const fileInputDataValidation = (data: Santa[]): string | null => {
  try {
    santaArraySchema.parse(data);
    return null;
  } catch (error) {
    console.log({ error });
    return "Data Validation Error. Please check the file inputs";
  }
};
