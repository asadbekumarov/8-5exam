"use client";
import { baseUrl } from "../../components/utils/url"; 
import axios from "axios"; 
import Link from "next/link";
import { useRouter } from "next/navigation"; 
import { useState } from "react"; 
const Edu = () => {
  const [current, setCurrent] = useState(false); 
  const router = useRouter(); // Router obyekti sahifalarni yo‘naltirish uchun.

  // Foydalanuvchidan olinadigan ma'lumotlar uchun state-lar.
  const [school, setSchool] = useState<string>(""); // Maktab yoki Bootcamp nomi.
  const [degree, setDegree] = useState<string>(""); // Diplom yoki sertifikat nomi.
  const [fieldofstudy, setFieldofstudy] = useState<string>(""); // Ta'lim sohasi.
  const [from, setFrom] = useState<string>(""); // Boshlanish sanasi.
  const [to, setTo] = useState<string>(""); 
  const [description, setDescription] = useState<string>(""); 
  const [currentJob, setCurrentJob] = useState<boolean>(false); 

  // Foydalanuvchi formani yuborganda ishlaydigan funksiya.
  const Edu = async (e: React.FormEvent) => {
    e.preventDefault(); 
    try {
      const res = await axios.put(
        `${baseUrl}profile/education`, // API endpoint.
        { school, degree, fieldofstudy, from, to }, // Jo‘natilayotgan ma'lumotlar.
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"), 
            "Content-Type": "application/json", 
          },
        }
      );
      // Agar so‘rov muvaffaqiyatli bajarilsa, foydalanuvchi dashboard sahifasiga yo‘naltiriladi.
      if (res.status === 200) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      console.error(error.response?.data || error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold text-[#0f3352]">Add Your Education</h1>
      <p className="text-gray-600 mt-2">
        🔧 Add any school or bootcamp that you have attended
      </p>
      <form onSubmit={Edu} className="mt-6">
        <input
          type="text"
          value={school}
          onChange={(e) => setSchool(e.target.value)}
          placeholder="* School or Bootcamp"
          className="w-full p-2 border rounded-md mb-4"
        />
        <input
          type="text"
          value={degree}
          onChange={(e) => setDegree(e.target.value)}
          placeholder="* Degree or Certificate"
          className="w-full p-2 border rounded-md mb-4"
        />
        <input
          type="text"
          value={fieldofstudy}
          onChange={(e) => setFieldofstudy(e.target.value)}
          placeholder="Field of Study"
          className="w-full p-2 border rounded-md mb-4"
        />
        <label className="block text-gray-700">From Date</label>
        <input
          type="date"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="w-full p-2 border rounded-md mb-4"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={current}
            onChange={() => setCurrent(!current)}
            className="mr-2"
          />
          <span>Current School</span>
        </div>
        {!current && (
          <>
            <label className="block text-gray-700">To Date</label>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full p-2 border rounded-md mb-4"
            />
          </>
        )}
        <textarea
          placeholder="Program Description"
          className="w-full p-2 border rounded-md mb-4 h-24"
        ></textarea>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-[#0f3352] text-white rounded-md"
            type="submit"
          >
            Submit
          </button>
          <Link href="/dashboard">
            <button className="px-4 py-2 bg-gray-500 text-white rounded-md">
              Go Back
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};
export default Edu;
