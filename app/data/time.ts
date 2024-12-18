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
export const weeks = ["1", "2", "3", "4"];

const thirtyone = Array.apply(null, Array(31)).map(function (x, i) {
  return i;
});
const jan = thirtyone;
const mar = thirtyone;
const may = thirtyone;
const jul = thirtyone;
const aug = thirtyone;
const oct = thirtyone;
const dec = thirtyone;

const feb = Array.apply(null, Array(29)).map(function (x, i) {
  return i;
});

const thirty = Array.apply(null, Array(30)).map(function (x, i) {
  return i;
});
const apr = thirty;
const jun = thirty;
const sep = thirty;
const nov = thirty;

export const calendar = [jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec];
