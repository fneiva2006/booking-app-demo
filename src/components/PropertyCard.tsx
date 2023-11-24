import { format } from 'date-fns';
import { Property } from '../types/models.types';
import { Link } from 'react-router-dom';

export type PropertyCardProps = Property & {
  to?: Date;
  from?: Date;
};

export const PropertyCard: React.FC<PropertyCardProps> = ({
  id,
  name,
  checkinTime,
  checkoutTime,
  thumbnail,
  dailyRate,
  to,
  from,
}) => {
  const params = new URLSearchParams();

  if (to && from) {
    params.set('to', to.toISOString());
    params.set('from', from.toISOString());
  }

  return (
    <Link
      className='w-full px-6 sm:px-0'
      to={`/properties/${id}/booking?${params}`}
    >
      <div className='flex flex-col bottom-1 border rounded-lg shadow-sm'>
        <div className='flex rounded-md mb-4 overflow-hidden h-96 xs:h-64'>
          <img
            className='object-cover'
            src={thumbnail?.url}
            alt={name}
            width={'100%'}
            height={'80px'}
          />
        </div>
        <div className='px-4 pb-4'>
          <p className='mb-1'>{name}</p>
          <p className='mb-2 text-sm'>
            <span className='font-semibold'>${dailyRate}</span> night
          </p>
          <p className='text-slate-500 text-xs'>
            Check-in: {format(checkinTime, 'HH:mm')}
          </p>
          <p className='text-slate-500 text-xs'>
            Check-out: {format(checkoutTime, 'HH:mm')}
          </p>
        </div>
      </div>
    </Link>
  );
};
