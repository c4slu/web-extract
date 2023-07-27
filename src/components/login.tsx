// ./components/Login.tsx

import { useState } from 'react';
import axios from 'axios';
import { Router, useRouter } from 'next/router';
import { Input } from "@/components/ui/input"
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import  logo  from '../../public/logo_tel.png'
import Image from 'next/image';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      console.log(response.data);

      router.push("/home");
      setIsLoggedIn(true);
      
    } catch (error) {
      setError('')
      setError('Credenciais inválidas.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-1/3 h-[400px] p-5 grid grid-rows-[min-content_1fr_min-content] rounded-xl border-none bg-zinc-950">
        <CardHeader className="flex justify-center items-center">
          <Image
            src={logo}
            width={80}
            height={80}
            className="m-3 flex items-center"
            alt=""
          />
          <CardTitle>
            Extração de dados - Aliansce
          </CardTitle>
          <CardDescription className="text-gray-400">
            Faça seu login para acessar as informações
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col justify-center items-center">
          <Input
            type="text"
            placeholder="Login"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="rounded mb-4"
          />
          <Input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded"
          />
        </CardContent>
        <CardFooter className="flex flex-col">
          <Button
            onClick={handleLogin}
            className="w-full flex flex-col justify-center items-center border-[1px] border-white/30 hover:bg-violet-500 hover:border-none rounded"
          >
            Entrar
          </Button>
          {error && (
            <p className="mt-4 text-gray-400">{error}</p>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
