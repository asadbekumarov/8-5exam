"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

const Header: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkToken = () => {
      setToken(localStorage.getItem("token")); // Brauzerning localStorage'idan tokenni olib, state ga saqlash.
    };

    checkToken(); // Dastlab komponent yuklanganda tokenni tekshirish.
    window.addEventListener("storage", checkToken); // LocalStorage o‘zgarishlarini kuzatish uchun event qo‘shish.

    return () => {
      window.removeEventListener("storage", checkToken); // Komponent unmount bo‘lganda eventni olib tashlash.
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(localStorage.getItem("token"));
    }, 1000);

    return () => clearInterval(interval); // Komponent unmount bo‘lganda intervalni to‘xtatish.
  }, []);

  const logOut = () => {
    localStorage.removeItem("token"); // Foydalanuvchini tizimdan chiqish uchun tokenni o‘chirish.
    setToken(null);
    router.push("/");
    toast.success("Muvaffaqiyatli bajarildi!");
  };

  return (
    <>
      <nav className="bg-[#484d53] text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold flex items-center space-x-2"
          >
            <span className="text-cyan-400">{"</>"}</span>
            <span>DevConnector</span>
          </Link>
          <ul className="flex items-center space-x-6">
            <li>
              <Link
                href="/developers"
                className="hover:text-cyan-400 transition duration-300"
              >
                Developers
              </Link>
            </li>

            {!token ? (
              <>
                <li>
                  <Link
                    href="/register"
                    className="hover:text-cyan-400 transition duration-300"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="hover:text-cyan-400 transition duration-300"
                  >
                    Login
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link
                    href="/posts"
                    className="hover:text-cyan-400 transition duration-300"
                  >
                    Posts
                  </Link>
                </li>
                <li>
                  <Link
                    href="/dashboard"
                    className="hover:text-cyan-400 transition duration-300 flex items-center"
                  >
                    👤 Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logOut}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
      <ToastContainer />
    </>
  );
};

export default Header;
