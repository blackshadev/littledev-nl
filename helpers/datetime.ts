import dayjs from "dayjs";

const DISPLAY_FORMAT = "DD/MM/YYYY";

export function formatAsDate(date: string|Date): string {
    return dayjs(date).format(DISPLAY_FORMAT);
}