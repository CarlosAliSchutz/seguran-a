import { useState } from "react";
import { useSenha } from "../../../api/user/esqueciSenha.api";
import { Button, Input } from "../../components";
import "./index.css";

export function EsqueciSenhaScreen() {
const { postEsqueciSenha } = useSenha();
const [email, setEmail] = useState();


function handleSenha(event) {
  event.preventDefault();

  postEsqueciSenha(email);
}


  return (
    <form className="form-senha-email" onSubmit={handleSenha}>
      <h2>Trocar senha</h2>
      <Input
        type="email"
        label="E-mail:"
        name="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <Button>Enviar</Button>
    </form>
  );
}
