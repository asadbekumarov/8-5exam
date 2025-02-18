"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";

function Dashboard() {
  const [name, setName] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const userData = JSON.parse(storedToken);
        setName(userData.name || "User");
      } catch (error) {
        console.error("Error parsing token:", error);
        setName("User");
      }
    }
  }, []);

  return (
    <div className="max-w-[800px] m-auto p-4 text-center">
      <div className="flex justify-center flex-col items-start gap-5 mt-4">
        <h1 className="font-bold text-5xl text-[#17a2b8] pt-9">Dashboard</h1>
        <div className="flex items-center gap-2">
          <IoPerson className="text-2xl" />
          <p className="text-2xl">Welcome, {name}</p>
        </div>
        <p className="text-base">
          You have not yet setup a profile, please add some info
        </p>
        <button className="bg-[#17a2b8] py-2 px-4 text-white">
          <Link href={"/createProfile"}>Create Profile</Link>
        </button>
        <div className="flex items-center gap-4">
          <button className="py-2 px-4 bg-[#f4f4f4]">
            <Link href={"/edit"}>Edit Profile</Link>
          </button>
          <button className="py-2 px-4 bg-[#f4f4f4]">
            <Link href={"/addAn"}>Add Experience</Link>
          </button>
          <button className="py-2 px-4 bg-[#f4f4f4]">
            <Link href={"/edu"}>Add Education</Link>
          </button>
        </div>
        <h4 className="text-2xl leading-10 font-bold">
          Experience Credentials
        </h4>
        <div className="flex items-center gap-3">
          <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
            Company
          </p>
          <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
            Title
          </p>
          <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
            Years
          </p>
          <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7 w-4 h-10"></p>
        </div>
        <h4 className="text-2xl leading-10 font-bold">Education Credentials</h4>
        <div className="flex items-center gap-3">
          <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
            School
          </p>
          <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
            Degree
          </p>
          <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7">
            Years
          </p>
          <p className="py-2 px-4 bg-[#f4f4f4] font-bold text-base leading-7 w-4 h-10"></p>
        </div>
        <button className="py-2 px-4 bg-[#ff1f1f] text-white">
          Delete My Account
        </button>
      </div>
    </div>
  );
}

export default Dashboard;