import { axiosInstance } from "../_base/axios-instance";
import { useRequest } from "../_base/use-request";

export const useCadastro = () => {
  const { handleRequest, data } = useRequest();

  function postCadastro({ nome, telefone, email, senha, foto }) {
    handleRequest(
      axiosInstance.post("/usuarios", {
        nome,
        telefone,
        email,
        senha,
        foto,
      })
    );
  }
  return { postCadastro, cadastro: data };
};
