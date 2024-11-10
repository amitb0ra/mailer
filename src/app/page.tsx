"use client";
import Navbar from "../components/navbar";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [content, setContent] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [recieverEmail, setRecieverEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [log, setLog] = useState("YOUR LOGS WILL BE DISPLAYED HERE");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("submitted");
    console.log(content, senderEmail, recieverEmail, subject);
    setContent("");
    setSenderEmail("");
    setRecieverEmail("");
    setSubject("");

    fetch("/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content,
        sender: senderEmail,
        receiver: recieverEmail,
        subject,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLog(data.message);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <div className="h-screen">
        <Navbar />
        <form onSubmit={handleSubmit}>
          <div className="flex w-full gap-3 p-5">
            <div className="w-full">
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="enter content"
              />
            </div>
            <div className="w-full flex flex-col gap-3">
              <Input
                type="email"
                value={senderEmail}
                onChange={(e) => setSenderEmail(e.target.value)}
                placeholder="enter sender's email"
              />
              <Input
                type="email"
                value={recieverEmail}
                onChange={(e) => setRecieverEmail(e.target.value)}
                placeholder="enter reciever's email"
              />
              <Input
                type="text"
                value={subject}
                placeholder="enter subject"
                onChange={(e) => setSubject(e.target.value)}
              />
              <div className="flex justify-center gap-11">
                <Button>Reset</Button>
                <Button type="submit">Send</Button>
              </div>
            </div>
          </div>
        </form>
        <div className="border min-h-[400px] m-5 rounded-xl p-4">{log}</div>
      </div>
    </>
  );
}
