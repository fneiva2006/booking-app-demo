import { Booking } from '@/types/models.types';
import { type ClassValue, clsx } from 'clsx';
import { addDays, isWithinInterval } from 'date-fns';
import { DateRange } from 'react-day-picker';
import { QueryClient } from 'react-query';
import { twMerge } from 'tailwind-merge';

export const queryClient = new QueryClient();

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPropertyOccupiedPeriods = (
  bookings: Booking[],
  propertyId: string,
  excludedUsers: string[]
): DateRange[] => {
  return bookings
    .filter(
      (b) => b.propertyId === propertyId && !excludedUsers.includes(b.userId)
    )
    .map((b) => ({
      from: new Date(b.startDate),
      to: new Date(b.endDate),
    }));
};

export const rangeConflict = (range: DateRange, periods: DateRange[]) => {
  for (const period of periods) {
    if (!period.from || !period.to || !range.from || !range.to) {
      continue;
    }

    period.from.setHours(0, 0, 0, 0);
    period.to.setHours(0, 0, 0, 0);

    const fromWithinInterval =
      range.from &&
      isWithinInterval(range.from, {
        start: period.from,
        end: addDays(period.to, -1),
      });

    const toWithinInterval =
      range.to &&
      isWithinInterval(range.to, {
        start: addDays(period.from, 1),
        end: period.to,
      });

    return fromWithinInterval || toWithinInterval;
  }
};
