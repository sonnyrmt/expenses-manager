import { useEffect, useState } from "react";
import axios from "axios";

const useData = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openRemove, setOpenRemove] = useState({ status: false, id: null });

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

  const removeData = async (id) => {
    const filtered = data.filter((row) => row.id !== id);
    await axios.put(`/api/expenses?id=${id}`);
    setData(filtered);
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return { data, loading, error, addData, remove: { removeData, setOpenRemove, openRemove } };
};

export default useData;
