
import React, { useRef } from "react";

interface UncontrolledFormProps {
  onSubmit: (data: { firstName: string; lastName: string; email: string }) => void;
}

export function UncontrolledForm({ onSubmit }: UncontrolledFormProps) {
  const firstNameRef = useRef<HTMLInputElement>(null);
  const lastNameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      firstName: firstNameRef.current?.value || "",
      lastName: lastNameRef.current?.value || "",
      email: emailRef.current?.value || "",
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Uncontrolled Form</h2>
      <div>
        <label htmlFor="uc-firstName">First Name:</label>
        <input id="uc-firstName" type="text" ref={firstNameRef} name="firstName" />
      </div>
      <div>
        <label htmlFor="uc-lastName">Last Name:</label>
        <input id="uc-lastName" type="text" ref={lastNameRef} name="lastName" />
      </div>
      <div>
        <label htmlFor="uc-email">Email:</label>
        <input id="uc-email" type="email" ref={emailRef} name="email" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
