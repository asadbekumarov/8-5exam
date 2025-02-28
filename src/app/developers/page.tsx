"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../../components/utils/url";
import { FaRegThumbsUp, FaRegCommentDots } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { IoPerson } from "react-icons/io5";
import Link from "next/link";

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
    <div className="max-w-[800px] m-auto p-4 text-center">
      <h1 className="font-bold text-5xl text-start pb-11 text-[#17a2b8] pt-9">
        Developers
      </h1>
      <div className="flex items-center gap-2">
        <IoPerson className="text-2xl" />
        <p className="text-2xl">Welcome to the community</p>
      </div>
      <div className="max-w-4xl mx-auto p-4">
        {profiles.map((profile) => (
          <div
            key={profile._id}
            className="border rounded-lg p-4 shadow-md flex items-center gap-4"
          >
            <img
              src={profile.user.avatar}
              alt={profile.user.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <h2 className="text-sm font-semibold">
                {profile.user.name || "No Name"}
              </h2>
              <p className="text-gray-500 text-xs">
                Posted on {new Date().toLocaleDateString()}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <button className="flex items-center gap-1 bg-gray-200 p-1 rounded-md">
                  <FaRegThumbsUp className="text-gray-600" />
                </button>
                <button className="flex items-center gap-1 bg-gray-200 p-1 rounded-md">
                  <FaRegCommentDots className="text-gray-600" />
                </button>
                <Link href={`/developers/${profile.user._id}`}>
                  <button className="bg-blue-500 text-white p-1 rounded-md">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
