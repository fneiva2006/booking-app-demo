import { createBrowserRouter } from 'react-router-dom';
import { Properties } from '../pages/Properties';
import { BookingDetails } from '../pages/BookingDetails';
import { BookingCreation } from '../pages/BookingCreation';
import { Bookings } from '../pages/Bookings';
import { MainLayout } from '../components/MainLayout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '/properties',
        element: <Properties />,
      },
      {
        path: '/properties/:id/booking',
        element: <BookingCreation />,
      },
      {
        path: '/bookings',
        element: <Bookings />,
      },
      {
        path: '/bookings/:id',
        element: <BookingDetails />,
      },
    ],
  },
]);
