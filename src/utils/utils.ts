export function getInputDateString(date: Date) {
  return date.toISOString().slice(0, 10);
}
