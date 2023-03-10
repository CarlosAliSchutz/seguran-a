import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../../api/user/logout.api";
import { useProfile } from "../../../api/user/me.api";
import { USER_KEY } from "../../../constants";
import useGlobalUser from "../../../context/user/user.context";
import { Button } from "../../components";
import { SolicitarTrocaScreen } from "../senha/solicitar-trocar.screen";
import "./index.css";

export function PerfilScreen() {
  const { getProfile, perfil, error } = useProfile();
  const { postLogout } = useLogout();
  const [, setUser] = useGlobalUser();
  const navigate = useNavigate();
  const [emailOpen, setEmailOpen] = useState(false);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (error) {
      localStorage.removeItem(USER_KEY);
    }
  });

  function handleClickLogout() {
    postLogout();

    setUser(null);
    localStorage.removeItem(USER_KEY);
  }

  function handleEditProfile() {
    navigate("/perfil/editar");
  }

  return (
    <div className="form">
      <div className="form-box profile-box">
        <Button onClick={handleClickLogout} className="logout">
          Sair
        </Button>
        <Button onClick={handleEditProfile} className="edit-profile">
          Alterar Perfil
        </Button>
        <img
          className="profile-image"
          src={perfil?.foto}
          alt="Foto Perfil Logado"
        />
        <h1 className="profile-title">Perfil</h1>
        <h2>Nome: {perfil?.nome}</h2>
        <h2>Telefone: {perfil?.telefone}</h2>
        <h2>Email: {perfil?.email}</h2>
        <p onClick={() => setEmailOpen(!emailOpen)} className="form-email">
          Trocar Senha
        </p>
      </div>
      {emailOpen && <SolicitarTrocaScreen />}
    </div>
  );
}
