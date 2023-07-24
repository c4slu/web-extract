import { useRouter } from "next/router";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { BsFillGridFill, BsSearch, BsPostcardHeart } from "react-icons/bs";
import Image from "next/image";
import logo from "../../public/logo_tel.png"
export default function Navbar() {
    const router = useRouter();
  const pages = [
    {
      id: 1,
      name: "Home",
      icon: <BsFillGridFill />,
    },
    {
      id: 2,
      name: "Pesquisa",
      icon: <BsSearch />,
    },
    {
      id: 3,
      name: "Nota",
      icon: <BsPostcardHeart />,
    },
  ];
  const [hovered, setHovered] = useState("");
  return (
    <div className="bg-black border-r-[1px] border-white/20 h-screen">
      <div className="flex flex-col ">
        <div className="w-[220px] h-screen flex flex-col justify-center items-center bg-black">
          <Link href="./">
            <Image
              src={logo}
              width={80}
              height={80}
              className="m-5 flex items-center"
              alt=""
            />
          </Link>
          <nav className=" h-full flex items-center justify-center flex-1 ">
            <ul className="inline-flex gap-2 flex-col relative top-5 m-0 p-0">
              {pages.map((page) => {
                const path = `/${page.name.toLowerCase()}`;
                const isHovered = hovered === page.name;

                return (
                  <li key={page.id}>
                    <Link href={path} passHref>
                      <span
                        className="border-0 relative"
                        onMouseEnter={() =>
                          setHovered(page.name)
                        }
                        onMouseLeave={() => setHovered("")}
                      >
                        <motion.span
                          className={`inline-block gap-2 justify-center text-center cursor-pointer text-sm font-medium uppercase px-3 transition-colors ${
                            router.pathname === path
                              ? "text-white"
                              : "text-gray-500"
                          }`}
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex gap-2 items-center"
                          >
                            {isHovered && (
                              <motion.span
                                className="absolute left-0 right-0 -top-1.5  bg-white/20 py-4 px-2 rounded $borderRadius"
                                layoutId="div"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              />
                            )}
                            {page.icon} {page.name}
                          </motion.div>
                        </motion.span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}
