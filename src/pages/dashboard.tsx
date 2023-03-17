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
      <>
        <Head>
          <title>Dashboard | RealAI</title>
          <meta name="description" content="user dashboard Erhereal. AI" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" type="image/x-icon" href="./favicon.svg"></link>
        </Head>
        <Link href="/dashboard">
          <span className="text-3xl font-bold">DashBoard</span>
        </Link>
        <div className="flex flex-col">
          {allData.map((item, index) => {
            return (
              <div key={index} className="flex flex-col gap-5 p-10">
                <img src={item.urls[0]} alt="" />
                <img src={item.urls[1]} alt="" />
                <p>{item.creatorWalletAddress}</p>
                <p>{item.description}</p>
                <p>{item.generatedAt}</p>
                <p>{Number(item.minted[0])}</p>
                <p>{Number(item.minted[1])}</p>
                <p>{item.id}</p>
              </div>
            );
          })}
        </div>
      </>
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
