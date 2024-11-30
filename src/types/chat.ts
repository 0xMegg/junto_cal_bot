export interface Message {
  text: string;
  sender: "bot" | "user";
}

export interface ChatbotProps {
  onNameConfirm: (name: string) => void;
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
