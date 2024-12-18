import React from "react";
import { calendar, days } from "~/data/time";

interface Props {
  dateArray: Array<Number>;
}

export default function ConsistencyTracker({ dateArray }: Props) {
  const date = new Date();
  const today = date.getDate();

  function gridStyler(day: number) {
    var classString = "";
    if (today == day + 1) {
      classString = "bg-neutral-200 w-full h-8 border-2 border-blue-500";
    } else if (dateArray?.includes(day + 1)) {
      classString = "w-full h-8 bg-green-300";
    } else if (today == day + 1 && dateArray?.includes(day + 1)) {
      classString = "w-full h-8 border-2 border-blue-500 bg-green-300";
    } else {
      classString = "bg-neutral-200 w-full h-8";
    }
    return classString;
  }
  return (
    <div>
      {/* <div className="grid grid-cols-12 gap-2">
        {months.map((month, index) => {
          return (
            <div className="grid grid-rows-7 grid-cols-4 gap-0">
              {calendar[0].map((day: number) => {
                return <div className="bg-neutral-200 h-3 w-3 border border-black" />;
              })}
            </div>
          );
        })}
      </div> */}
      <div className="grid grid-cols-7 gap-2 text-sm opacity-50">
        {days.map((day) => {
          return <p key={day}>{day}</p>;
        })}
      </div>
      <div className="grid grid-cols-7 grid-rows-4 gap-2 mt-2">
        {calendar[11].map((day, index) => {
          return <div key={index} className={gridStyler(day)} />;
        })}
      </div>
    </div>
  );
}
