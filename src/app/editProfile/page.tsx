"use client";
import { useEffect, useState, FormEvent } from "react";
import { IoPerson } from "react-icons/io5";
import axios from "axios";
import { baseUrl } from "../../components/utils/url";
import { useRouter } from "next/navigation";

const EditProfile = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    status: "",
    company: "",
    website: "",
    location: "",
    skills: "",
    githubusername: "",
    bio: "",
  });

  // Profil ma'lumotlarini olish
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found. Please login again.");

        const res = await axios.get(`${baseUrl}profile/me`, {
          headers: {
            "x-auth-token": token,
          },
        });

        const profile = res.data;
        setFormData({
          status: profile.status || "",
          company: profile.company || "",
          website: profile.website || "",
          location: profile.location || "",
          skills: profile.skills ? profile.skills.join(", ") : "",
          githubusername: profile.githubusername || "",
          bio: profile.bio || "",
        });
      } catch (err: any) {
        console.error("Error fetching profile:", err);
        setError("Failed to load profile.");
      }
    };

    fetchProfile();
  }, []);

  // Inputlar uchun o'zgarishlarni boshqarish
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Profilni yangilash uchun yuborish
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found. Please login again.");

      await axios.post(
        `${baseUrl}profile`,
        {
          ...formData,
          skills: formData.skills.split(",").map((s) => s.trim()), // Stringni arrayga o‘girish
        },
        {
          headers: {
            "x-auth-token": token,
            "Content-Type": "application/json",
          },
        }
      );

      router.push("/dashboard");
    } catch (err: any) {
      console.error("Error updating profile:", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-[800px] m-auto p-4 text-center">
      <h1 className="font-bold text-5xl text-[#17a2b8] pt-9">Edit Your Profile</h1>
      <div className="flex items-center gap-2">
        <IoPerson className="text-2xl" />
        <p className="text-2xl">Add some changes to your profile</p>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <form className="w-[800px] flex flex-col items-start gap-6" onSubmit={onSubmit}>
        <select name="status" className="w-full border py-2 px-4" value={formData.status} onChange={onChange}>
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
        <input name="company" className="w-full border py-2 px-4" placeholder="Company" value={formData.company} onChange={onChange} />
        <input name="website" className="w-full border py-2 px-4" placeholder="Website" value={formData.website} onChange={onChange} />
        <input name="location" className="w-full border py-2 px-4" placeholder="Location" value={formData.location} onChange={onChange} />
        <input name="skills" className="w-full border py-2 px-4" placeholder="* Skills (comma separated)" value={formData.skills} onChange={onChange} />
        <input name="githubusername" className="w-full border py-2 px-4" placeholder="Github Username" value={formData.githubusername} onChange={onChange} />
        <textarea name="bio" className="w-full border py-2 px-4" placeholder="A short bio of yourself" value={formData.bio} onChange={onChange} rows={4} />
        <button type="submit" className="bg-[#17a2b8] text-white py-2 px-4" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
