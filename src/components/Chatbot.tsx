"use client";

import React, { useState } from "react";
import { Message, ChatbotProps, TimeSlot } from "@/types/chat";
import ScheduleGrid from "./ScheduleGrid";

const Chatbot: React.FC<ChatbotProps> = ({
  onNameConfirm,
  onScheduleConfirm,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [userName, setUserName] = useState("");
  const [isNameConfirmed, setIsNameConfirmed] = useState(false);
  const [selectedTimes, setSelectedTimes] = useState<TimeSlot[]>([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isSelectingImpossible, setIsSelectingImpossible] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [inputOpacity, setInputOpacity] = useState(1);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages, showSchedule]);

  React.useEffect(() => {
    const initialMessage: Message = {
      text: "안녕하세요! 당신의 이름을 알려주세요.",
      sender: "bot",
    };
    addMessageWithTypingEffect(initialMessage);
  }, []);

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

  const addMessageWithTypingEffect = async (message: Message) => {
    setIsTyping(true);
    const tempMessage = { ...message, text: "", isTyping: true };
    setMessages((prev) => [...prev, tempMessage]);

    const textToType = message.text;
    let currentText = "";

    for (let i = 0; i < textToType.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 30)); // 타이핑 속도 조절
      currentText += textToType[i];
      setMessages((prev) =>
        prev.map((msg, idx) =>
          idx === prev.length - 1 ? { ...msg, text: currentText } : msg
        )
      );
    }

    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 ? { ...message, isTyping: false } : msg
      )
    );
    setIsTyping(false);
  };

  const handleConfirmResponse = async (isConfirmed: boolean) => {
    const response = isConfirmed ? "네" : "아니오";
    const userMessage: Message = {
      text: response,
      sender: "user",
    };
    setMessages((prev) =>
      prev.map((msg) => ({ ...msg, showConfirmButtons: false }))
    );
    setMessages((prev) => [...prev, userMessage]);

    if (!isNameConfirmed) {
      if (isConfirmed) {
        const botResponse: Message = {
          text: `환영합니다, ${userName}님! 이제 준토에 참여하고 싶은 시간을 선택해주세요.(복수 선택 가능)`,
          sender: "bot",
        };
        setIsNameConfirmed(true);
        setInputOpacity(0);
        setTimeout(() => setShowInput(false), 1000);
        await addMessageWithTypingEffect(botResponse);
        setShowSchedule(true);
        onNameConfirm(userName);
      } else {
        setUserName("");
        const botResponse: Message = {
          text: "죄송합니다. 다시 한 번 이름을 알려주시겠어요?",
          sender: "bot",
        };
        await addMessageWithTypingEffect(botResponse);
      }
    } else {
      if (isConfirmed) {
        if (isSelectingImpossible) {
          const saveMessage: Message = {
            text: "선택하신 시간이 저장되었습니다.",
            sender: "bot",
          };
          await addMessageWithTypingEffect(saveMessage);

          const thankMessage: Message = {
            text: "응답해 주셔서 감사합니다!",
            sender: "bot",
          };
          await addMessageWithTypingEffect(thankMessage);

          const impossibleTimes = selectedTimes.map((time) => ({
            ...time,
            isImpossible: true,
          }));
          onScheduleConfirm(impossibleTimes, true);
        } else {
          const saveMessage: Message = {
            text: "선택하신 시간이 저장되었습니다.",
            sender: "bot",
          };
          await addMessageWithTypingEffect(saveMessage);

          const nextMessage: Message = {
            text: "이제 참여가 불가능한 시간을 선택해주세요 (복수 선택 가능)",
            sender: "bot",
          };
          await addMessageWithTypingEffect(nextMessage);

          const possibleTimes = selectedTimes.map((time) => ({
            ...time,
            isImpossible: false,
          }));
          onScheduleConfirm(possibleTimes, false);

          setSelectedTimes([]);
          setIsSelectingImpossible(true);
          setShowSchedule(true);
        }
      } else {
        const botResponse: Message = {
          text: "다시 선택해주세요.",
          sender: "bot",
        };
        await addMessageWithTypingEffect(botResponse);
        setShowSchedule(true);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: Message = {
      text: inputText,
      sender: "user",
    };
    setMessages((prev) => [...prev, userMessage]);

    if (!isNameConfirmed && userName === "") {
      setUserName(inputText);
      const botResponse: Message = {
        text: `${inputText}님이 맞으신가요?`,
        sender: "bot",
        showConfirmButtons: true,
      };
      await addMessageWithTypingEffect(botResponse);
    }

    setInputText("");
  };

  const handleScheduleConfirm = async () => {
    const dayOrder = ["월", "화", "수", "목", "금", "토", "일"];

    const timesByDay = selectedTimes.reduce((acc, time) => {
      if (!acc[time.day]) {
        acc[time.day] = [];
      }
      acc[time.day].push(time.hour);
      return acc;
    }, {} as Record<string, number[]>);

    const timeStrings = dayOrder
      .filter((day) => timesByDay[day])
      .map((day) => {
        const sortedHours = timesByDay[day].sort((a, b) => a - b);
        return `${day}요일 : ${sortedHours
          .map((hour) => `${hour}시`)
          .join(", ")}`;
      })
      .join("\n");

    const confirmMessage: Message = {
      text: `선택하신 ${
        isSelectingImpossible ? "불가능한" : "참여 희망"
      } 시간이\n${timeStrings}\n맞으신가요?`,
      sender: "bot",
      showConfirmButtons: true,
    };
    setShowSchedule(false);
    await addMessageWithTypingEffect(confirmMessage);
  };

  return (
    <div className="w-[800px] h-[calc(100vh-120px)] border border-gray-200 rounded-lg flex flex-col bg-white">
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {messages.map((message, index) => (
          <div
            key={index}
            className={
              message.sender === "user" ? "flex flex-col items-end" : ""
            }
          >
            <div
              className={`inline-block rounded-lg p-2 mb-2 shadow-sm whitespace-pre-line ${
                message.sender === "user"
                  ? "bg-blue-500 text-white"
                  : "bg-white"
              }`}
            >
              {message.text}
              {message.isTyping && "▋"}
            </div>
            {message.showConfirmButtons && !message.isTyping && (
              <div className="flex gap-2 mb-4">
                <button
                  onClick={() => handleConfirmResponse(true)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  네
                </button>
                <button
                  onClick={() => handleConfirmResponse(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                >
                  아니오
                </button>
              </div>
            )}
          </div>
        ))}
        {showSchedule && (
          <div className="my-4 animate-fade-in">
            <ScheduleGrid
              onTimeSelect={handleTimeSelect}
              selectedTimes={selectedTimes}
              onConfirm={handleScheduleConfirm}
              isSelectingImpossible={isSelectingImpossible}
            />
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      {showInput && (
        <div
          className="flex p-4 border-t border-gray-200 bg-white transition-all duration-1000 ease-in-out"
          style={{ opacity: inputOpacity }}
        >
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
      )}
    </div>
  );
};

export default Chatbot;
