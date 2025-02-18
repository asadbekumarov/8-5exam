"use client";
import useAuth from "@/components/hooks/useAuth";
import { useState } from "react";
import { IoPerson } from "react-icons/io5";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const { loading, register, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(name, email, password);
    if (!error) {
      router.push("/dashboard");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center  justify-center w-full mt-14">
      <div>
        <h1 className="font-bold text-5xl leading-[58px] text-[#17a2b8]">
          Sign Up
        </h1>
        <div className="flex items-center gap-2">
          <IoPerson className="font-black text-2xl leading-6" />
          <p className="font-normal text-2xl leading-10">Create Your Account</p>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <div className="w-[1200px]">
          <form
            onSubmit={onSubmit}
            className="flex flex-col gap-3 pt-10 items-start"
          >
            <input
              className="py-2 px-3 w-[1200px] border"
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="py-2 px-3 w-[1200px] border"
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="py-2 px-3 w-[1200px] border"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="bg-[#17a2b8] py-2 px-4 text-white" type="submit">
              {loading ? "Loading..." : "Register"}
            </button>
            <p className="text-base leading-6 pt-5">
              Already have an account?
              <span className="text-[#17a2b8] text-base leading-6">
                {" "}
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
