import { axiosInstance } from "../_base/axios-instance";
import { useRequest } from "../_base/use-request";

export const useEditar = () => {
  const { handleRequest, data } = useRequest();

  function putEditar({
    nome,
    telefone,
    email,
    senha,
    foto,
  }) {
    handleRequest(
      axiosInstance.put("/usuarios", {
        nome,
        telefone,
        email,
        senha,
        foto,
      })
    );
  }
  return { putEditar, usuario: data };
};
