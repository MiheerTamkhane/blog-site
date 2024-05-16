import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LabelledInputField } from "../components/LabelledInputField";
import { SubmitButton } from "../components/SubmitButton";
export const SignUp = () => {
  const [loader, setLoader] = useState(false);
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
            <form className="w-full">
              <div className="mb-10 space-y-3">
                <div className="space-y-1">
                  <LabelledInputField
                    type="email"
                    label="Email"
                    placeholder="email@gmail.com"
                    onChange={() => {}}
                  />
                  <LabelledInputField
                    type="password"
                    label="Password"
                    placeholder="********"
                    onChange={() => {}}
                  />
                  <LabelledInputField
                    type="name"
                    label="Name"
                    placeholder="(Optional)"
                    onChange={() => {}}
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
