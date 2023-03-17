import { Web3Button, useWeb3ModalTheme } from "@web3modal/react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const { setTheme } = useWeb3ModalTheme();
  const router = useRouter();

  setTheme({
    themeMode: "dark",
    themeVariables: {
      "--w3m-accent-color": "white",
      "--w3m-accent-fill-color": "black",
      "--w3m-button-border-radius": "10px",
      "--w3m-background-color": "white",
      "--w3m-background-border-radius": "18px",
    },
  });

  return (
    <nav className="mb-5">
      <ul className="flex mb-5 items-center justify-between">
        <li>
          <Link href="./">
            {router.asPath === "/dashboard" ? (
              <img
                src="./white/iconWhite.svg"
                alt="RealAI-Logo"
                className="w-8"
              />
            ) : (
              <img
                src="./blue/fullBlue.svg"
                alt="RealAI-FullLogo"
                className="w-32"
              />
            )}
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
