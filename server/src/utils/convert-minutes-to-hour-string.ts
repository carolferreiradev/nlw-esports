// 1080  ->  18:00
export function convertMinutesToHourString(minutesAmount: number) {
  if (minutesAmount < 0) throw new Error("Parameters must be positive");

  const hours = Math.floor(minutesAmount / 60);

  if (hours > 23) throw new Error(`Hour ${hours} is not a valid.`);

  const minutes = minutesAmount % 60;

  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
}
