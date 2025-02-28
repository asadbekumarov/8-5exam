"use client";
import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../components/utils/url";
import { IoPerson } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function CreateProfile() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [skills, setSkills] = useState<string>("");
  const [githubusername, setGithubUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const newProfile = {
      status,
      company,
      website,
      location,
      skills: skills.split(",").map((s) => s.trim()),
      githubusername,
      bio,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      const res = await axios.post(`${baseUrl}profile`, newProfile, {
        headers: {
          "x-auth-token": token,
          "Content-Type": "application/json",
        },
      });
      console.log("Profile Created", res);
      router.push("/dashboard");
    } catch (err: any) {
      console.error("Xatolik:", err);
      console.error("Error creating profile:", err);
      setError(
        err.response?.data?.message ||
          "Failed to create profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] m-auto p-4 text-center">
      <h1 className="font-bold text-5xl text-[#17a2b8] pt-9">
        Create Your Profile
      </h1>
      <div className="flex items-center gap-2">
        <IoPerson className="text-2xl" />
        <p className="text-2xl">
          Let's get some information to make your profile
        </p>
      </div>
      <p>* = required field</p>
      {error && <p className="text-red-500">{error}</p>}
      <form
        className="w-[800px] flex flex-col items-start gap-6"
        onSubmit={onSubmit}
      >
        <select
          className="w-full border py-2 px-4"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">* Select Professional Status</option>
          <option value="developer">Developer</option>
          <option value="junior-developer">Junior Developer</option>
          <option value="senior-developer">Senior Developer</option>
          <option value="manager">Manager</option>
          <option value="student">Student or Learning</option>
          <option value="instructor">Instructor or Teacher</option>
          <option value="intern">Intern</option>
          <option value="other">Other</option>
        </select>
        <input
          className="w-full border py-2 px-4"
          placeholder="Company"
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          className="w-full border py-2 px-4"
          placeholder="Website"
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <input
          className="w-full border py-2 px-4"
          placeholder="Location"
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <input
          className="w-full border py-2 px-4"
          placeholder="* Skills (comma separated)"
          type="text"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />
        <input
          className="w-full border py-2 px-4"
          placeholder="Github Username"
          type="text"
          value={githubusername}
          onChange={(e) => setGithubUsername(e.target.value)}
        />
        <textarea
          className="w-full border py-2 px-4"
          placeholder="A short bio of yourself"
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={4}
        />
        <button
          type="submit"
          className="bg-[#17a2b8] text-white py-2 px-4"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
