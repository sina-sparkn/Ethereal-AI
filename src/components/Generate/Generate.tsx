import { Configuration, OpenAIApi } from "openai";
import { useState } from "react";
import { useAccount } from "wagmi";
import toast from "react-hot-toast";
import axios from "axios";

/*OPENAI CONFIG*/
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// MAIN FUNCTION
export default function Generate() {
  const [prompt, setPrompt] = useState("");
  const [data, setData] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // WAGMI CONFIGS
  const Account = useAccount();

  // GENERATE FUNCTION
  const generateImages = async () => {
    const toastId = toast.loading("generating...");
    setIsGenerating(true);
    setData([]);
    try {
      const response = await openai.createImage({
        prompt: prompt,
        n: 2,
        size: "256x256",
        response_format: "url",
      });

      response.data.data.map((item) => {
        setData((data) => [...data, item.url as string]);
      });

      saveImages(
        [
          response.data.data[0].url as string,
          response.data.data[1].url as string,
        ],
        prompt
      );

      setIsGenerating(false);
      toast.success("generated", {
        id: toastId,
      });
    } catch (err) {
      toast.error("Error", {
        id: toastId,
      });
      setIsGenerating(false);
      console.error(err);
    }
  };

  /* SAVE IMAGES TO DATABASE FUNCTION */
  const saveImages = async (urls: string[], thePrompt: string) => {
    await axios
      .post("/api/saveimages", {
        ImageURLs: [urls[0], urls[1]],
        Description: thePrompt,
        WalletAddress: Account.address,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5">
      <section className="relative text-lg bg-zinc-800 border-2 border-zinc-700/50 rounded-lg w-full">
        <textarea
          className="w-full bg-zinc-800 p-4 rounded-t-lg resize-none outline-none"
          rows={6}
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
          name="textarea"
          placeholder="Use your god damn imaginations ..."
        ></textarea>
        <div className="w-full p-3 bg-zinc-800 rounded-b-lg">
          {(() => {
            if (Account.status === "connected") {
              if (isGenerating) {
                return (
                  <button
                    disabled
                    className="w-full bg-blue-500 p-2.5 rounded-lg disabled:bg-gray-600 disabled:text-gray-400"
                  >
                    Generating...
                  </button>
                );
              } else {
                return (
                  <button
                    className="w-full bg-blue-500 p-2.5 rounded-lg disabled:bg-gray-600 disabled:text-gray-400"
                    onClick={generateImages}
                  >
                    Generate
                  </button>
                );
              }
            } else {
              return (
                <button
                  disabled
                  className="w-full bg-blue-500 p-2.5 rounded-lg disabled:bg-gray-600 disabled:text-gray-400"
                >
                  Connect Your Wallet
                </button>
              );
            }
          })()}
        </div>
      </section>
      {data.length > 0 && (
        <section className="gap-5 lg:mt-0 rounded-lg grid grid-cols-2">
          {data?.map((item, index) => {
            return (
              <img
                src={item}
                key={index}
                className="rounded-xl border-2 border-zinc-700/50"
              />
            );
          })}
        </section>
      )}
    </div>
  );
}
