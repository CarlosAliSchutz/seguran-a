import { axiosInstance } from "../_base/axios-instance";

export const useMudarSenha= () => {

  async function postMudarSenha(senha, token) {
    const response = await axiosInstance.post(`/email/trocar-senha/${token}`, senha)
  }
  return { postMudarSenha, };
};
