import dayjs from "dayjs";

export const WEEK_DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function getMonthName(date) {
  return dayjs(date).format("MMMM YYYY");
}

export function nextMonth(date) {
  return dayjs(date).add(1, "month");
}

export function prevMonth(date) {
  return dayjs(date).subtract(1, "month");
}

export function isToday(date) {
  return dayjs(date).isSame(dayjs(), "day");
}

export function isPast(date) {
  return dayjs(date).isBefore(dayjs(), "day");
}

export function isSame(a, b) {
  if (!a || !b) return false;

  return dayjs(a).isSame(dayjs(b), "day");
}

export function getMonthMatrix(month) {
  const firstDay = month.startOf("month");
  const start = firstDay.subtract(firstDay.day(), "day");

  const matrix = [];

  for (let week = 0; week < 6; week++) {
    const row = [];

    for (let day = 0; day < 7; day++) {
      const date = start.add(week * 7 + day, "day");

      row.push({
        date,
        currentMonth: date.month() === month.month(),
      });
    }

    matrix.push(row);
  }

  return matrix;
}
