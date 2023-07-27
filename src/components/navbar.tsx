import Image from "next/image";
import logo from "../../public/logo_tel.png";
import Link from "next/link";
export default function navbar() {
  return (
    <div className="">
      <Link href="./">
        <div className="w-screen h-[80px] flex items-center border-b-[1px] border-white/20">
          <Image
            src={logo}
            width={80}
            height={80}
            className="m-5 flex items-center justify-center"
            alt=""
          />
        </div>
      </Link>
    </div>
  );
}