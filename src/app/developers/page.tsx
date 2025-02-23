"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../components/utils/url";
import { IoPerson } from "react-icons/io5";
import { useRouter } from "next/navigation";

interface Profile {
  _id: string;
  user: {
    _id: string;
    name: string;
    avatar?: string;
  };
  company: string;
  location: string;
  status: string;
  skills: string[];
}

export default function Developers() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await axios.get(`${baseUrl}profile`);
        setProfiles(response.data);
      } catch (error) {
        console.error("Error fetching profiles:", error);
        setError("Failed to load profiles. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  if (loading) return <div>Loading profiles...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="font-bold text-5xl text-[#17a2b8] pt-9">Developers</h1>
      <div className="flex items-center gap-2 mt-4">
        <IoPerson className="text-2xl" />
        <p className="text-xl">Add any school or bootcamp that you have attended</p>
      </div>
      {profiles.map((profile) => (
        <div
          key={profile._id}
          className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4 mt-4"
        >
          <img
            src={profile.user.avatar || "https://via.placeholder.com/80"}
            alt={profile.user.name}
            className="w-20 h-20 rounded-full object-cover"
          />
          <div className="flex flex-col">
            <h2 className="text-lg font-bold">{profile.user.name || "No Name"}</h2>
            <p className="text-gray-600 text-sm">{profile.status} at {profile.company}</p>
            <p className="text-gray-500 text-sm">{profile.location}</p>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.skills.map((skill, index) => (
                <span key={index} className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                  {skill}
                </span>
              ))}
            </div>
            <button
              onClick={() => router.push(`/developers/${profile.user._id}`)}
              className="mt-4 px-4 py-2 bg-[#17a2b8] text-white rounded-md"
            >
              View Profile
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
