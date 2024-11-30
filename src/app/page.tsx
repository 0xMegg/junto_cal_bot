"use client";

import { useState } from "react";
import Chatbot from "../components/Chatbot";
import Footer from "../components/Footer";

export default function Home() {
  const [userName, setUserName] = useState("");

  const handleNameConfirm = (name: string) => {
    setUserName(name);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <Chatbot onNameConfirm={handleNameConfirm} />
      </div>
      <Footer userName={userName} />
    </main>
  );
}
