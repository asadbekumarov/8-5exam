import React from "react";
import Link from "next/link"; 

function Home() {
  return (
    <div className="relative h-screen">
      {" "}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('/assets/img/bgimg.jpg')` }} 
      ></div>
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative flex items-center flex-col justify-center text-center h-screen">
        <h1 className="font-bold text-6xl leading-10 text-white">
          Developer Connector
        </h1>
        <h3 className="text-2xl leading-9 text-white mt-5">
          Create a developer profile/portfolio, share posts and get help from
          other developers
        </h3>
        <div className="flex items-center gap-4 mt-6">
          <Link href="/register">
            {" "}
            <button className="py-2 px-4 bg-[#17a2b8] text-white">
              Sign Up
            </button>
          </Link>
          <Link href="/login">
            {" "}
            <button className="py-2 px-4 bg-white text-black">Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home; 
