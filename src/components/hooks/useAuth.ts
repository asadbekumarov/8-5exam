import axios from "axios"; 
import { useEffect, useState } from "react"; 
import { baseUrl } from "../utils/url"; 
import { User } from "../interface/error"; 
import { useRouter } from "next/navigation"; 

function useAuth() {

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  // Foydalanuvchi ma’lumotlarini olish uchun funksiya
  async function getMe() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token"); // LocalStorage'dan tokenni olish
      if (!token) {
        setUser(null); 
        return;
      }

      // Backendga so‘rov yuborish (foydalanuvchi ma’lumotlarini olish)
      const res = await axios.get(`${baseUrl}auth/me`, {
        headers: { Authorization: `Bearer ${token}` }, 
      });

      setUser(res.data); // Foydalanuvchi ma’lumotlarini saqlash
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch user data");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  // Komponent yuklanganda getMe funksiyasini chaqiramiz
  useEffect(() => {
    getMe();
  }, []);

  // Kirish funksiyasi
  async function login(email: string, password: string) {
    setLoading(true);
    setError("");

    try {
      // Backendga login ma’lumotlarini yuborish
      const res = await axios.post(
        `${baseUrl}auth`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        await getMe(); // Foydalanuvchi ma’lumotlarini qayta olish
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  // Ro‘yxatdan o‘tish funksiyasi
  async function register(name: string, email: string, password: string) {
    setLoading(true);
    setError("");

    try {
      // Backendga ro‘yxatdan o‘tish ma’lumotlarini yuborish
      const res = await axios.post(
        `${baseUrl}users`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        // Tokenni LocalStorage'ga saqlash
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard"); 
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  // Chiqish funksiyasi
  function logOut() {
    localStorage.removeItem("token"); // Tokenni LocalStorage'dan o‘chirish
    setUser(null); // Foydalanuvchini null qilish
    router.push("/login");
  }
  return { login, register, logOut, user, error, loading };
}

export default useAuth;
