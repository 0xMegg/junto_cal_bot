"use client";

import React, { useState } from "react";
import { Message, ChatbotProps } from "@/types/chat";

const Chatbot: React.FC<ChatbotProps> = ({ onNameConfirm }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [userName, setUserName] = useState("");
  const [isNameConfirmed, setIsNameConfirmed] = useState(false);

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      text: inputText,
      sender: "user",
    };

    setMessages((prev) => [...prev, userMessage]);

    if (!isNameConfirmed) {
      if (userName === "") {
        setUserName(inputText);
        const botResponse: Message = {
          text: `${inputText}님이 맞으신가요? (네/아니오로 답변해주세요)`,
          sender: "bot",
        };
        setMessages((prev) => [...prev, botResponse]);
      } else if (inputText.toLowerCase() === "네") {
        const botResponse: Message = {
          text: `환영합니다, ${userName}님! 무엇을 도와드릴까요?`,
          sender: "bot",
        };
        setIsNameConfirmed(true);
        onNameConfirm(userName);
        setMessages((prev) => [...prev, botResponse]);
      } else if (inputText.toLowerCase() === "아니오") {
        setUserName("");
        const botResponse: Message = {
          text: "죄송합니다. 다시 한 번 이름을 알려주시겠어요?",
          sender: "bot",
        };
        setMessages((prev) => [...prev, botResponse]);
      }
    }

    setInputText("");
  };

  return (
    <div className="w-[300px] h-[400px] border border-gray-200 rounded-lg flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-600 mt-5">
            안녕하세요! 당신의 이름을 알려주세요.
          </div>
        ) : (
          messages.map((message, index) => (
            <div
              key={index}
              className={`max-w-[70%] rounded-lg p-2 mb-2 ${
                message.sender === "user"
                  ? "bg-blue-500 text-white ml-auto"
                  : "bg-gray-100 mr-auto"
              }`}
            >
              {message.text}
            </div>
          ))
        )}
      </div>
      <div className="flex p-4 border-t border-gray-200">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="메시지를 입력하세요..."
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          전송
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
