"use client"; .
import useAuth from "@/components/hooks/useAuth";
import { useState } from "react"; 
import { IoPerson } from "react-icons/io5"; 
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();
  const { loading, register, error } = useAuth();
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); 
  const [name, setName] = useState("");
  const [passwordError, setPasswordError] = useState(""); 

  // Ro‘yxatdan o‘tish formasini jo‘natish funksiyasi
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    // Agar parollar mos kelmasa, xatolikni ekranga chiqaramiz.
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match!");  
      return;
    }
    setPasswordError("");

    try {
      // `register` funksiyasi orqali foydalanuvchini ro‘yxatdan o‘tkazamiz.
      const response = await register(name, email, password);

      if (response && !error) {
        localStorage.setItem("authMethod", "register"); // Foydalanuvchining ro‘yxatdan o‘tish usulini localStorage-ga saqlaymiz.
        router.push("/dashboard"); // Ro‘yxatdan o‘tish muvaffaqiyatli bo‘lsa, foydalanuvchini dashboard sahifasiga yo‘naltiramiz.
      }
    } catch (err) {
      console.error("Registration failed:", err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-[#17a2b8] text-center">
          Sign Up
        </h1>{" "}
        <div className="flex items-center gap-2 mt-2">
          <IoPerson className="text-2xl" /> 
          <p className="text-lg">Create Your Account</p>
        </div>
        {passwordError && (
          <div className="text-red-500 mt-2">{passwordError}</div>
        )}
        <form onSubmit={onSubmit} className="flex flex-col gap-3 mt-4">
          <input
            className="py-2 px-3 border rounded w-full"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="py-2 px-3 border rounded w-full"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="py-2 px-3 border rounded w-full"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            className="py-2 px-3 border rounded w-full"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            className="bg-[#17a2b8] py-2 text-white rounded"
            type="submit"
          >
            {loading ? "Loading..." : "Register"}{" "}
          </button>
        </form>
        <p className="text-sm mt-4 text-center">
          Already have an account?
          <span className="text-[#17a2b8] cursor-pointer"> Sign In</span>
        </p>
      </div>
    </div>
  );
}

export default Register;
