import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import hljs from "highlight.js";
import React from "react";
import { debug, timeStamp } from "console";

console.log('/pages/short-story - top')

const dev = process.env.NODE_ENV !== 'production';

const server = dev ? 'http://localhost:3000/api/sitecoreP' : 'https://mrfpmchone327gpt-hbef9rk4k0esupbgcqn29g-media.vercel.app/api/sitecoreP';
const server2 = dev ? 'http://localhost:3000/api/sitecoreP2' : 'https://mrfpmchone327gpt-hbef9rk4k0esupbgcqn29g-media.vercel.app/api/sitecoreP2';
const server3 = dev ? 'http://localhost:3000/api/sitecoreP3' : 'https://mrfpmchone327gpt-hbef9rk4k0esupbgcqn29g-media.vercel.app/api/sitecoreP3';

console.log (server)
console.log (server2)
console.log (server3)

export default function Review() {
  // Create a ref for the div element
  const textDivRef = useRef<HTMLDivElement>(null);
  const [productInput, setProductInput] = useState("");
  const [result, setResult] = useState(() => "");
  const [result2, setResult2] = useState(() => "");
  const [result3, setResult3] = useState(() => "");
  const [isLoading, setIsLoading] = useState(false);


  // Add a click event listener to the copy icon that copies the text in the div to the clipboard when clicked
  useEffect(() => {
    const copyIcon = document.querySelector(".copy-icon");
    if (!copyIcon) return;
    copyIcon.addEventListener("click", () => {
      const textDiv = textDivRef.current;
      let text;
      if (textDivRef.current) {
        text = textDivRef.current.textContent;
      }
      // Create a hidden textarea element
      const textArea = document.createElement("textarea");
      textArea.value = text;
      document.body.appendChild(textArea);

      // Select the text in the textarea
      textArea.select();

      // Copy the text to the clipboard
      document.execCommand("copy");

      // Remove the textarea element
      document.body.removeChild(textArea);
    });
  }, []); // Run this only once


  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
 
    const response = await fetch(server, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: productInput }),
    });


    const response2 = await fetch(server2, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: productInput }),
    });


    const response3 = await fetch(server3, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: productInput }),
    });

    const data = await response.json();
    const data2 = await response2.json();
    const data3 = await response3.json();

    let rawResult = data.result;
    let rawResult2 = data2.result;
    let rawResult3 = data3.result;


    // set result to the highlighted code. Address this error: Argument of type 'string' is not assignable to parameter of type '(prevState: undefined) => undefined'.ts(2345)
    setResult(rawResult);
    setResult2(rawResult2);
    setResult3(rawResult3);

    setProductInput("");
    setIsLoading(false);
  }

  return (
    <div>
       <Head>
      <title>Sitecore Personalized Content Creation</title>
      <meta name="description" content="" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

      <main
        className="flex flex-col 
                    items-center justify-center m-20"
      >
        <h3 className="text-slate-900 text-xl mb-3">
          Welcome to Play Travel where we make your dreams a reality
        </h3>
        <p className="text-slate-700 text-lg mb-3">
          What do you like to do?{" "}
        </p>
        <form onSubmit={onSubmit}>
          <input
            className="text-sm text-gray-base w-full 
                              mr-3 py-5 px-4 h-2 border 
                              border-gray-200 rounded mb-2"
            type="text"
            name="product"
            placeholder="Enter an activity like Scuba Diving"
            value={productInput}
            onChange={(e) => setProductInput(e.target.value)}
          />

          <button
            className="bg-blue text-sm w-full bg-midnight h-7 text-white rounded-2xl mb-10"
            type="submit"
          >
            Generate Personalized Content
          </button>
        </form>
        {isLoading ? (
          <p>Loading... be patient.. may take 30s+</p>
        ) : result ? (
          <div className="border-black relative w-2/4 ">
            <div className="rounded-md border-spacing-2 border-slate-900 bg-slate-100 break-words max-w-500 overflow-x-auto  ">
              <div
                ref={textDivRef}
                className="m-5 "
                dangerouslySetInnerHTML={{ __html: result }}
              />
                          <button className="bg-blue text-sm min-w-fit	 bg-midnight h-7 text-white rounded-2xl mb-10" type="submit">
              Read More
            </button>
            </div>

            <div className="rounded-md border-black border-spacing-2 border-slate-900 bg-slate-100 break-words max-w-500 overflow-x-auto  ">
              <div
                ref={textDivRef}
                className="m-5 "
                dangerouslySetInnerHTML={{ __html: result2 }}
              />
                          <button className="bg-blue text-sm min-w-fit	 bg-midnight h-7 text-white rounded-2xl mb-10" type="submit">
              Read More
            </button>
            </div>

            <div className="rounded-md border-spacing-2 border-slate-900 bg-slate-100 break-words max-w-500 overflow-x-auto  ">
              <div
                ref={textDivRef}
                className="m-5 "
                dangerouslySetInnerHTML={{ __html: result3 }}
              />
            <button className="bg-blue text-sm min-w-fit	 bg-midnight h-7 text-white rounded-2xl mb-10" type="submit">
              Read More
            </button>
            </div>
            <div className="copy-icon absolute top-0 right-0 mt-2 mr-2 cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-copy"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <rect x="8" y="8" width="12" height="12" rx="2"></rect>
                <path d="M16 8v-2a2 2 0 0 0 -2 -2h-8a2 2 0 0 0 -2 2v8a2 2 0 0 0 2 2h2"></path>
              </svg>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}


