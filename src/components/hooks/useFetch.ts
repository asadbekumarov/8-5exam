import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../utils/url";
import { url } from "inspector";

function useFetch<T>() {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  async function fetchData() {
    try {
      setError("");
      setLoading(true);
      let res = await axios.get(baseUrl + url);
      setData(res.data);
      console.log(res);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchData();
  }, [url]);
  return { loading, error, data, refetch: fetchData };
}

export default useFetch;
