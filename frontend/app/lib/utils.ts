import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


export const parsedPercentage = (percentage: string) => {
  const parsedPercentage = parseFloat(percentage?.replace('%', ''))
  if(parsedPercentage > 1){
    return parsedPercentage
  }else {
    return parsedPercentage + 1
  }
};
