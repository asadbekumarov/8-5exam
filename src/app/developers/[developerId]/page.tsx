// "use client";
// import { baseUrl } from "../../../components/utils/url";
// import axios from "axios";
// import { useParams } from "next/navigation";
// import { useEffect, useState } from "react";

// interface DeveloperInterface {
//   _id: string;
//   user?: User;
//   status?: string;
//   bio?: string;
//   company?: string;
//   location?: string;
//   skills?: string[];
//   education?: string[];
//   experience?: string[];
//   website?: string;
//   githubusername?: string;
// }

// interface Repo {
//   id: number;
//   name: string;
//   description: string | null;
//   stargazers_count: number;
//   watchers_count: number;
//   forks_count: number;
//   html_url: string;
// }

// const Developers = () => {
//   const { developerId } = useParams();
//   const [info, setInfo] = useState<DeveloperInterface | null>(null);
//   const [github, setGithub] = useState<Repo[] | null>(null);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const res = await axios.get(`${baseUrl}profile/user/${developerId}`);
//         setInfo(res.data);
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//       }
//     };

//     if (developerId) {
//       fetchUserData();
//     }
//   }, [developerId]);

//   useEffect(() => {
//     const fetchGithubData = async () => {
//       if (!info?.githubusername) return;

//       try {
//         const resgithub = await axios.get(
//           `${baseUrl}profile/github/${info.githubusername}`
//         );
//         setGithub(resgithub.data);
//       } catch (error) {
//         console.error("Error fetching GitHub data:", error);
//       }
//     };

//     fetchGithubData();
//   }, [info?.githubusername]);

//   return (
//     <div className="max-w-4xl mx-auto py-10 px-6">
//       <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
//         <img
//           src={info?.user?.avatar}
//           alt={info?.user?.name}
//           className="w-36 h-36 rounded-full border-4 border-gray-200"
//         />

//         <h2 className="text-2xl font-bold mt-4">{info?.user?.name}</h2>
//         <h3 className="text-lg text-gray-600">{info?.company}</h3>
//         <p className="text-gray-500 mt-2">{info?.location}</p>
//         <p className="text-gray-700 text-center mt-2 px-4">{info?.bio}</p>

//         {info?.skills && (
//           <div className="mt-4">
//             <h4 className="text-lg font-semibold text-gray-700">Skills:</h4>
//             <div className="flex flex-wrap gap-2 mt-2">
//               {info.skills.map((skill, index) => (
//                 <span
//                   key={index}
//                   className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
//                 >
//                   {skill}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="w-full mt-8">
//           <h3 className="text-xl font-semibold text-gray-800 text-center">
//             GitHub Repositories
//           </h3>

//           {github && github.length > 0 ? (
//             <div className="mt-4 space-y-4">
//               {github.map((repo) => (
//                 <div
//                   key={repo.id}
//                   className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
//                 >
//                   <a
//                     href={repo.html_url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-600 font-semibold text-lg hover:underline"
//                   >
//                     {repo.name}
//                   </a>
//                   <p className="text-gray-600 mt-1">
//                     {repo.description || "No description provided."}
//                   </p>
//                   <div className="flex gap-3 mt-3">
//                     <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg">
//                       ⭐️ Stars: {repo.stargazers_count}
//                     </span>
//                     <span className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg">
//                       👀 Watchers: {repo.watchers_count}
//                     </span>
//                     <span className="bg-gray-400 text-black text-sm px-3 py-1 rounded-lg">
//                       🍴 Forks: {repo.forks_count}
//                     </span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p className="text-gray-500 text-center mt-4">
//               No GitHub repositories found.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Developers;
"use client";
import { baseUrl } from "../../../components/utils/url";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Experience {
  title: string;
  company: string;
  from: string;
  to?: string;
  description?: string;
}

