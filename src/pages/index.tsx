import Head from "next/head";
import Generate from "@/components/Generate/Generate";

export default function Home() {
  return (
    <>
      <Head>
        <title>EtheReal-AI</title>
        <meta name="description" content="Erhereal AI is a AI minting dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="./logoBlackBg.svg"></link>
      </Head>
      <main className="p-5">
        <Generate />
      </main>
    </>
  );
}
