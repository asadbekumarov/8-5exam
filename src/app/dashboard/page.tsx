"use client";
import useFetch from "@/components/hooks/useFetch";
import Link from "next/link";
import { IoPerson } from "react-icons/io5";

// Foydalanuvchi profili interfeysi
interface User {
  name: string;
  email: string;
  experience: {
    company: string;
    title: string;
    years: string;
    from: string;
    to?: string;
  }[];
  education: {
    school: string;
    degree: string;
    years: string;
    from: string;
    to?: string;
  }[];
}

function Dashboard() {
  // auth endpointdan  ma'lumotlarini olish
  const { data, error } = useFetch<{ name: string }>("auth");
  // profileme endpointdan  profilini olish
  const { data: profile, error: errorProfile } = useFetch<User>("profile/me");

  return (
    <>
      <div className="max-w-[800px] m-auto p-4 text-center">
        {" "}
        <div>
          <h1 className="font-bold text-start py-4 text-5xl text-[#17a2b8] pt-9">
            Dashboard
          </h1>{" "}
          <div className="flex items-center py-2 gap-2">
            {" "}
            <IoPerson className="text-2xl" />
            <p className="text-2xl">Welcome, {data?.name || "User"}</p>{" "}
          </div>
          <p className="text-start py-4">
            You have not yet set up a profile, please add some info
          </p>
          {profile ? ( // Agar user profili mavjud bo‘lsa
            <div>
              <div>
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
                {profile.experience.length > 0 ? (
                  profile.experience.map((exp, index) => (
                    <div key={index} className="flex items-center gap-3 mb-4">
                      <p className="py-2 px-4 bg-[#f4f4f4]">{exp.company}</p>
                      <p className="py-2 px-4 bg-[#f4f4f4]">{exp.title}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(exp.from).toLocaleDateString()} -{" "}
                        {exp.to ? new Date(exp.to).toLocaleDateString() : "Now"}
                      </p>
                      <button
                        // onClick={() => deleteExperience(exp.id)}
                        className="py-2 px-4 bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>salom</p>
                )}

                <h4 className="text-2xl leading-10 font-bold">
                  Education Credentials
                </h4>
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
                {profile.education.length > 0 ? (
                  profile.education.map((edu, index) => (
                    <div key={index} className="flex items-center gap-3 mb-4">
                      <p className="py-2 px-4 bg-[#f4f4f4]">{edu.school}</p>
                      <p className="py-2 px-4 bg-[#f4f4f4]">{edu.degree}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(edu.from).toLocaleDateString()} -{" "}
                        {edu.to ? new Date(edu.to).toLocaleDateString() : "Now"}
                      </p>
                      <button
                        // onClick={() => deleteExperience(exp.id)}
                        className="py-2 px-4 bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p>salom</p>
                )}
                <button className="py-2 px-4 bg-[#ff1f1f] text-white">
                  Delete My Account
                </button>
              </div>
            </div>
          ) : (
            // Agar profil mavjud bo‘lmasa, yaratish tugmasini ko‘rsatish
            <button className="bg-[#17a2b8] py-2 text-center flex justify-center px-4 text-white">
              <Link href="/createProfile">Create Profile</Link>
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
