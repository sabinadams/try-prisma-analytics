import type { ReactNode } from "react"


export default function Layout({ children }: { children: ReactNode }) {
  return <main className="m-0 p-0 w-100 h-screen">{children}</main>
}