import { axiosInstance } from "../_base/axios-instance";
import { useRequest } from "../_base/use-request";

export const useSenha = () => {
  const { handleRequest, data } = useRequest();

  function postEsqueciSenha(email) {
    handleRequest(
      axiosInstance.post("/email/esqueci-senha", {email})
    );
  }
  return { postEsqueciSenha };
};
