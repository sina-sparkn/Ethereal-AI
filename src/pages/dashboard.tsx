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

  useEffect(() => {
    getAllGeneratedImages();
  }, []);

  return (
    <>
      <Head>
        <title>Dashboard | EtheReal-AI</title>
        <meta name="description" content="user dashboard Erhereal. AI" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Link href="/dashboard">
        <p className="text-3xl font-bold">DashBoard</p>
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
      </Link>
    </>
  );
}
