import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: "male" | "female";
  acceptTerms: boolean;
  picture: FileList;
};

const schema = z
  .object({
    name: z.string().min(1, "Name is required"),
    age: z.number().min(18).max(99),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    gender: z.enum(["male", "female"], "Gender is required"),
    acceptTerms: z.boolean().refine(val => val === true, {
      message: "You must accept terms and conditions",
    }),
    picture: z
      .any()
      .refine((files) => files?.length === 1, "Picture is required")
      .refine(
        (files) => files?.[0]?.type.startsWith("image/"),
        "Uploaded file must be an image"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ReactHookFormProps = {
  onSubmit: (data: {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: "male" | "female";
    acceptTerms: boolean;
    picture: File | null;
  }) => void;
};


export function ReactHookForm({ onSubmit }: ReactHookFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitHandler = (data: FormData) => {
    onSubmit({
      ...data,
      picture: data.picture?.[0] || null,
    });
    reset();
  };


  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate>
      <h2>React Hook Form</h2>
    <div className="form-item">
        <label htmlFor="rhf-name">Name Field</label>
        <input id="rhf-name" placeholder="name" {...register("name")} />
        {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
      </div>

      <div className="form-item">
        <label htmlFor="rhf-age">Age Field</label>
        <input id="rhf-age" type="number" placeholder="age" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}
      </div>

      <div className="form-item">
        <label htmlFor="rhf-email">Email Field</label>
        <input id="rhf-email" type="email" placeholder="email" {...register("email")} />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <div className="form-item">
        <label htmlFor="rhf-password">Password Field</label>
        <input id="rhf-password" type="password" placeholder="password" {...register("password")} />
        {errors.password && (
          <p style={{ color: "red" }}>{errors.password.message}</p>
        )}
      </div>

      <div className="form-item">
        <label htmlFor="rhf-confirm-password">Confirm Field</label>
        <input id="rhf-confirm-password" type="password" placeholder="confirm password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
        )}
      </div>

      <fieldset>
        <legend>Gender:</legend>
        <label>
          <input type="radio" value="male" {...register("gender")} />
          Male
        </label>
        <label>
          <input type="radio" value="female" {...register("gender")} />
          Female
        </label>
        {errors.gender && (
          <p style={{ color: "red" }}>{errors.gender.message}</p>
        )}
      </fieldset>

      <div>
        <label>
          <input type="checkbox" {...register("acceptTerms")} />
          Accept Terms and Conditions
        </label>
        {errors.acceptTerms && (
          <p style={{ color: "red" }}>{errors.acceptTerms.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="rhf-picture">Upload Picture:</label>
        <input id="rhf-picture" type="file" {...register("picture")} accept="image/*" />
        {errors.picture && (
          <p style={{ color: "red" }}>{errors.picture.message}</p>
        )}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}