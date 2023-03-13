import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import Link from "next/link";

export default function NavBar() {
  const { setTheme } = useWeb3ModalTheme();
  setTheme({
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent-color": "#3B82F6",
      "--w3m-button-border-radius": "7px",
      "--w3m-background-color": "#3B82F6",
    },
  });

  return (
    <nav className="p-5">
      <ul className="flex mb-5 items-center justify-between">
        <li className="w-28">
          <Link href="./">
            <img src="./typeface.svg" alt="logo-type" />
          </Link>
        </li>
        <li className="flex items-center gap-5">
          <Link href="/dashboard">Dashboard</Link>
          <Web3Button avatar="show" balance="hide" icon="hide" />
        </li>
      </ul>
      <hr className="border-0 h-0.5 bg-white/10" />
    </nav>
  );
}
