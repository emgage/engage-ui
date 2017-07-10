const CALENDAR_MONTH_PADDING = 9;

export default function getCalendarMonthWidth(daySize: any) {
  return (7 * (daySize + 1)) + (2 * (CALENDAR_MONTH_PADDING + 1));
}
