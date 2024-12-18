import { TimeSlot } from "@/types/chat";

interface FooterProps {
  userName: string;
  possibleTimes?: TimeSlot[];
  impossibleTimes?: TimeSlot[];
}

const Footer: React.FC<FooterProps> = ({
  userName,
  possibleTimes,
  impossibleTimes,
}) => {
  const formatSchedule = (times?: TimeSlot[]) => {
    if (!times || times.length === 0) return null;

    const timesByDay = times.reduce((acc, time) => {
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
    <footer className="bg-gray-100 h-[120px] flex items-center">
      <div className="container mx-auto text-center h-full flex items-center">
        {userName ? (
          <div className="w-full space-y-2">
            <p className="text-gray-600 h-[24px]">{userName}님 환영합니다!</p>
            {possibleTimes && possibleTimes.length > 0 && (
              <p className="text-sm text-green-600 h-[24px]">
                참여 가능 시간: {formatSchedule(possibleTimes)}
              </p>
            )}
            {impossibleTimes && impossibleTimes.length > 0 && (
              <p className="text-sm text-red-600 h-[24px]">
                참여 불가능 시간: {formatSchedule(impossibleTimes)}
              </p>
            )}
          </div>
        ) : (
          <div className="w-full">
            <p className="text-gray-600">채팅창에서 이름을 입력해주세요.</p>
          </div>
        )}
      </div>
    </footer>
  );
};

export default Footer;
