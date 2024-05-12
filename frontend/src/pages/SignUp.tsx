import React from "react";
import { Link } from "react-router-dom";
import { LabelledInputField } from "../components/LabelledInputField";

export const SignUp = () => {
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
                <button
                  className="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  type="submit"
                >
                  Login
                </button>
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
