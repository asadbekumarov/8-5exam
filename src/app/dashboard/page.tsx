"use client";
import { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";
import useFetch from "@/components/hooks/useFetch";
import { baseUrl } from "@/components/utils/url";
import axios from "axios";

export default function Dashboard() {
  const { data, loading, error } = useFetch<{ name: string }>("auth");
  const [apiError, setApiError] = useState<string>("");

  async function getMe() {
    try {
      let res = await axios.post(
        baseUrl + "profile/me",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        localStorage.setItem("token", res?.data?.token);
      }
    } catch (error: any) {
      setApiError(error.response?.data?.message || "Xatolik yuz berdi");
    }
  }

  return (
    <div className="max-w-[800px] m-auto p-4 text-center">
      <div className="flex justify-center flex-col items-start gap-5 mt-4">
        <h1 className="font-bold text-5xl text-[#17a2b8] pt-9">Dashboard</h1>

        {loading && <p>Yuklanmoqda...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {apiError && <p className="text-red-500">{apiError}</p>}

        <div className="flex items-center gap-2">
          <IoPerson className="text-2xl" />
          <p className="text-2xl">Welcome, {data?.name || "User"}</p>
        </div>

        <p className="text-base">
          You have not yet set up a profile, please add some info
        </p>
        <button className="bg-[#17a2b8] py-2 px-4 text-white">
          <Link href="/createProfile">Create Profile</Link>
        </button>

        <div className="flex items-center gap-4">
          <button className="py-2 px-4 bg-[#f4f4f4]">
            <Link href="/editProfile">Edit Profile</Link>
          </button>
          <button className="py-2 px-4 bg-[#f4f4f4]">
            <Link href="/addan">Add Experience</Link>
          </button>
          <button className="py-2 px-4 bg-[#f4f4f4]">
            <Link href="/edu">Add Education</Link>
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
        </div>

        <button className="py-2 px-4 bg-[#ff1f1f] text-white">
          Delete My Account
        </button>
      </div>
    </div>
  );
}
