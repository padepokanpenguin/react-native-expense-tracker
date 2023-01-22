export default function getFormattedDate(date: Date) {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`;
}

export function getDateMinusDays(date: Date, days: number) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
}
