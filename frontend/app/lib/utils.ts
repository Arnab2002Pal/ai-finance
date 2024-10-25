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

export const fetchInitials = (session: any) => {
  const name = session?.user.name?.split(" ") || [];
  const firstNameInitial = name.length > 0 ? name[0][0] : "";
  const lastNameInitial = name.length > 1 ? name[1][0] : "";
  const initials = `${firstNameInitial}${lastNameInitial}`;
  return initials;
};
