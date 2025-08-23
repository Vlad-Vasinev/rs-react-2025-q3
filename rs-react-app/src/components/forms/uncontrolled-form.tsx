import React, { useRef, useState } from "react";
import { z } from "zod";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../store";

import { addEl } from "../../store/dataSlice";

const schema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .refine((val) => /^[A-Z]/.test(val), {
        message: "Name must start with an uppercase letter",
      }),
    age: z
      .number({ error: "Age must be a number" })
      .min(0, "Age cannot be negative")
      .max(99, "Age must be less than 100"),
    email: z.string().email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    gender: z.enum(["male", "female"], "Select a gender"),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept terms and conditions",
    }),
    picture: z
    .any()
    .refine((file) => file != null, {
      message: "Picture is required",
    })
    .refine(
      (file) => file?.type?.startsWith("image/"),
      {
        message: "Uploaded file must be an image",
      }
    )

  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

type UncontrolledFormProps = {
  onSubmit: (data: {
    name: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    acceptTerms: boolean;
    picture: File | null;
  }) => void;
};

export function UncontrolledForm({ onSubmit }: UncontrolledFormProps) {
  const name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const [errors, setErrors] = useState<Errors>({});

  const formData = useSelector((state: RootState) => {state.items.elements})
  const dispatch = useDispatch<AppDispatch>()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const gender = genderMaleRef.current?.checked
      ? "male"
      : genderFemaleRef.current?.checked
      ? "female"
      : "";

    const data = {
      name: name.current?.value || "",
      age: age.current?.value ? Number(age.current.value) : null,
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "",
      gender,
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: pictureRef.current?.files?.[0] || null,
    };

    dispatch(addEl(data))
    const result = schema.safeParse(data);

    if (!result.success) {
      const fieldErrors: Errors = {};

    result.error.issues.forEach(({ path, message }) => {
      if (path.length > 0) {
        const key = path[0] as keyof Errors;
        if (!fieldErrors[key]) {
          fieldErrors[key] = message;
        }
      }
    });


      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    onSubmit({
      ...result.data,
      picture: result.data.picture ? result.data.picture[0] : null,
    });
  };
  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Uncontrolled Form</h2>
      <div className="form-item">
        <label htmlFor="uc-name">Name Field</label>
        <input id="uc-name" placeholder="name" type="text" ref={name} name="name" />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="form-item">
        <label htmlFor="uc-age">Age Field</label>
        <input id="uc-age" placeholder="age" type="text" ref={age} name="age" />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>
      <div className="form-item">
        <label htmlFor="uc-email">Email Field</label>
        <input id="uc-email" placeholder="email" type="email" ref={emailRef} name="email" />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-item">
        <label htmlFor="uc-password">Password Field</label>
        <input id="uc-password" placeholder="password" type="password" ref={passwordRef} name="password" />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      <div className="form-item">
        <label htmlFor="uc-confirm-password">Confirm Field</label>
        <input
          placeholder="confirm password"
          id="uc-confirm-password"
          type="password"
          ref={confirmPasswordRef}
          name="confirmPassword"
        />
        {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>} 
      </div>
      <fieldset>
        <legend>Gender:</legend>
        <label>
          <input type="radio" name="gender" value="male" ref={genderMaleRef} />
          Male
        </label>
        <label>
          <input type="radio" name="gender" value="female" ref={genderFemaleRef} />
          Female
        </label>
        {errors.gender && <p className="error">{errors.gender}</p>}
      </fieldset>
      <div className="form-itemCheckbox">
        <label>
          <input type="checkbox" ref={acceptTermsRef} name="acceptTerms" />
          Accept Terms and Conditions
        </label>
        {errors.acceptTerms && <p className="error">{errors.acceptTerms}</p>}
      </div>
      <div className="form-itemPicture">
        <label htmlFor="uc-picture">Upload Picture:</label>
        <input id="uc-picture" type="file" ref={pictureRef} name="picture" accept="image/*" />
        {errors.picture && <p className="error">{errors.picture}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

