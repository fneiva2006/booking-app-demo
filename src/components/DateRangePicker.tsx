'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';

export type DateRangePickerProps = {
  className?: string;
  onSelect?: (range: DateRange | undefined) => void;
  dateRange: DateRange | undefined;
  disabledDates?: Date[];
};

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  className,
  dateRange,
  onSelect,
}) => {
  const [range, setRange] = useState<DateRange | undefined>(dateRange);

  useEffect(() => {
    if (
      (range?.from === undefined && range?.to === undefined) ||
      (range?.from !== undefined && range?.from !== undefined)
    ) {
      onSelect?.(range);
    }
  }, [onSelect, range]);

  return (
    <div className={cn('grid gap-2 w-96', className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'justify-start text-left font-normal',
              !range && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {range?.from ? (
              range.to ? (
                <>
                  {format(range.from, 'LLL dd, y')} -{' '}
                  {format(range.to, 'LLL dd, y')}
                </>
              ) : (
                format(range.from, 'LLL dd, y')
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={range?.from}
            selected={range}
            onSelect={setRange}
            numberOfMonths={1}
            disabled={(day) => day < new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
