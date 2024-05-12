import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SigninType } from "@photon-rex/blog-common";
import axios from "axios";
import { LabelledInputField } from "../components/LabelledInputField";
import { SubmitButton } from "../components/SubmitButton";
import { BACKEND_URL } from "../config";

export const SignIn = () => {
  const [signin, setSignin] = useState<SigninType>({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState<boolean>(false);
  const navigate = useNavigate();
  async function submitHandler(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.stopPropagation();
    e.preventDefault();
    try {
      setLoader(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signin`,
        signin
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/blogs");
      setLoader(false);
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="bg-white">
      <div className="flex h-screen flex-col items-center justify-center">
        <div className="max-h-auto mx-auto max-w-xl shadow-lg py-4 px-8 rounded-lg">
          <div className="mb-8 space-y-3">
            <p className="text-xl font-semibold">Sign In</p>
            <p className="text-gray-500">
              Enter your email & password, to sign in.
            </p>
          </div>
          <form className="w-full" onSubmit={submitHandler}>
            <div className="mb-10 space-y-3">
              <div className="space-y-1">
                <LabelledInputField
                  type="email"
                  label="Email"
                  placeholder="email@gmail.com"
                  required
                  onChange={(e) => {
                    setSignin((prev) => ({ ...prev, email: e.target.value }));
                  }}
                />
                <LabelledInputField
                  type="password"
                  label="Password"
                  placeholder="********"
                  required
                  onChange={(e) => {
                    setSignin((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }));
                  }}
                />
              </div>
              <SubmitButton loader={loader} label="Sign In" />
            </div>
          </form>
          <div className="text-center">
            No account?{" "}
            <Link className="underline" to={"/signup"}>
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
