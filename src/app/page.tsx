"use client";

import { useState } from "react";
import Chatbot from "../components/Chatbot";
import Footer from "../components/Footer";
import { TimeSlot } from "@/types/chat";

export default function Home() {
  const [userName, setUserName] = useState("");
  const [selectedTimes, setSelectedTimes] = useState<TimeSlot[]>([]);

  const handleNameConfirm = (name: string) => {
    setUserName(name);
  };

  const handleScheduleConfirm = (times: TimeSlot[]) => {
    setSelectedTimes(times);
  };

  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1 flex items-center justify-center">
        <Chatbot
          onNameConfirm={handleNameConfirm}
          onScheduleConfirm={handleScheduleConfirm}
        />
      </div>
      <Footer userName={userName} selectedTimes={selectedTimes} />
    </main>
  );
}
