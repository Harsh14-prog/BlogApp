import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signinInput } from "harshad14-medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";

type authProp = {
  type: "signup" | "signin";
};

const Auth = ({ type }: authProp) => {
  const [postInputs, setPostInputs] = useState<signinInput>({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type == "signup" ? "signup" : "signin"}`,
        postInputs
      );
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (error: any) {
      alert(error.response?.data?.message || "Signup failed");
      console.error("Signup error:", error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 p-8 rounded-xl shadow-md">
        <div className="mb-6 text-left">
          <h2 className="text-3xl font-bold text-white">
            {type === "signup" ? "Create an Account" : "Welcome Back"}
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            {type === "signup" ? (
              <>
                Already have an account?
                <Link className="text-blue-400 underline ml-1" to="/signin">
                  Login
                </Link>
              </>
            ) : (
              <>
                Don’t have an account?
                <Link className="text-blue-400 underline ml-1" to="/signup">
                  Sign Up
                </Link>
              </>
            )}
          </p>
        </div>

        <div className="space-y-4">
          {type === "signup" && (
            <LabelledInput
              label="Name"
              placeholder="name"
              onchange={(e) =>
                setPostInputs({ ...postInputs, name: e.target.value })
              }
            />
          )}

          <LabelledInput
            label="Email"
            placeholder="m@example.com"
            onchange={(e) =>
              setPostInputs({ ...postInputs, email: e.target.value })
            }
          />

          <LabelledInput
            label="Password"
            placeholder="1234545"
            type="password"
            onchange={(e) =>
              setPostInputs({ ...postInputs, password: e.target.value })
            }
          />

          <button
            onClick={sendRequest}
            className="w-full mt-4 bg-white text-black py-2 rounded hover:bg-gray-200 transition"
          >
            {type === "signup" ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface Input {
  label: string;
  placeholder: string;
  onchange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onchange, type }: Input) {
  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-300">
        {label}
      </label>
      <input
        onChange={onchange}
        type={type || "text"}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

export default Auth;
