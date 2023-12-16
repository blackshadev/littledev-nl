import dayjs from 'dayjs';
import dayjsUTC from 'dayjs/plugin/utc';

const DISPLAY_FORMAT = 'DD/MM/YYYY';

dayjs.extend(dayjsUTC);
dayjs.locale('en');

export function formatAsDate(date: string | Date): string {
    return dayjs.utc(date).format(DISPLAY_FORMAT);
}
