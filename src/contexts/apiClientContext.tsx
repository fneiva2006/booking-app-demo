'use client';

import { createContext, useState } from 'react';
import { Booking, Property } from '../types/models.types';

import { faker } from '@faker-js/faker';
import { DateRange } from 'react-day-picker';
import { getPropertyOccupiedPeriods, rangeConflict } from '@/lib/utils';
import {
  initializeStorage,
  loadSavedBookings,
  loadSavedProperties,
  storeBookings,
} from '@/lib/sessionStorageManager';

initializeStorage();

export type BookingEditParams = Omit<Booking, 'id' | 'userId'>;

export type ApiClient = {
  listProperties: (period?: DateRange) => Promise<Property[]>;
  getProperty: (id: string) => Promise<Property | undefined>;

  listBookings: () => Promise<Booking[]>;
  getBooking: (id: string) => Promise<Booking | undefined>;
  createBooking: (booking: BookingEditParams) => Promise<Booking>;
  updateBooking: (
    id: string,
    booking: BookingEditParams
  ) => Promise<Booking | undefined>;
  deleteBooking: (id: string | undefined) => Promise<void>;
};

export const ApiClientContext = createContext<ApiClient | null>(null);

export type BrowserDataProviderProps = {
  children?: React.ReactNode;
};

export const ApiClientProvider: React.FC<BrowserDataProviderProps> = ({
  children,
}) => {
  const [userId] = useState(faker.string.uuid());

  const [bookings, setBookings] = useState<Booking[]>(loadSavedBookings());

  const [properties] = useState<Property[]>(loadSavedProperties());

  //#region Bookings

  const listBookings = () => {
    const bookingsWithProperties = bookings.map((b) => ({
      ...b,
      property: properties.find((p) => p.id === b.propertyId),
    }));

    return Promise.resolve(bookingsWithProperties);
  };

  const getBooking = (id: string) => {
    const foundBooking = bookings.find((b) => b.id === id);

    if (foundBooking) {
      foundBooking.property = properties.find(
        (p) => p.id === foundBooking.propertyId
      );
    }

    return Promise.resolve(foundBooking);
  };

  const createBooking = (booking: BookingEditParams) => {
    const bookingToCreate: Booking = {
      ...booking,
      id: faker.string.uuid(),
      userId,
    };

    setBookings((pv) => [...pv, bookingToCreate]);

    storeBookings([...bookings, bookingToCreate]);

    return Promise.resolve(bookingToCreate);
  };

  const updateBooking = (id: string, booking: BookingEditParams) => {
    const bookingToUpdate = bookings.find((b) => b.id === id);

    if (!bookingToUpdate) {
      throw new Error('Booking not found!');
    }

    bookingToUpdate.propertyId = booking.propertyId;
    bookingToUpdate.startDate = booking.startDate;
    bookingToUpdate.endDate = booking.endDate;

    storeBookings(bookings);

    return Promise.resolve(bookingToUpdate);
  };

  const deleteBooking = (id: string | undefined) => {
    if (!id) {
      return Promise.resolve();
    }

    const bookingsToSave = bookings.filter((b) => b.id !== id);

    setBookings(bookingsToSave);
    storeBookings(bookingsToSave);

    return Promise.resolve();
  };

  //#endregion

  //#region Properties

  const getProperty = (id: string) =>
    Promise.resolve(properties.find((p) => p.id === id));

  const listProperties = (range?: DateRange, excludedUsers: string[] = []) => {
    if (!range?.from && !range?.to) {
      return Promise.resolve(properties);
    }

    const filteredProperties = properties.filter((l) => {
      const occupiedPeriodsForProperty = getPropertyOccupiedPeriods(
        bookings,
        l.id,
        excludedUsers
      );

      return !rangeConflict(range, occupiedPeriodsForProperty);
    });

    return Promise.resolve(filteredProperties);
  };

  //#endregion

  return (
    <ApiClientContext.Provider
      value={{
        createBooking,
        deleteBooking,
        getBooking,
        getProperty,
        listBookings,
        listProperties,
        updateBooking,
      }}
    >
      {children}
    </ApiClientContext.Provider>
  );
};
