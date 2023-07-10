import Image from "next/image";
import { Inter } from "next/font/google";
import { SideBar, Container } from "@/components";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className={`bg-neutral-900 w-full h-screen gap-3  flex p-4 font-poppins`}>
      <SideBar />
      <Container />
    </main>
  );
}
