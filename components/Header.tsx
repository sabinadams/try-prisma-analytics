import { signOut } from "next-auth/react"
import Image from "next/image"
export default function Header() {
  return <header className="bg-gray-200 border-b-2 border-gray-500 py-3 px-5 flex justify-end items-center">
    <Image alt="logo" src="/try-prisma-analytics.png" height={50} width={50} />
    <div className="flex-1" />
    <button onClick={() => signOut({ callbackUrl: '/login' })} className="text-lg text-center border-2 border-gray-500 text-gray-500 text-bold flex justify-center items-center px-2 h-10 rounded-xl m-0">
      <p>Log Out</p>
    </button>
  </header>
}