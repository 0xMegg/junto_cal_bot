import React from "react";
import { TimeSlot, ScheduleGridProps } from "@/types/chat";

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  onTimeSelect,
  selectedTimes,
  onConfirm,
  isSelectingImpossible,
}) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  const isSelected = (day: string, hour: number) => {
    return selectedTimes.some((time) => time.day === day && time.hour === hour);
  };

  const getButtonStyle = (day: string, hour: number) => {
    const isPossible = isPossibleTime(day, hour);
    const selected = isSelected(day, hour);

    if (isSelectingImpossible) {
      if (isPossible) {
        return "bg-green-400";
      }
      if (selected) {
        return "bg-red-500 hover:bg-red-600";
      }
    } else {
      if (selected) {
        return "bg-green-500 hover:bg-green-600";
      }
    }

    return "bg-gray-100 hover:bg-blue-100";
  };

  const isPossibleTime = (day: string, hour: number) => {
    const possibleTimes = JSON.parse(
      localStorage.getItem("possibleTimes") || "[]"
    );
    return possibleTimes.some(
      (time: TimeSlot) => time.day === day && time.hour === hour
    );
  };

  const handleTimeClick = (day: string, hour: number) => {
    if (isSelectingImpossible && isPossibleTime(day, hour)) {
      return;
    }
    onTimeSelect(day, hour);
  };

  const handleConfirm = () => {
    if (!isSelectingImpossible) {
      localStorage.setItem("possibleTimes", JSON.stringify(selectedTimes));
    }
    onConfirm();
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="text-sm font-medium mb-2"></div>
      <div className="grid grid-cols-8 gap-1">
        <div className="h-8"></div>
        {days.map((day) => (
          <div
            key={day}
            className="h-8 flex items-center justify-center font-medium"
          >
            {day}
          </div>
        ))}
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="h-8 flex items-center justify-center text-sm">
              {`${hour}:00`}
            </div>
            {days.map((day) => (
              <button
                key={`${day}-${hour}`}
                onClick={() => handleTimeClick(day, hour)}
                disabled={isSelectingImpossible && isPossibleTime(day, hour)}
                className={`h-8 transition-colors rounded-sm ${getButtonStyle(
                  day,
                  hour
                )} ${
                  isSelectingImpossible && isPossibleTime(day, hour)
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      <div className="mt-4 flex justify-end">
        {selectedTimes.length > 0 ? (
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            선택 완료
          </button>
        ) : (
          <div className="px-4 py-2 h-[40px] w-[89px]"></div>
        )}
      </div>
    </div>
  );
};

export default ScheduleGrid;
