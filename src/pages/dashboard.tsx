import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";

type props = {
  id: number;
  urls: string[];
  description: string;
  minted: boolean[];
  generatedAt: string;
  creatorWalletAddress: string;
};
export default function DashBoard() {
  const Account = useAccount();
  const [allData, setAllData] = useState<props[]>([]);

  useEffect(() => {
    const getAllGeneratedImages = async () => {
      await axios
        .get(`/api/images/${Account.address}`)
        .then((res) => {
          setAllData(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    getAllGeneratedImages();
  }, [Account.status]);

  if (Account.status === "connected") {
    return (
      <div>
        <Head>
          <title>Dashboard | RealAI</title>
          <meta name="description" content="user dashboard Erhereal. AI" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href="./favicon.svg"></link>
        </Head>
        <div className="flex items-center justify-between">
          <Link href="/dashboard">
            <span className="text-3xl font-bold">DashBoard</span>
          </Link>
        </div>
        <div className="mt-5 flex flex-col gap-5">
          {allData.map((item, index) => {
            return (
              <div
                key={index}
                className="grid grid-cols-2 gap-3 bg-white/10 rounded-xl p-3"
              >
                <div className="relative">
                  <img
                    className="rounded-xl w-full cursor-pointer"
                    src={item.urls[0]}
                    alt={`image-0-${item.description}`}
                  />
                  <div className="absolute bottom-0 w-full h-1/2 p-1 text-sm">
                    <div className="rounded-xl flex h-full flex-col justify-between bg-black/90 p-2">
                      <div className="flex items-center gap-0.5">
                        <span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-4 icon icon-tabler icon-tabler-file-description text-slate-300"
                            viewBox="0 0 24 24"
                            strokeWidth="2"
                            stroke="currentColor"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path
                              stroke="none"
                              d="M0 0h24v24H0z"
                              fill="none"
                            ></path>
                            <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                            <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z"></path>
                            <path d="M9 17h6"></path>
                            <path d="M9 13h6"></path>
                          </svg>
                        </span>
                        <p className="font-semibold text-slate-300 truncate">
                          {item.description}asfasasfasfasfasfafasfafasfasf
                        </p>
                      </div>
                      {!item.minted[0] ? (
                        <button className="rounded-md p-1 bg-LogoColor text-BaseColor font-semibold">
                          Mint
                        </button>
                      ) : (
                        <button
                          disabled
                          className="rounded-md p-1 bg-gray-600 text-BaseColor font-semibold"
                        >
                          Minted
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <img
                  className="rounded-xl w-full"
                  src={item.urls[1]}
                  alt={`image-1-${item.description}`}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <Head>
          <title>Dashboard | RealAI</title>
          <meta name="description" content="user dashboard Erhereal. AI" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href="./favicon.svg"></link>
        </Head>
        <div className="w-full h-96 flex items-center justify-center">
          <span className="text-xl font-semibold">
            Wallet is Not Connected!
          </span>
        </div>
      </>
    );
  }
}
