import CommonForm from "@/components/Common/CommonForm";
import { registerFormControls } from "../../config/index";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "@/store/auth-slice";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const initialState = {
  userName: "",
  email: "",
  password: "",
};

export default function Register() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      if (data?.payload.success) {
        console.log(data);
        toast({
          title: data?.payload.message || "Registration successful!",
        });
        navigate("/auth/login");
      }
    });
  };

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
