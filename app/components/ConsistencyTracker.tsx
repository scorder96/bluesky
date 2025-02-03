import { buildCalendar, days } from "~/data/time";

interface Props {
  dateArray: Array<Number>;
}

export default function ConsistencyTracker({ dateArray }: Props) {
  let date = new Date();
  const today = date.getDate();

  const dateList = buildCalendar(date.getMonth()).dateList;
  const thismonthList = buildCalendar(date.getMonth()).thismonthList;

  function gridStyler(day: number, index: number) {
    var classString = "";
    if (!thismonthList[index]) {
      classString = "bg-white w-full h-8";
      return classString;
    }
    if (today == day && dateArray?.includes(day)) {
      classString = "w-full h-8 border-2 border-primary bg-blue-200";
    } else if (today == day) {
      classString = "border w-full h-8 border-2 border-primary";
    } else if (dateArray?.includes(day)) {
      classString = "border w-full h-8 bg-blue-200";
    } else {
      classString = "border w-full h-8";
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
        {dateList.map((day, index) => {
          return <div key={index} className={gridStyler(day, index)} />;
        })}
      </div>
    </div>
  );
}
