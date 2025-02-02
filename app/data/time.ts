export const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
export const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function buildCalendar(mm: number) {
  let date = new Date();
  let year = date.getFullYear();
  let month = mm;
  // let month = date.getMonth();
  // Variable to store the generated calendar List
  let dateList: Array<number> = [];
  let thismonthList: Array<boolean> = [];
  // Get the first day of the month
  let dayone = new Date(year, month, 1).getDay();
  // Get the last date of the month
  let lastdate = new Date(year, month + 1, 0).getDate();
  // Get the day of the last date of the month
  let dayend = new Date(year, month, lastdate).getDay();
  // Get the last date of the previous month
  let monthlastdate = new Date(year, month, 0).getDate();

  for (let i = dayone; i > 0; i--) {
    dateList.push(monthlastdate - i + 1);
    thismonthList.push(false);
  }
  // Loop to add the dates of the current month
  for (let i = 1; i <= lastdate; i++) {
    dateList.push(i);
    thismonthList.push(true);
  }
  // Loop to add the first dates of the next month
  for (let i = dayend; i < 6; i++) {
    dateList.push(i - dayend + 1);
    thismonthList.push(false);
  }
  return { dateList, thismonthList };
}
export { buildCalendar };
