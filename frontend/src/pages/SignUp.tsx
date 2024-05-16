import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupType } from "@photon-rex/blog-common";
import { LabelledInputField } from "../components/LabelledInputField";
import { SubmitButton } from "../components/SubmitButton";
import { BACKEND_URL } from "../config";
export const SignUp = () => {
  const [signUp, setSignUp] = useState<SignupType>({
    email: "",
    password: "",
  });
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  async function submitHandler(
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> {
    e.stopPropagation();
    e.preventDefault();
    try {
      setLoader(true);
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/signup`,
        signUp
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/blogs");
      setLoader(false);
    } catch (err) {
      console.error(err);
      setLoader(false);
    }
  }
  return (
    <div>
      <div className="bg-white">
        <div className="flex h-screen flex-col items-center justify-center">
          <div className="max-h-auto mx-auto max-w-xl shadow-lg py-4 px-8 rounded-lg">
            <div className="mb-8 space-y-3">
              <p className="text-xl font-semibold">Login</p>
              <p className="text-gray-500">
                Enter your email, password & name, to sing up.
              </p>
            </div>
            <form className="w-full" onSubmit={submitHandler}>
              <div className="mb-10 space-y-3">
                <div className="space-y-1">
                  <LabelledInputField
                    type="email"
                    label="Email"
                    placeholder="email@gmail.com"
                    onChange={(e) => {
                      setSignUp((prev) => ({ ...prev, email: e.target.value }));
                    }}
                  />
                  <LabelledInputField
                    type="password"
                    label="Password"
                    placeholder="********"
                    onChange={(e) => {
                      setSignUp((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }));
                    }}
                  />
                  <LabelledInputField
                    type="name"
                    label="Name"
                    placeholder="(Optional)"
                    onChange={(e) => {
                      setSignUp((prev) => ({ ...prev, name: e.target.value }));
                    }}
                  />
                </div>
                <SubmitButton loader={loader} label="Sign Up" />
              </div>
            </form>
            <div className="text-center">
              {" "}
              Already have an account?{" "}
              <Link className="underline" to={"/signin"}>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
