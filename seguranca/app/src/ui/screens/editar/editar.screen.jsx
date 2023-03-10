import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEditar } from "../../../api/user/edit.api";
import { useProfile } from "../../../api/user/me.api";
import { USER_KEY } from "../../../constants";
import { Button, Input } from "../../components";

export function EditarScreen() {
  const { getProfile, perfil, error } = useProfile();
  const [formInput, setFormInput] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    foto: "",
  });
  const navigate = useNavigate();
  const { putEditar, usuario } = useEditar();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormInput((oldFormInput) => ({ ...oldFormInput, [name]: value }));
  }

  function handleVoltar() {
    navigate("/perfil");
  }

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (error) {
      localStorage.removeItem(USER_KEY);
    }
  }, []);

  if (usuario?.nome && usuario?.email) {
    toast.success("Perfil Alterado", {
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

  function handleSubmit(event) {
    event.preventDefault();

    putEditar({
      nome: formInput.nome,
      telefone: formInput.telefone,
      email: formInput.email,
      senha: formInput.senha,
      foto: formInput.foto,
    });
  }

  return (
    <div className="form">
      <div className="form-box">
        <h1>Cadastro</h1>
        <form>
          <Input
            label="Nome:"
            name="nome"
            value={formInput.nome}
            type="text"
            onChange={handleChange}
          />

          <Input
            label="Telefone:"
            name="telefone"
            type="text"
            value={formInput.telefone}
            onChange={handleChange}
          />

          <Input
            label="E-mail:"
            name="email"
            type="text"
            value={formInput.email}
            onChange={handleChange}
          />

          <Input
            label="Senha:"
            name="senha"
            value={formInput.senha}
            onChange={handleChange}
            type="password"
          />

          <Input
            label="Foto Perfil"
            name="foto"
            value={formInput.foto}
            onChange={handleChange}
            type="text"
          />

          <div className="form-button">
            <Button onClick={handleSubmit} type="submit">
              Editar
            </Button>

            <Button onClick={handleVoltar}>Voltar</Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
