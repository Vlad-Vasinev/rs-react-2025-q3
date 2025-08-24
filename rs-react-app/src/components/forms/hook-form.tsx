
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store";
import { addEl } from "../../store/dataSlice";

const passwordRegex = {
  number: /\d/,  
  upper: /[A-Z]/,
  lower: /[a-z]/,
  special: /[!@#$%^&*(),.?":{}|<>]/,
};

const GenderEnum = z.enum(["male", "female"] as const);

//.refine((val) => /^[A-Z]/.test(val)

const schema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .refine((val) => /^\p{Lu}/u.test(val), {
        message: "Name must start with an uppercase letter",
      }),
    age: z
      .number({ error: "Age must be a number" })
      .min(0, "Age cannot be negative")
      .max(99, "Age must be less than 100"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .refine((val) => passwordRegex.number.test(val), {
        message: "Password must contain at least one number",
      })
      .refine((val) => passwordRegex.upper.test(val), {
        message: "Password must contain at least one uppercase letter",
      })
      .refine((val) => passwordRegex.lower.test(val), {
        message: "Password must contain at least one lowercase letter",
      })
      .refine((val) => passwordRegex.special.test(val), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(6, "Confirm password is required"),
    gender: GenderEnum,
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: "You must accept terms and conditions",
    }),
    picture: z
    .string()
    .nonempty("Picture is required")
    .refine((val) => val.startsWith("data:image/"), {
      message: "Picture must be an image",
    }),
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
    picture: string | null;
  }) => void;
};

type FormData = z.infer<typeof schema>;

export function ReactHookForm({ onSubmit }: ReactHookFormProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const dispatch = useDispatch<AppDispatch>()

  function fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") resolve(reader.result);
        else reject(new Error("Failed to convert file to base64"));
      };
      reader.onerror = () => reject(new Error("File reading error"));
      reader.readAsDataURL(file);
    });
  }

  const submitHandler = (data: FormData) => {
    dispatch(addEl(data))
    onSubmit({
      ...data,
      picture: data.picture,
    });
    reset();
  };


  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate>
      <h2>React Hook Form</h2>
      <div className="form-item" data-testid="form-item-test">
        <label htmlFor="rhf-name">Name Field</label>
        <input id="rhf-name" placeholder="name" {...register("name")} />
        {errors.name && <p >{errors.name.message}</p>}
      </div>

      <div className="form-item" data-testid="form-item-test">
        <label htmlFor="rhf-age">Age Field</label>
        <input id="rhf-age" type="number" placeholder="age" {...register("age", { valueAsNumber: true })} />
        {errors.age && <p >{errors.age.message}</p>}
      </div>

      <div className="form-item" data-testid="form-item-test">
        <label htmlFor="rhf-email">Email Field</label>
        <input id="rhf-email" type="email" placeholder="email" {...register("email")} />
        {errors.email && <p >{errors.email.message}</p>}
      </div>

      <div className="form-item" data-testid="form-item-test">
        <label htmlFor="rhf-password">Password Field</label>
        <input id="rhf-password" type="password" placeholder="password" {...register("password")} />
        {errors.password && (
          <p >{errors.password.message}</p>
        )}
      </div>

      <div className="form-item" data-testid="form-item-test">
        <label htmlFor="rhf-confirm-password">Confirm Field</label>
        <input id="rhf-confirm-password" type="password" placeholder="confirm password" {...register("confirmPassword")} />
        {errors.confirmPassword && (
          <p >{errors.confirmPassword.message}</p>
        )}
      </div>

      <fieldset data-testid="form-item-test">
        <legend>Gender:</legend>
        <label className="radio-label">
          Male
          <input type="radio" value="male" {...register("gender")} />
          <span></span>
        </label>
        <label className="radio-label">
          Female
          <input type="radio" value="female" {...register("gender")} />
          <span></span>
        </label>
        {errors.gender && (
          <p>{errors.gender.message}</p>
        )}
      </fieldset>

      <div className="form-itemCheckbox" data-testid="form-item-test">
        <label>
          Accept Terms and Conditions
          <input type="checkbox" {...register("acceptTerms")} />
          <span></span>
        </label>
        {errors.acceptTerms && (
          <p >{errors.acceptTerms.message}</p>
        )}
      </div>

      <div className="form-itemPicture" data-testid="form-item-test">
        <label htmlFor="rhf-picture">Upload Picture:</label>
        <Controller
          name="picture"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <input
              id="rhf-picture"
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) {
                  field.onChange("");
                  return;
                }
                try {
                  const base64 = await fileToBase64(file);
                  field.onChange(base64);
                } catch (error) {
                  console.error(error);
                  field.onChange("");
                }
              }}
            />
          )}
        />
        {errors.picture && (
          <p >{errors.picture.message}</p>
        )}
      </div>

      <button data-testid="submit-btn-test" type="submit">Submit</button>
    </form>
  );
}