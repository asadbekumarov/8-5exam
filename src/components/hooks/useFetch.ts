import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "../utils/url";

export default function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  async function fetchData() {
    try {
      setError("");
      setLoading(true);

      const token = localStorage.getItem("token");
      console.log("Yuborilayotgan token:", token); // ✅ Tokenni tekshirish

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

      if (res.status === 200) {
        setData(res.data);
      } else {
        setError("Ma'lumot olishda xatolik yuz berdi");
      }
    } catch (error: any) {
      console.log("Xato tafsilotlari:", error.response);
      setError(error.response?.data?.message || "Xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, [url]);

  return { loading, error, data, refetch: fetchData };
}
