import CommonForm from "@/components/Common/CommonForm";
import { registerFormControls } from "../../config/index";
import { useState } from "react";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const onSubmit = () => {};
  return (
    <>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Sign//Up
          </h1>
          <p className="m-2">
            Already have an account?{" "}
            <a
              className="font-medium text-primary hover:underline"
              href="/auth/login"
            >
              Log//In
            </a>
          </p>
        </div>
        <CommonForm
          formControls={registerFormControls}
          buttonText={"Sign//Up"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}
