export interface Message {
  text: string;
  sender: "bot" | "user";
  showConfirmButtons?: boolean;
  isTyping?: boolean;
}

export interface ChatbotProps {
  onNameConfirm: (name: string) => void;
  onScheduleConfirm: (times: TimeSlot[]) => void;
}

export interface TimeSlot {
  day: string;
  hour: number;
  isSelected: boolean;
}

export interface ScheduleGridProps {
  onTimeSelect: (day: string, hour: number) => void;
  selectedTimes: TimeSlot[];
  onConfirm: () => void;
}

export interface FooterProps {
  userName: string;
  selectedTimes?: TimeSlot[];
}
