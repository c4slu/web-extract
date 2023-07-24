import { useEffect, useState } from "react";
import { useRouter } from "next/router";
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
        <div className="h-screen w-screen flex bg-black">
          <Navbar />
          <p>NOTA</p>
        </div>
      ) : null}
    </div>
  );
};

export default ExtractPage;
