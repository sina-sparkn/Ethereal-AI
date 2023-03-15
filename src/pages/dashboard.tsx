import Head from "next/head";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import Link from "next/link";

interface props {
  id: number;
  urls: string[];
  description: string;
  minted: boolean[];
  generatedAt: string;
  creatorWalletAddress: string;
}

export default function DashBoard() {
  const Account = useAccount();
  const [allData, setAllData] = useState([{}]);

  const getAllGeneratedImages = async () => {
    await axios
      .get(`/api/images/${Account.address}`)
      .then((res) => {
        //! I HAVE FIND A BETTER WAY TO IMPLEMENT THIS
        res.data.map((item: props) => {
          setAllData(() => [
            {
              item,
            },
          ]);
        });
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
          //! it should work but not like this
          {/* {allData.map((item, index) => {
            return (
              <div key={index} className="flex">
                <img src={item.urls[0]} />
                <img src={item.urls[1]} />
              </div>
            );
          })} */}
        </div>
      </Link>
    </>
  );
}
