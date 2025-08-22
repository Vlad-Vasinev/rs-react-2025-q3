
import { useForm } from "react-hook-form";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
}

interface ReactHookFormProps {
  onSubmit: (data: FormData) => void;
}

export function ReactHookForm({ onSubmit }: ReactHookFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const submitHandler = (data: FormData) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate>
      <h2>React Hook Form</h2>

      <div>
        <label htmlFor="rhf-firstName">First Name:</label>
        <input
          id="rhf-firstName"
          {...register("firstName", { required: "First name is required" })}
        />
        {errors.firstName && (
          <p style={{ color: "red" }}>{errors.firstName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="rhf-lastName">Last Name:</label>
        <input
          id="rhf-lastName"
          {...register("lastName", { required: "Last name is required" })}
        />
        {errors.lastName && (
          <p style={{ color: "red" }}>{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="rhf-email">Email:</label>
        <input
          id="rhf-email"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value:
                /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email.message}</p>}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
