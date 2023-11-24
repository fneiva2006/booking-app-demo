"use client";

import { createContext, useState } from "react";
import { Booking, Property } from "../types/models.types";
import { locationFixtures as propertyFixtures } from "../lib/fixtures";
import { faker } from "@faker-js/faker";
import { DateRange } from "react-day-picker";
import { debug } from "console";

export type BookingEditParams = Omit<Booking, "id" | "userId">;

export type ApiClient = {
  listProperties: (period?: DateRange) => Promise<Property[]>;
  getProperty: (id: string) => Promise<Property | undefined>;

  listBookings: () => Promise<Booking[]>;
  getBooking: (id: string) => Promise<Booking | undefined>;
  createBooking: (booking: BookingEditParams) => Promise<Booking>;
  updateBooking: (id: string, booking: Booking) => Promise<Booking | undefined>;
  deleteBooking: (id: string | undefined) => Promise<void>;
};

export const ApiClientContext = createContext<ApiClient | null>(null);

export type BrowserDataProviderProps = {
  children?: React.ReactNode;
};

const savedProperties = sessionStorage.getItem("properties");

if (!savedProperties) {
  sessionStorage.setItem("properties", JSON.stringify(propertyFixtures));
}

const savedBookings = sessionStorage.getItem("bookings");

function parseWithDate(jsonString: string) {
  const reDateDetect = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/; // startswith: 2015-04-29T22:06:55
  const resultObject = JSON.parse(jsonString, (key: string, value: unknown) => {
    if (typeof value == "string" && reDateDetect.exec(value)) {
      return new Date(value);
    }
    return value;
  });
  return resultObject;
}

export const ApiClientProvider: React.FC<BrowserDataProviderProps> = ({
  children,
}) => {
  const [userId] = useState(faker.string.uuid());

  const [bookings, setBookings] = useState<Booking[]>(
    parseWithDate(savedBookings ?? "[]")
  );

  const [properties] = useState<Property[]>(
    parseWithDate(savedProperties ?? "")
  );

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

    sessionStorage.setItem(
      "bookings",
      JSON.stringify([...bookings, bookingToCreate])
    );

    return Promise.resolve(bookingToCreate);
  };

  const updateBooking = (id: string, booking: BookingEditParams) => {
    const bookingToUpdate = bookings.find((b) => b.id === id);

    if (!bookingToUpdate) {
      throw new Error("Booking not found!");
    }

    bookingToUpdate.propertyId = booking.propertyId;
    bookingToUpdate.startDate = booking.startDate;
    bookingToUpdate.endDate = booking.endDate;

    sessionStorage.setItem("bookings", JSON.stringify(bookings));

    return Promise.resolve(bookingToUpdate);
  };

  const deleteBooking = (id: string | undefined) => {
    if (!id) {
      return Promise.resolve();
    }

    const bookingsToSave = bookings.filter((b) => b.id !== id);

    setBookings(bookingsToSave);

    debugger;

    sessionStorage.removeItem("bookings");
    sessionStorage.setItem("bookings", JSON.stringify(bookingsToSave));

    return Promise.resolve();
  };

  //#endregion

  //#region Properties

  const getProperty = (id: string) =>
    Promise.resolve(properties.find((p) => p.id === id));

  const getPropertyOccupiedPeriods = (
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

  const listProperties = (range?: DateRange, excludedUsers: string[] = []) => {
    let filteredProperties = properties.filter((l) => {
      if (!range?.from && !range?.to) {
        return true;
      }

      const occupiedPeriodsForProperty = getPropertyOccupiedPeriods(
        l.id,
        excludedUsers
      );

      console.log(occupiedPeriodsForProperty);

      return true;
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
