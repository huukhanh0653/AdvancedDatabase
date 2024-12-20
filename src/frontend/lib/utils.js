import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const formatter = new Intl.DateTimeFormat('en-GB'); 
function formattedDate(date) {
  const format_date = new Date(date);
  return formatter.format(format_date);
}

export { formattedDate };