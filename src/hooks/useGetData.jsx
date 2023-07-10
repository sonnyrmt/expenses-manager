import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

const useGetData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(url);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const addData = (newData) => {
    setData((prevData) => [...prevData, newData]);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, addData };
};

export default useGetData;
