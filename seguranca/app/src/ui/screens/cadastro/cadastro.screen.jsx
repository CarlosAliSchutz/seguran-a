import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCadastro } from "../../../api/user/cadastro.api";
import { Button, Input } from "../../components";

export function CadastroScreen() {
  const [formInput, setFormInput] = useState({
    nome: "",
    telefone: "",
    email: "",
    senha: "",
    foto: "",
  });
  const { postCadastro, cadastro } = useCadastro();
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setFormInput((oldFormInput) => ({ ...oldFormInput, [name]: value }));
  }

  function handleVoltar() {
    navigate("/");
  }

  function handleSubmit(event) {
    event.preventDefault();

    postCadastro({
      nome: formInput.nome,
      telefone: formInput.telefone,
      email: formInput.email,
      senha: formInput.senha,
      foto: formInput.foto,
    });
  }

  if (cadastro?.nome && cadastro?.email) {
    toast.success("Cadastrado com sucesso", {
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
            type="email"
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
              Cadastrar
            </Button>

            <Button onClick={handleVoltar}>Voltar</Button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}
