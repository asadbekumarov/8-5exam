// "use client";
// import { FaCode } from "react-icons/fa6";
// import React, { useEffect, useState } from "react";
// import Link from "next/link";
// import { usePathname, useRouter } from "next/navigation";

// const Header: React.FC = () => {
//   const [token, setToken] = useState<string | null>(null);
//   const pathname = usePathname();
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       const savedToken = localStorage.getItem("token");
//       console.log("Token from localStorage:", savedToken);

//       if (savedToken) {
//         try {
//           setToken(savedToken);
//         } catch (error) {
//           console.error("Invalid token:", error);
//           setToken(null);
//         }
//       }
//     }
//   }, []);

//   const logOut = (): void => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem("token");
//       setToken(null);
//     }
//     router.replace("/");
//   };

//   return (
//     <div className="bg-[#484d53]">
//       <div className="max-w-[1500px] m-auto p-0">
//         <div className="flex justify-between p-4">
//           <Link
//             href="/"
//             className="text-white font-bold text-2xl leading-10 flex items-center gap-2 hover:text-[#17a2b8]"
//           >
//             <FaCode className="text-4xl font-bold" />
//             DevConnector
//           </Link>
//           <div className="flex items-center gap-5">
//             <Link
//               className={`${
//                 pathname === "/developers" ? "text-[#17a2b8]" : "text-white"
//               } text-base leading-7 font-semibold hover:text-[#17a2b8]`}
//               href="/developers"
//             >
//               Developers
//             </Link>
//             {!token ? (
//               <div className="flex items-center gap-5">
//                 <Link
//                   className={`${
//                     pathname === "/register" ? "text-[#17a2b8]" : "text-white"
//                   } text-base leading-7 font-semibold hover:text-[#17a2b8]`}
//                   href="/register"
//                 >
//                   Register
//                 </Link>
//                 <Link
//                   className={`${
//                     pathname === "/login" ? "text-[#17a2b8]" : "text-white"
//                   } text-base leading-7 font-semibold hover:text-[#17a2b8]`}
//                   href="/login"
//                 >
//                   Login
//                 </Link>
//               </div>
//             ) : (
//               <div className="flex items-center gap-5">
//                 <Link
//                   className={`${
//                     pathname === "/posts" ? "text-[#17a2b8]" : "text-white"
//                   } text-base leading-7 font-semibold hover:text-[#17a2b8]`}
//                   href="/posts"
//                 >
//                   Posts
//                 </Link>
//                 <Link
//                   className={`${
//                     pathname === "/dashboard" ? "text-[#17a2b8]" : "text-white"
//                   } text-base leading-7 font-semibold hover:text-[#17a2b8]`}
//                   href="/dashboard"
//                 >
//                   Dashboard
//                 </Link>
//                 <button
//                   onClick={logOut}
//                   className="text-base leading-7 text-white font-semibold hover:text-[#17a2b8]"
//                 >
//                   LogOut {">"}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;
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
      setToken(localStorage.getItem("token"));
    };

    checkToken();
    window.addEventListener("storage", checkToken);

    return () => {
      window.removeEventListener("storage", checkToken);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setToken(localStorage.getItem("token"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const logOut = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/");
    toast.success("Muvaffaqiyatli bajarildi!");
  };

  return (
    <>
      <nav className="bg-gray-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-bold flex items-center space-x-2"
          >
            <span className="text-cyan-400">{"</>"}</span>
            <span>DevConnector</span>
          </Link>

          {/* Navigation Links */}
          <ul className="flex space-x-6">
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
