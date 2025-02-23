"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { baseUrl } from "../../../components/utils/url";

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

export default function DetailPage() {
  const { userId } = useParams(); // ✅ userId olish
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setError("Invalid user ID");
      setLoading(false);
      return;
    }

    console.log("Fetching profile for ID:", userId);

    const fetchProfile = async () => {
      try {
        let res = await axios.get(`${baseUrl}profile/user/${userId}`);
        setProfile(res.data);
      } catch (error: any) {
        console.error("Error fetching profile:", error.response);
        setError(error.response?.data?.msg || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  if (loading)
    return <div className="text-center text-gray-600">Loading profile...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex items-center gap-4">
        <img
          src={profile?.user.avatar || "https://via.placeholder.com/100"}
          alt={profile?.user.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-3xl font-bold text-[#17a2b8]">
            {profile?.user.name}
          </h1>
          <p className="text-gray-600">
            {profile?.status} at {profile?.company}
          </p>
          <p className="text-gray-500">{profile?.location}</p>
        </div>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-semibold">Skills:</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {profile?.skills.length ? (
            profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {skill}
              </span>
            ))
          ) : (
            <p className="text-gray-500">No skills listed</p>
          )}
        </div>
      </div>
    </div>
  );
}
