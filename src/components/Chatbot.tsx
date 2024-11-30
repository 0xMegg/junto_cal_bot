"use client";

import React, { useState } from "react";
import { Message, ChatbotProps, TimeSlot } from "@/types/chat";
import ScheduleGrid from "./ScheduleGrid";

const Chatbot: React.FC<ChatbotProps> = ({ onNameConfirm }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "안녕하세요! 당신의 이름을 알려주세요.",
      sender: "bot",
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [userName, setUserName] = useState("");
  const [isNameConfirmed, setIsNameConfirmed] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<TimeSlot[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const handleTimeSelect = (day: string, hour: number) => {
    setSelectedTimes((prev) => {
      const existingIndex = prev.findIndex(
        (slot) => slot.day === day && slot.hour === hour
      );

      if (existingIndex >= 0) {
        return prev.filter((_, index) => index !== existingIndex);
      }

      return [...prev, { day, hour, isSelected: true }];
    });
  };

  const handleScheduleConfirm = () => {
    const dayOrder = ["월", "화", "수", "목", "금", "토", "일"];

    // 요일별로 시간을 그룹화
    const timesByDay = selectedTimes.reduce((acc, time) => {
      if (!acc[time.day]) {
        acc[time.day] = [];
      }
      acc[time.day].push(time.hour);
      return acc;
    }, {} as Record<string, number[]>);

    // 요일 순서대로 정렬하고 시간도 정렬
    const timeStrings = dayOrder
      .filter((day) => timesByDay[day]) // 선택된 요일만 필터링
      .map((day) => {
        const sortedHours = timesByDay[day].sort((a, b) => a - b);
        return `${day}요일 : ${sortedHours
          .map((hour) => `${hour}시`)
          .join(", ")}`;
      })
      .join("\n");

    const confirmMessage: Message = {
      text: `선택하신 시간이\n${timeStrings}\n맞으신가요? (네/아니오)`,
      sender: "bot",
    };
    setMessages((prev) => [...prev, confirmMessage]);
    setShowSchedule(false);
  };

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
          text: `환영합니다, ${userName}님! 이제 준토에 참여하고 싶은 시간을 선택해주세요.`,
          sender: "bot",
        };
        setIsNameConfirmed(true);
        setShowSchedule(true);
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
    <div className="w-[800px] h-[calc(100vh-80px)] border border-gray-200 rounded-lg flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`max-w-[70%] rounded-lg p-2 mb-2 shadow-sm whitespace-pre-line ${
              message.sender === "user"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-white mr-auto"
            }`}
          >
            {message.text}
          </div>
        ))}
        {showSchedule && (
          <div className="my-4">
            <ScheduleGrid
              onTimeSelect={handleTimeSelect}
              selectedTimes={selectedTimes}
              onConfirm={handleScheduleConfirm}
            />
          </div>
        )}
      </div>
      <div className="flex p-4 border-t border-gray-200 bg-white">
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
