"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface Message {
  type: "bot" | "user";
  content: string;
  options?: string[];
}

const ChatContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
`;

const MessageBubble = styled.div<{ $isBot: boolean }>`
  display: flex;
  justify-content: ${(props) => (props.$isBot ? "flex-start" : "flex-end")};
  margin: 10px 0;
`;

const BubbleContent = styled.div<{ $isBot: boolean }>`
  background-color: ${(props) => (props.$isBot ? "#e9ecef" : "#007bff")};
  color: ${(props) => (props.$isBot ? "#000" : "#fff")};
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 70%;
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-end;
`;

const OptionButton = styled.button<{ $visible: boolean }>`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 15px;
  cursor: pointer;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transform: translateY(${(props) => (props.$visible ? 0 : "10px")});
  transition: opacity 0.3s ease, transform 0.3s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const Chatbot = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [visibleOptions, setVisibleOptions] = useState<boolean[]>([]);

  const message: Message = {
    type: "bot",
    content:
      "질문 1 : 글자수를 늘리기 위한 아무 의미 없는 텍스트를 길게 칩니다.",
    options: ["대답버튼1", "대답버튼2", "대답버튼3"],
  };

  useEffect(() => {
    if (!isTyping && message.options) {
      message.options.forEach((_, index) => {
        setTimeout(() => {
          setVisibleOptions((prev) => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }, index * 300); // 각 버튼이 300ms 간격으로 나타남
      });
    }
  }, [isTyping, message.options]);

  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    setDisplayedText("");
    setVisibleOptions([]); // 옵션 버튼 초기화

    const typingInterval = setInterval(() => {
      if (index < message.content.length) {
        setDisplayedText(message.content.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [message.content]);

  return (
    <ChatContainer>
      <MessageBubble $isBot={true}>
        <BubbleContent $isBot={true}>{displayedText}</BubbleContent>
      </MessageBubble>

      {!isTyping && (
        <OptionsContainer>
          <BubbleContent $isBot={false}>
            {message.options?.map((option, index) => (
              <OptionButton
                key={index}
                $visible={visibleOptions[index] || false}
              >
                {option}
              </OptionButton>
            ))}
          </BubbleContent>
        </OptionsContainer>
      )}
    </ChatContainer>
  );
};

export default Chatbot;
