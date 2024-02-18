"use client";
import React, { useEffect, useState } from "react";
import { Hanken_Grotesk } from "next/font/google";
import { Send, UsersRound } from "lucide-react";
import Image from "next/image";
import { useAccount } from "wagmi";

const hanken: any = Hanken_Grotesk({
  subsets: ["latin"],
  weight: "800",
});
export default function GlobalChat() {
  const [inputText, setInputText] = useState("");

  const address = useAccount();
  function sendMessage() {
    setMessages([
      ...messages,
      {
        address: address.address,
        text: inputText,
      },
    ]);
  }

  const [messages, setMessages] = useState(() => {
    // Retrieve messages from local storage when component mounts
    const storedMessages = localStorage.getItem("messages");
    return storedMessages ? JSON.parse(storedMessages) : [];
    // : [
    //     {
    //       address: "bot",
    //       text: "test",
    //     },
    //     { address: "bot", text: "test" },
    //     {
    //       address: address.address,
    //       text: "test",
    //     },
    //   ];
  });

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  return (
    <div className="flex gap-4 py-6">
      <div className="flex flex-col w-fit bg-mint-200 p-2 rounded-xl gap-y-4">
        <p
          className={`${hanken.className} text-lg flex items-center justify-center bg-mint-300 p-1.5 rounded-full `}
        >
          <UsersRound size={22} fill="#000" />
          120 Online
        </p>
        {[
          {
            name: "Reviewers",
            img: "/eyes.svg",
            users: ["/r1.png", "/r2.png", "/r3.png", "/r4.png", "/r5.png"],
          },
          {
            name: "Freelancers",
            img: "/wand.svg",
            users: ["/f11.png", "/f12.png", "/f13.png", "/f14.png", "/f15.png"],
          },
          {
            name: "Employers",
            img: "/briefcase.svg",
            users: ["/e1.png", "/e2.png", "/e3.png", "/e4.png", "/e5.png"],
          },
        ].map((name) => (
          <div className="w-full bg-mint-300 pt-4 px-4 rounded-xl ">
            <div className="bg-grad-role rounded-lg flex items-center gap-2 py-1 justify-center border-2 border-dark-800">
              <Image
                src={name.img}
                width={100}
                height={100}
                className="h-5 w-fit"
                alt="profile"
              />
              <p className={`${hanken.className} text-lg`}>{name.name}</p>
            </div>
            <>
              <div className="flex py-1  border-dark-800 items-center justify-start w-fit">
                {name.users.map((user) => (
                  <Image
                    src={user}
                    alt={user}
                    width={1500}
                    height={1500}
                    className="h-fit w-[2.7rem]"
                  />
                ))}
                <div className={`${hanken.className} text-xl text-green-500`}>
                  +5
                </div>
              </div>
            </>
          </div>
        ))}
      </div>
      <div className="flex-1 h-screen">
        <div className="w-full bg-mint-200 p-2 rounded-xl ">
          <div className="flex flex-col h-[80vh]">
            <div className="overflow-y-auto flex-grow">
              {messages.map((message: any) => (
                <div
                  className={`flex justify-${
                    message.address !== "bot" ? "end" : "start"
                  } mb-2`}
                >
                  {message.address === address.address ? (
                    <div>
                      <p>You</p>
                      <div className="w-fit max-w-md pt-2.5 pr-3 pb-1.5 rounded-lg bg-grad-soft flex items-start gap-0.5 text-lg">
                        <Image
                          src="/f11.png"
                          alt="bot"
                          width={1000}
                          height={1000}
                          className="h-fit w-fit"
                        />
                        {message.text}
                      </div>
                    </div>
                  ) : (
                    <div className="w-fit max-w-md pt-2.5 pr-3 pb-1.5 rounded-lg bg-mint-300 flex items-start gap-0.5 text-lg">
                      <Image
                        src="/f11.png"
                        alt="bot"
                        width={1000}
                        height={1000}
                        className="h-fit w-fit"
                      />
                      {message.text}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center p-4">
              <input
                type="text"
                placeholder="Type your message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-grow border rounded-lg p-2 mr-2 bg-mint-300 border-none text-dark-800-30"
              />
              <button
                onClick={() => sendMessage()}
                className="bg-grad-magic text-white p-2 rounded-full"
              >
                <Send size={18} fill="#fff" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
