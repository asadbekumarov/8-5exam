import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/url";
// useFetch - bu moslashuvchan ma'lumot olish hooki
export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  async function fetchData() {
    try {
      setError("");
      setLoading(true);

      // Brauzerning localStorage'idan tokenni olib kelamiz
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Token topilmadi, iltimos login qiling!");
        return;
      }
      let res = await axios.get(baseUrl + url, {
        headers: {
          "x-auth-token": token, 
          "Content-Type": "application/json",
        },
      });

      // Agar so‘rov muvaffaqiyatli bajarilsa, kelgan ma'lumotni `data` state'ga saqlaymiz
      if (res.status === 200) {
        setData(res.data);
      } else {
        setError("Ma'lumot olishda xatolik yuz berdi");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [url]);

  // Hookdan foydalanish uchun qaytariladigan qiymatlar
  return { loading, error, data, refetch: fetchData };
}
