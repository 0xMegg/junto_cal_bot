export interface Message {
  text: string;
  sender: "bot" | "user";
  showConfirmButtons?: boolean;
  isTyping?: boolean;
}

export interface ChatbotProps {
  onNameConfirm: (name: string) => void;
  onScheduleConfirm: (times: TimeSlot[], isImpossible: boolean) => void;
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
  isSelectingImpossible?: boolean;
}

export interface FooterProps {
  userName: string;
  possibleTimes?: TimeSlot[];
  impossibleTimes?: TimeSlot[];
}
