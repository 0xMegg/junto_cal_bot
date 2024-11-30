import { TimeSlot } from "@/types/chat";

interface FooterProps {
  userName: string;
  selectedTimes?: TimeSlot[];
}

const Footer: React.FC<FooterProps> = ({ userName, selectedTimes }) => {
  const formatSchedule = () => {
    if (!selectedTimes || selectedTimes.length === 0) return null;

    const timesByDay = selectedTimes.reduce((acc, time) => {
      if (!acc[time.day]) {
        acc[time.day] = [];
      }
      acc[time.day].push(time.hour);
      return acc;
    }, {} as Record<string, number[]>);

    const dayOrder = ["월", "화", "수", "목", "금", "토", "일"];
    return dayOrder
      .filter((day) => timesByDay[day])
      .map((day) => {
        const sortedHours = timesByDay[day].sort((a, b) => a - b);
        return `${day}요일 ${sortedHours
          .map((hour) => `${hour}시`)
          .join(", ")}`;
      })
      .join(" | ");
  };

  return (
    <footer className="bg-gray-100 py-4">
      <div className="container mx-auto text-center">
        {userName ? (
          <div className="space-y-2">
            <p className="text-gray-600">{userName}님 환영합니다!</p>
            {selectedTimes && selectedTimes.length > 0 && (
              <p className="text-sm text-gray-500">
                선택하신 시간: {formatSchedule()}
              </p>
            )}
          </div>
        ) : (
          <p className="text-gray-600">채팅창에서 이름을 입력해주세요.</p>
        )}
      </div>
    </footer>
  );
};

export default Footer;
