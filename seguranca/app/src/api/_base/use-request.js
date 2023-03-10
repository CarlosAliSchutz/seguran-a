import { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const useRequest = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();

  async function handleRequest(promise) {
    try {
      setError(null)
      const response = await promise;
      setData(response.data);
    } catch (error) {
      setError(error.response)
      toast.error(error.response.data.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }

  return { handleRequest, data, error };
};
