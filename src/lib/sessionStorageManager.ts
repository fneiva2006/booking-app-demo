import { Booking } from '@/types/models.types';
import { getPropertyFixtures } from './fixtures';

export const initializeStorage = () => {
  const savedProperties = sessionStorage.getItem('properties');

  if (!savedProperties) {
    sessionStorage.setItem('properties', JSON.stringify(getPropertyFixtures()));
  }
};

function parseWithDate(jsonString: string) {
  const reDateDetect = /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})/; // startswith: 2015-04-29T22:06:55
  const resultObject = JSON.parse(jsonString, (_: string, value: unknown) => {
    if (typeof value == 'string' && reDateDetect.exec(value)) {
      return new Date(value);
    }
    return value;
  });
  return resultObject;
}

export const loadSavedBookings = () => {
  const savedBookings = sessionStorage.getItem('bookings');
  return parseWithDate(savedBookings ?? '[]');
};

export const loadSavedProperties = () => {
  const savedProperties = sessionStorage.getItem('properties');
  return parseWithDate(savedProperties ?? '[]');
};

export const storeBookings = (bookings: Booking[]) => {
  sessionStorage.setItem('bookings', JSON.stringify(bookings));
};
