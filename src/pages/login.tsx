import { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { useRouter } from "next/router";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import logo from "../../public/logo_tel.png";
import { Eye, EyeOff, Loader2, Check, Ban } from "lucide-react";

const checkAuthentication = () => {
  const authToken = localStorage.getItem("token"); // Ou qualquer outra forma de obter o token
  return !!authToken; // Retorna true se o token existir, ou false se não existir
};

interface Props {
  setLoggedIn: (isLoggedIn: boolean) => void;
}

const Login: React.FC<Props> = ({ setLoggedIn }) => {
  const router = useRouter();
  useEffect(() => {
    const isAuthenticated = checkAuthentication();

    // Se o usuário não estiver autenticado (ou seja, não tiver o token)
    // redirecionar para a página de login
    if (isAuthenticated) {
      router.push("/home"); // Redirecionar para a página de login
    }
  }, []);

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [site, setSite] = useState("");
  const [loading, setloading] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false); // Estado para controlar a visibilidade da senha
  const [loginMessage, setloginMessage] = useState("");
  const [statusLogin, setStatusLogin] = useState(false);

  const toggleSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleLogin = async () => {
    const credentials = {
      login: userName,
      senha: password,
      site: site,
    };

    setloading(true);

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      requestMode: "cors", // Use 'cors' para permitir receber a resposta da API
    };

    try {
      const response = await fetch(
        "http://10.71.201.251/apps/serviceLogin/login",
        options
      );
      const data = await response.json();
      setStatusLogin(true);
      console.log(data);
      if (data.erro == "false") {
        let secret =
          "9bd3717297e6ef69383e2f7999eb7131448e3333f74fa613a09677ca250408e2";
        const token = jwt.sign(credentials, secret);
        localStorage.setItem("token", token);

        if (token) {
          router.push("./home");
        }
        setloading(false);
      } else {
        console.log("off");
        setloginMessage(data.message);
        setloading(false);
      }
    } catch (err) {
      console.error(err);
      setStatusLogin(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <Card className="w-1/3 h-[450px] p-5 grid grid-rows-[min-content_1fr_min-content] rounded-xl border-none bg-zinc-950">
          <CardHeader className="flex justify-center items-center">
            <Image
              src={logo}
              width={80}
              height={80}
              className="m-3 flex items-center"
              alt=""
            />
            <CardTitle>Extração de dados - Aliansce</CardTitle>
            <CardDescription className="text-gray-400">
              Faça seu login para acessar as informações
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-center items-center">
            <Input
              list="sites-list"
              placeholder="Site"
              value={site}
              onChange={(e) => setSite(e.target.value)}
              className="rounded mb-4"
            />
            <datalist id="sites-list">
              <option value="Barueri"></option>
              <option value="SSA"></option>
              <option value="Matriz"></option>
              <option value="Itabuna"></option>
            </datalist>
            <Input
              type="text"
              placeholder="Login"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="rounded mb-4"
            />
            <Input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded"
            />
            <button
              type="button"
              onClick={toggleSenha}
              className="relative -top-8 left-44 text-xs disabled:text-zinc-700 disabled:cursor-not-allowed"
              disabled={password ? false : true}>
              {mostrarSenha ? <EyeOff /> : <Eye />}
            </button>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button
              onClick={handleLogin}
              disabled={site && userName && password ? false : true}
              className="w-full flex flex-col justify-center items-center border-[1px] border-white/30 hover:bg-violet-500 hover:border-none rounded">
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                <span>Entrar</span>
              )}
            </Button>

            <p className="mt-4 text-gray-400">{loginMessage}</p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Login;
