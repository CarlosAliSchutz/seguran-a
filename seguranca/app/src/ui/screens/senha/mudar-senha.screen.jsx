import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogout } from "../../../api/user/logout.api";
import { useMudarSenha } from "../../../api/user/mudarSenha.api";
import { USER_KEY } from "../../../constants";
import useGlobalUser from "../../../context/user/user.context";
import { Button, Input } from "../../components";

export function MudarSenhaScreen() {
  const { postMudarSenha, error } = useMudarSenha();
  const [senha, setSenha] = useState();
  const { postLogout } = useLogout();
  const { token } = useParams();
  const [, setUser] = useGlobalUser();
  const navigate = useNavigate();

  async function handleSenha(event) {
    event.preventDefault();

    await postMudarSenha({senha: senha}, token);
  }

  function handleChange({ target }) {
    setSenha(target.value);
  }

console.log(error)

  function handleSair() {
    postLogout();

    setUser(null);
    localStorage.removeItem(USER_KEY);
    navigate("/")
  }

  return (
    <div className="form">
      <div className="form-box">
        <h1>Mudar Senha</h1>
        <form onSubmit={handleSenha}>
          <Input
            label="Senha:"
            name="senha"
            value={senha}
            onChange={handleChange}
            type="password"
          />

          <div className="form-button">
            <Button onClick={handleSenha} type="submit">
              Trocar Senha
            </Button>

            <Button onClick={handleSair}>Sair</Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
