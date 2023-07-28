import { useRouter } from "next/router";
import { motion, AnimateSharedLayout } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { BsFillGridFill, BsSearch, BsPostcardHeart } from "react-icons/bs";
import Image from "next/image";
import { AreaChart, FolderDown, LogOut } from "lucide-react";

export default function MenuBar() {
    const router = useRouter();
  const pages = [
    {
      id: 1,
      name: "Home",
      icon: <FolderDown className="w-5 h-5" />,
    },
    {
      id: 2,
      name: "pbi",
      icon: <AreaChart className="w-5 h-5"/>
    }
  ];
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push("/login")
  }

  const [hovered, setHovered] = useState("");
  return (
    <div className="bg-black">
      <div className="flex flex-col ">
        <div className="w-[100px] h-[calc(100vh-125px)] flex flex-col items-center justify-between bg-black">
          <nav className="h-full flex  items-center ">
            <ul className="flex-col  h-full">
              {pages.map((page) => {
                const path = `/${page.name.toLowerCase()}`;
                const isHovered = hovered === page.name;

                return (
                  <li key={page.id}>
                    <Link href={path} passHref>
                      <span
                        className="border-0  relative"
                        onMouseEnter={() =>
                          setHovered(page.name)
                        }
                        onMouseLeave={() => setHovered("")}
                      >
                        <motion.span
                          className={`inline-block gap-4 cursor-pointer text-xs font-medium uppercase px-3 transition-colors ${
                            router.pathname === path
                              ? "text-white"
                              : "text-gray-500"
                          }`}
                        >
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex mt-5 items-center"
                          >
                            {isHovered && (
                              <motion.span
                                className="absolute left-0 right-0 -top-1.5 text-xs bg-white/20 py-4 px-2 rounded $borderRadius"
                                layoutId="div"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              />
                            )}
                            {page.icon}
                            {/* {page.name} */}
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
        <button onClick={handleLogout}>
          <div className="w-full flex flex-col list-none justify-center items-center">
            <li className="p-3 rounded hover:bg-white/10 cursor-pointer">
              <LogOut className="h-4" />
            </li>
          </div>
        </button>
      </div>
    </div>
  );
}
