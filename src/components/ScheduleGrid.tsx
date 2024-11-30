import React from "react";
import { TimeSlot, ScheduleGridProps } from "@/types/chat";

const ScheduleGrid: React.FC<ScheduleGridProps> = ({
  onTimeSelect,
  selectedTimes,
  onConfirm,
}) => {
  const days = ["월", "화", "수", "목", "금", "토", "일"];
  const hours = [8, 9, 10, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22];

  const isSelected = (day: string, hour: number) => {
    return selectedTimes.some((time) => time.day === day && time.hour === hour);
  };

  return (
    <div className="w-full overflow-x-auto">
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
                onClick={() => onTimeSelect(day, hour)}
                className={`h-8 transition-colors rounded-sm ${
                  isSelected(day, hour)
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-100 hover:bg-blue-100"
                }`}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
      {selectedTimes.length > 0 && (
        <div className="mt-4 flex justify-end">
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            선택 완료
          </button>
        </div>
      )}
    </div>
  );
};

export default ScheduleGrid;
