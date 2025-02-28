"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "next/navigation";
import { baseUrl } from "../../components/utils/url";

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

export default function ProfileDetail() {
  const params = useParams();
  const id = params.id as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${baseUrl}profile/user/${id}`); // To'g'ri API so'rovi
        setProfile(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setError("Failed to load profile. Please try again later.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!profile) {
    return <div>Profile not found</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6 flex items-center gap-4">
        <div className="w-20 h-20 flex-shrink-0">
          <img
            src={profile.user.avatar || "https://via.placeholder.com/80"}
            alt={profile.user.name}
            className="w-full h-full rounded-full object-cover"
          />
        </div>

        <div className="flex flex-col">
          <h2 className="text-lg font-bold">
            {profile.user.name || "No Name"}
          </h2>
          <p className="text-gray-600 text-sm">
            {profile.status} at {profile.company}
          </p>
          <p className="text-gray-500 text-sm">{profile.location}</p>

          <div className="flex flex-wrap gap-2 mt-2">
            {profile.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}