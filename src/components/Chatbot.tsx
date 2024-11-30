"use client";

import React, { useState, useEffect } from "react";
import styled from "styled-components";

interface DialogueNode {
  content: string;
  options?: string[];
  next?: { [key: string]: DialogueNode };
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

const dialogueTree: DialogueNode = {
  content: "질문 1",
  options: ["대답버튼1", "대답버튼2", "대답버튼3"],
  next: {
    대답버튼1: {
      content: "질문 2-1",
      options: ["대답 2-1-1", "대답 2-1-2", "대답 2-1-3"],
    },
    대답버튼2: {
      content: "질문 2-2",
      options: ["대답 2-2-1", "대답 2-2-2", "대답 2-2-3"],
    },
    대답버튼3: {
      content: "질문 2-3",
      options: ["대답 2-3-1", "대답 2-3-2", "대답 2-3-3"],
    },
  },
};

const Chatbot = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [visibleOptions, setVisibleOptions] = useState<boolean[]>([]);
  const [currentNode, setCurrentNode] = useState<DialogueNode>(dialogueTree);

  const handleOptionClick = (option: string) => {
    if (currentNode.next && currentNode.next[option]) {
      setCurrentNode(currentNode.next[option]);
    }
  };

  useEffect(() => {
    if (!isTyping && currentNode.options) {
      currentNode.options.forEach((_, index) => {
        setTimeout(() => {
          setVisibleOptions((prev) => {
            const newVisible = [...prev];
            newVisible[index] = true;
            return newVisible;
          });
        }, index * 300);
      });
    }
  }, [isTyping, currentNode.options]);

  useEffect(() => {
    let index = 0;
    setIsTyping(true);
    setDisplayedText("");
    setVisibleOptions([]);

    const typingInterval = setInterval(() => {
      if (index < currentNode.content.length) {
        setDisplayedText(currentNode.content.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(typingInterval);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [currentNode]);

  return (
    <ChatContainer>
      <MessageBubble $isBot={true}>
        <BubbleContent $isBot={true}>{displayedText}</BubbleContent>
      </MessageBubble>

      {!isTyping && (
        <OptionsContainer>
          <BubbleContent $isBot={false}>
            {currentNode.options?.map((option, index) => (
              <OptionButton
                key={index}
                $visible={visibleOptions[index] || false}
                onClick={() => handleOptionClick(option)}
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
