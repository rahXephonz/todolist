import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

type LocalizedFormat = "ll" | "l" | "LL" | "LLLL" | "LLL";

// Formatting date from db into @eg : Sept 27, 2002
export const convertDate = (date: string, format: LocalizedFormat) => {
  dayjs.extend(localizedFormat);

  return dayjs(date).format(format);
};
