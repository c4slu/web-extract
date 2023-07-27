import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import MenuBar from "../components/menubar";
import Navbar from "../components/navbar";
const ExtractPage = () => {
  const router = useRouter();

  // Simulando a lógica de verificação do login
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
      setIsLoggedIn(false);
    }, 300000); // 10 min  (600.000 milissegundos)
  }, [isLoggedIn]);

  return (
    <div>
      {isLoggedIn ? (
        <div className="h-screen w-screen">
          <Navbar />
          <div className="flex text-white bg-black">
            <div className="h-[calc(100vh-80px)] border-r-[1px] border-white/20">
              <MenuBar />
            </div>
            <p>PESQUISA</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ExtractPage;
