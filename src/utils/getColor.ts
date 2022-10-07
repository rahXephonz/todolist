import { Priority } from "types/data";

export default function getColor(itemPriority: Priority): Record<string, any> {
  return {
    "before:bg-[#f8a541]": itemPriority === "high",
    "before:bg-[#ed4c5c]": itemPriority === "very-high",
    "before:bg-[#00a790]": itemPriority === "normal",
    "before:bg-[#428bc1]": itemPriority === "low",
    "before:bg-[#8942c1]": itemPriority === "very-low",
  };
}
