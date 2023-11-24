import { DateRangePicker } from '@/components/DateRangePicker';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { BookingParams, bookingSchema } from '@/schemas/booking.schema';
import {
  Form,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';

import { PropertyCard } from '@/components/PropertyCard';

import { Property } from '@/types/models.types';
import { ConfirmationDialog } from './ConfirmationDialog';

export type BookingEditPanelProps = {
  property?: Property;
  onSubmit: (values: BookingParams) => void;
  onCancel?: () => void;
  onDelete?: () => void;

  to?: string | null;
  from?: string | null;
};

export const BookingEditPanel: React.FC<BookingEditPanelProps> = ({
  property,
  onCancel,
  onDelete,
  onSubmit,
  to,
  from,
}) => {
  const isCreating = !onDelete;

  const form = useForm<BookingParams>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { dateRange: {} },
  });

  useEffect(() => {
    if (to && from) {
      form.setValue('dateRange', {
        to: new Date(to),
        from: new Date(from),
      });
    }
  }, [to, from, form]);

  useEffect(() => {
    if (property?.id) {
      form.setValue('propertyId', property.id, {
        shouldValidate: true,
      });
    }
  }, [form, property]);

  return (
    <div className='flex flex-col justify-center items-center pb-8'>
      {property && <PropertyCard {...property} />}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
          <div className='flex flex-col items-center gap-y-6 pt-2'>
            <FormField
              control={form.control}
              name='dateRange'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Change period?</FormLabel>
                  <DateRangePicker
                    dateRange={field.value}
                    onSelect={field.onChange}
                  />
                  <FormDescription>
                    You can manage email addresses in your{' '}
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className='flex flex-row gap-x-6 justify-end'>
              <Button variant={'outline'} onClick={onCancel}>
                Cancel
              </Button>
              <Button
                className='bg-blue-700 hover:bg-blue-600'
                disabled={
                  !form.formState.isValid ||
                  (onDelete && !form.formState.isDirty)
                }
                type='submit'
              >
                {isCreating ? 'Create' : 'Update'}
              </Button>
            </div>
          </div>
          <div className='w-full flex justify-center'>
            {onDelete && (
              <ConfirmationDialog onConfirm={onDelete}>
                <Button
                  className='w-96 border-red-700 text-red-700 hover:bg-red-700 hover:text-white'
                  variant={'outline'}
                >
                  Delete
                </Button>
              </ConfirmationDialog>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
