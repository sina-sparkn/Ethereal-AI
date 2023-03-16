import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const { setTheme } = useWeb3ModalTheme();
  const router = useRouter();

  setTheme({
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent-color": "#3B82F6",
      "--w3m-button-border-radius": "50px",
      "--w3m-background-color": "#3B82F6",
      "--w3m-background-border-radius": "18px",
    },
  });

  return (
    <nav className="mb-5">
      <ul className="flex mb-5 items-center justify-between">
        <li className="w-28">
          <Link href="./">
            <img src="./typeface.svg" alt="logo-type" />
          </Link>
        </li>
        <li className="flex items-center gap-5">
          {router.asPath !== "/dashboard" && (
            <Link href="/dashboard">Dashboard</Link>
          )}

          <Web3Button
            avatar="hide"
            balance="hide"
            icon="hide"
            label="Connect Wallet"
          />
        </li>
      </ul>
      <hr className="border-0 h-0.5 bg-white/10" />
    </nav>
  );
}
