import { buildCalendar, days } from "~/data/time";

interface Props {
  dateArray: Array<Number>;
}

export default function ConsistencyTracker({ dateArray }: Props) {
  function getElementFrequency<T>(arr: T[]): Map<T, number> {
    const frequencyMap: Map<T, number> = new Map();
    if (arr) {
      for (const element of arr) {
        frequencyMap.set(element, (frequencyMap.get(element) || 0) + 1);
      }
    }

    return frequencyMap;
  }
  const dateFreq = getElementFrequency(dateArray);

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
      if (dateFreq.get(day) == 1) {
        classString = "border w-full h-8 border-2 border-primary bg-primary/10";
      } else if (dateFreq.get(day) == 1) {
        classString = "border w-full h-8 border-2 border-primary bg-primary/20";
      } else if (dateFreq.get(day) == 2) {
        classString = "border w-full h-8 border-2 border-primary bg-primary/30";
      } else if (dateFreq.get(day) == 3) {
        classString = "border w-full h-8 border-2 border-primary bg-primary/40";
      } else if (dateFreq.get(day)! >= 4) {
        classString = "border w-full h-8 border-2 border-primary bg-primary/50";
      }
    } else if (today == day) {
      classString = "border w-full h-8 border-2 border-primary";
    } else if (dateArray?.includes(day)) {
      if (dateFreq.get(day) == 1) {
        classString = "border w-full h-8 bg-primary/10";
      } else if (dateFreq.get(day) == 1) {
        classString = "border w-full h-8 bg-primary/20";
      } else if (dateFreq.get(day) == 2) {
        classString = "border w-full h-8 bg-primary/30";
      } else if (dateFreq.get(day) == 3) {
        classString = "border w-full h-8 bg-primary/40";
      } else if (dateFreq.get(day)! >= 4) {
        classString = "border w-full h-8 bg-primary/50";
      }
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
