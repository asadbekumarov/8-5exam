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

  async function getMe() {
    setLoading(true);
    setError("");
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setUser(null);
        return;
      }

      const res = await axios.get(`${baseUrl}auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(res.data);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch user data");
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMe();
  }, []);

  async function login(email: string, password: string) {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${baseUrl}auth`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        await getMe();
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }
  async function register(name: string, email: string, password: string) {
    setLoading(true);
    setError("");

    try {
      const res = await axios.post(
        `${baseUrl}users`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        router.push("/dashboard");
      }
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  function logOut() {
    localStorage.removeItem("token");
    setUser(null);
    router.push("/login");
  }
  return { login, register, logOut, user, error, loading };
}

export default useAuth;
