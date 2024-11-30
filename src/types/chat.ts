export interface Message {
  text: string;
  sender: "bot" | "user";
}

export interface ChatbotProps {
  onNameConfirm: (name: string) => void;
}
