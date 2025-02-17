import CommonForm from "@/components/Common/CommonForm";
import { loginFormControls } from "../../config/index";
import { useState } from "react";

const initialState = {
  email: "",
  password: "",
};

export default function Login() {
  const [formData, setFormData] = useState(initialState);
  const onSubmit = () => {};
  return (
    <>
      <div className="mx-auto w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Log//In
          </h1>
          <p className="m-2">
            Don't have an account?{" "}
            <a
              className="font-medium text-primary hover:underline"
              href="/auth/register"
            >
              Sign//Up
            </a>
          </p>
        </div>
        <CommonForm
          formControls={loginFormControls}
          buttonText={"Log//In"}
          formData={formData}
          setFormData={setFormData}
          onSubmit={onSubmit}
        />
      </div>
    </>
  );
}
