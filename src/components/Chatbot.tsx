"use client";
import { useState } from "react";

const Chatbot = () => {
  const [showSecondButton, setShowSecondButton] = useState(false);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {showSecondButton && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
          onClick={() => setShowSecondButton(false)}
        >
          버튼 2
        </button>
      )}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-600"
        onClick={() => setShowSecondButton(true)}
      >
        버튼 1
      </button>
    </div>
  );
};

export default Chatbot;
