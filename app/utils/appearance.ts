import { twMerge } from "tailwind-merge";

type ClassValue = string | false | null | undefined;

export function classNames(...classes: ClassValue[]) {
  return twMerge(classes.filter(Boolean).join(" ").trim());
}
