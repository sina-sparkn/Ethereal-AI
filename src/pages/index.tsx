import Head from "next/head";
import Generate from "@/components/Generate/Generate";

export default function Home() {
  return (
    <>
      <Head>
        <title>RealAI</title>
        <meta name="description" content="RealAI is a AI minting dapp" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/x-icon" href="./favicon.svg"></link>
      </Head>
      <main className="xl:px-72">
        <Generate />
      </main>
    </>
  );
}
