import { BookingEditPanel } from '@/components/BookingEditPanel';
import { PageTitle } from '@/components/PageTitle';

import { useApiClient } from '@/hooks/useApiClient';
import { queryClient } from '@/lib/utils';
import { BookingParams } from '@/schemas/booking.schema';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';

export const BookingDetails = () => {
  const apiClient = useApiClient();

  const navigate = useNavigate();

  const { id: bookingId } = useParams();

  const { data: booking } = useQuery({
    queryKey: ['bookings', bookingId],
    queryFn: () => apiClient.getBooking(bookingId ?? ''),
  });

  const onSubmit = (values: BookingParams) => {
    apiClient.updateBooking(booking?.id ?? '', {
      endDate: values.dateRange.to,
      startDate: values.dateRange.from,
      propertyId: values.propertyId,
    });

    queryClient.invalidateQueries('bookings');

    navigate('/bookings');
  };

  const onCancel = () => {
    navigate('/bookings');
  };

  const onDelete = () => {
    apiClient.deleteBooking(booking?.id);
    queryClient.invalidateQueries('bookings');
    navigate('/bookings');
  };

  return (
    <div className='flex flex-col justify-center items-center pb-8'>
      <PageTitle title='Update Booking' />
      {booking && (
        <BookingEditPanel
          onSubmit={onSubmit}
          onCancel={onCancel}
          onDelete={onDelete}
          property={booking?.property}
          to={booking.endDate.toISOString()}
          from={booking.startDate.toISOString()}
        />
      )}
    </div>
  );
};
