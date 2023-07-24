// ./pages/index.tsx

import { useEffect } from "react";
import { useRouter } from "next/router";
import Login from "../components/login";

const Home = () => {
  const router = useRouter();

  // Simulando a lógica de verificação do login
  const isLoggedIn = false; // Defina para true caso o usuário esteja logado

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/home");
    }
  }, [isLoggedIn]);

  return <div className="bg-black">{!isLoggedIn ? <Login /> : null}</div>;
};

export default Home;
