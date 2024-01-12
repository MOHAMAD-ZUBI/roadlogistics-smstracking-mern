import { useSession } from "next-auth/react";
import Analytics from "../components/Analytics";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";

export default async function Home() {
  const session = await getServerSession(options);
  return (
    <div>
      <div className=" hover:scale-[1.01] duration-500 py-10 px-4 overflow-hidden bg-gradient-to-tr from-purple-200 to-purple-300 shadow-2xl shadow-primaryBgColor/50 flex flex-row max-xl:flex-col h-full justify-around items-center rounded-3xl mt-10">
        <div>
          <h1 className="text-black/80 text-5xl max-sm:text-4xl font-bold">
            Road Logistics
          </h1>
          <h1 className="text-black/60 text-3xl max-sm:text-2xl font-bold mt-4">
            Welcome {session.user.userName}!
          </h1>
        </div>
        <Image src={"/background.png"} height={450} width={450} alt="image" />
      </div>
      <Analytics />
    </div>
  );
}