interface DeveloperInterface {
  _id: string;
  user?: {
    name: string;
    avatar: string;
  };
  status?: string;
  bio?: string;
  company?: string;
  location?: string;
  skills?: string[];
  education?: {
    school: string;
    degree: string;
    fieldofstudy: string;
    from: string;
    to?: string;
  }[];
  experience?: Experience[];
  website?: string;
  githubusername?: string;
}

interface Repo {
  id: number;
  name: string;
  description: string | null;
  stargazers_count: number;
  watchers_count: number;
  forks_count: number;
  html_url: string;
}

const Developers = () => {
  const { developerId } = useParams();
  const [info, setInfo] = useState<DeveloperInterface | null>(null);
  const [github, setGithub] = useState<Repo[] | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${baseUrl}profile/user/${developerId}`);
        setInfo(res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (developerId) {
      fetchUserData();
    }
  }, [developerId]);

  useEffect(() => {
    const fetchGithubData = async () => {
      if (!info?.githubusername) return;
      try {
        const resgithub = await axios.get(
          `${baseUrl}profile/github/${info.githubusername}`
        );
        setGithub(resgithub.data);
      } catch (error) {
        console.error("Error fetching GitHub data:", error);
      }
    };

    fetchGithubData();
  }, [info?.githubusername]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-6">
      <div className="bg-white shadow-lg rounded-xl p-6 flex flex-col items-center">
        <img
          src={info?.user?.avatar}
          alt={info?.user?.name}
          className="w-36 h-36 rounded-full border-4 border-gray-200"
        />

        <h2 className="text-2xl font-bold mt-4">{info?.user?.name}</h2>
        <h3 className="text-lg text-gray-600">{info?.company}</h3>
        <p className="text-gray-500 mt-2">{info?.location}</p>
        <p className="text-gray-700 text-center mt-2 px-4">{info?.bio}</p>

        {info?.skills && (
          <div className="mt-4">
            <h4 className="text-lg font-semibold text-gray-700">Skills:</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {info.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-lg text-sm font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {info?.education && info.education.length > 0 && (
          <div className="w-full mt-8">
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Education
            </h3>
            <div className="mt-4 space-y-4">
              {info.education.map((edu, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <h4 className="text-lg font-semibold text-gray-900">
                    {edu.school}
                  </h4>
                  <p className="text-gray-600">
                    {edu.degree} in {edu.fieldofstudy}
                  </p>
                  <p className="text-gray-500">
                    {edu.from} - {edu.to ? edu.to : "Present"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
        {info?.experience && info.experience.length > 0 && (
          <div className="w-full mt-8">
            <h3 className="text-xl font-semibold text-gray-800 text-center">
              Experience
            </h3>
            <div className="mt-4 space-y-4">
              {info.experience.map((exp, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <h4 className="text-lg font-semibold text-gray-900">
                    {exp.title} at {exp.company}
                  </h4>
                  <p className="text-gray-600">
                    {exp.from} - {exp.to ? exp.to : "Present"}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 mt-2">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="w-full mt-8">
          <h3 className="text-xl font-semibold text-gray-800 text-center">
            GitHub Repositories
          </h3>
          {github && github.length > 0 ? (
            <div className="mt-4 space-y-4">
              {github.map((repo) => (
                <div
                  key={repo.id}
                  className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
                >
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold text-lg hover:underline"
                  >
                    {repo.name}
                  </a>
                  <p className="text-gray-600 mt-1">
                    {repo.description || "No description provided."}
                  </p>
                  <div className="flex gap-3 mt-3">
                    <span className="bg-blue-500 text-white text-sm px-3 py-1 rounded-lg">
                      ⭐️ Stars: {repo.stargazers_count}
                    </span>
                    <span className="bg-gray-800 text-white text-sm px-3 py-1 rounded-lg">
                      👀 Watchers: {repo.watchers_count}
                    </span>
                    <span className="bg-gray-400 text-black text-sm px-3 py-1 rounded-lg">
                      🍴 Forks: {repo.forks_count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center mt-4">
              No GitHub repositories found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Developers;
