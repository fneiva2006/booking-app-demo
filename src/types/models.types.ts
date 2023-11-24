export type Property = {
  id: string;
  name: string;
  dailyRate: number;
  address: string;
  description?: string;

  thumbnail?: Picture;
  pictures: Picture[];

  active: boolean;
  checkinTime: Date;
  checkoutTime: Date;
};

export type Booking = {
  id: string;
  propertyId: string;
  userId: string;

  startDate: Date;
  endDate: Date;

  property?: Property;
};

export type Picture = {
  id: string;
  name?: string;
  url: string;
};

export type User = {
  id: string;
  name: string;
};
