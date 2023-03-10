import { createBrowserRouter } from "react-router-dom";
import {
  CadastroScreen,
  EditarScreen,
  LoginScreen,
  MudarSenhaScreen,
  PerfilScreen,
} from "../ui/screens";
import { PrivateRoute } from "./private-route.component";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginScreen />,
  },
  {
    path: "/cadastro",
    element: <CadastroScreen />,
  },
  {
    path: "/perfil",
    element: <PrivateRoute Screen={PerfilScreen} />,
  },
  {
    path: "/perfil/editar",
    element: <PrivateRoute Screen={EditarScreen} />,
  },
  {
    path: "/redefinir-senha/:token",
    element: <PrivateRoute Screen={MudarSenhaScreen} />,
  },
]);
