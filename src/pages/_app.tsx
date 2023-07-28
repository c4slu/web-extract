import { AppProps } from "next/app";
import { useEffect } from "react";
import { useRouter } from "next/router";
import "@/styles/globals.css";
const MyApp = ({ Component, pageProps }: AppProps) => {
  const router = useRouter();

  // Redirecionar para a página de login ao carregar o aplicativo
  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <div>
      {/* Aqui você pode colocar um cabeçalho, um menu ou qualquer outro layout comum a todas as páginas */}
      <Component {...pageProps} />
    </div>
  );
};

export default MyApp;
