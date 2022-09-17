// 18:00 -> 1080
export function convertHourStringToMinutes(hourString: string) {
  // 18:00 -> ["18", "00"] -> [18, 00]
  if (!hourString) throw new Error("Params cannot be empty");

  const [hours, minutes] = hourString.split(":").map(Number);

  if (typeof hours !== "number" || typeof minutes !== "number")
    throw new Error(
      "Invalid params for function, your deserver send in format 00:00"
    );
  const minutesAmount = hours * 60 + minutes;

  return minutesAmount;
}
