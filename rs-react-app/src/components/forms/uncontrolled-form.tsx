
import React, { useRef } from "react";

type UncontrolledFormProps = {
  onSubmit: (data: {
    Name: string;
    age: string;
    email: string;
    password: string;
    confirmPassword: string;
    gender: string;
    acceptTerms: boolean;
    picture: File | null;
  }) => void;
};

export function UncontrolledForm({ onSubmit }: UncontrolledFormProps) {
  const Name = useRef<HTMLInputElement>(null);
  const age = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderMaleRef = useRef<HTMLInputElement>(null);
  const genderFemaleRef = useRef<HTMLInputElement>(null);
  const acceptTermsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let gender = "";
    if (genderMaleRef.current?.checked) gender = "male";
    else if (genderFemaleRef.current?.checked) gender = "female";

    onSubmit({
      Name: Name.current?.value || "",
      age: age.current?.value || "",
      email: emailRef.current?.value || "",
      password: passwordRef.current?.value || "",
      confirmPassword: confirmPasswordRef.current?.value || "",
      gender,
      acceptTerms: acceptTermsRef.current?.checked || false,
      picture: pictureRef.current?.files?.[0] || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h2>Uncontrolled Form</h2>
      <div className="form-item">
        <label htmlFor="uc-name">Name Field</label>
        <input id="uc-name" placeholder="name" type="text" ref={Name} name="name" />
      </div>
      <div className="form-item">
        <label htmlFor="uc-age">Age Field</label>
        <input id="uc-age" placeholder="age" type="text" ref={age} name="age" />
      </div>
      <div className="form-item">
        <label htmlFor="uc-email">Email Field</label>
        <input id="uc-email" placeholder="email" type="email" ref={emailRef} name="email" />
      </div>
      <div className="form-item">
        <label htmlFor="uc-password">Password Field</label>
        <input id="uc-password" placeholder="password" type="password" ref={passwordRef} name="password" />
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
      </fieldset>
      <div>
        <label>
          <input type="checkbox" ref={acceptTermsRef} name="acceptTerms" />
          Accept Terms and Conditions
        </label>
      </div>
      <div>
        <label htmlFor="uc-picture">Upload Picture:</label>
        <input id="uc-picture" type="file" ref={pictureRef} name="picture" accept="image/*" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

