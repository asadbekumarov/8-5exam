"use client";
import { FaCode } from "react-icons/fa6";
import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Header: React.FC = () => {
  const token: string | null = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;
  const pathname = usePathname();
  const router = useRouter();

  const logOut = (): void => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("accessToken");
    }
    router.push("/");
  };

  return (
    <div className="bg-[#484d53]">
      <div className="max-w-[1500px] m-auto p-0">
        <div className="flex justify-between p-4">
          <Link
            href="/"
            className="text-white font-bold text-2xl leading-10 flex items-center gap-2 hover:text-[#17a2b8]"
          >
            <FaCode className="text-4xl font-bold" />
            DevConnector
          </Link>
          <div className="flex items-center gap-5">
            <Link
              className={`${
                pathname === "/developers" ? "active" : ""
              } text-base leading-7 text-white font-semibold hover:text-[#17a2b8]`}
              href="/developers"
            >
              Developers
            </Link>
            {!token ? (
              <div className="flex items-center gap-5">
                <Link
                  className={`${
                    pathname === "/register" ? "active" : ""
                  } text-base leading-7 text-white font-semibold hover:text-[#17a2b8]`}
                  href="/register"
                >
                  Register
                </Link>
                <Link
                  className={`${
                    pathname === "/login" ? "active" : ""
                  } text-base leading-7 text-white font-semibold hover:text-[#17a2b8]`}
                  href="/login"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-5">
                <Link
                  className={`${
                    pathname === "/posts" ? "active" : ""
                  } text-base leading-7 text-white font-semibold hover:text-[#17a2b8]`}
                  href="/posts"
                >
                  Posts
                </Link>
                <Link
                  className={`${
                    pathname === "/dashboard" ? "active" : ""
                  } text-base leading-7 text-white font-semibold hover:text-[#17a2b8]`}
                  href="/dashboard"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logOut}
                  className="text-base leading-7 text-white font-semibold hover:text-[#17a2b8]"
                >
                  logOut {">"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
