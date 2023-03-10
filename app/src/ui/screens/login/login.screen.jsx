import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLogin } from "../../../api/user/login.api";
import useGlobalUser from "../../../context/user/user.context";
import { Button, Input } from "../../components";
import "./index.css";

export function LoginScreen() {
  const [formInput, setFormInput] = useState({ email: "", password: "" });
  // const [error, setError] = useState();
  const { postLogin } = useLogin();
  const [user, setUser] = useGlobalUser();

  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormInput((oldFormInput) => ({ ...oldFormInput, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const user = await postLogin({
        username: formInput.email,
        password: formInput.password,
      });

      setUser(user);
    } catch (error) {
      toast.error("E-mail ou senha invalidos!", {
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

  useEffect(() => {
    if (user) {
      navigate("/perfil");
    }
  }, [user, navigate]);

  function handleCadastro() {
    navigate("/cadastro");
  }

  return (
    <div className="form">
      <div className="form-box">
        <h1>Login</h1>

        <form>
          <Input
            label="E-mail:"
            name="email"
            value={formInput.email}
            onChange={handleChange}
          />

          <Input
            label="Senha:"
            name="password"
            value={formInput.password}
            onChange={handleChange}
            type="password"
          />


          <div className="form-button">
            <Button onClick={handleSubmit} type="submit">
              Entrar
            </Button>

            <Button onClick={handleCadastro}>Cadastro</Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
