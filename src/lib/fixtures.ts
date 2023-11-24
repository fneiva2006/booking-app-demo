import { Property, Picture } from "../types/models.types";
import { faker } from "@faker-js/faker";

const NUM_OF_LOCATIONS = 3;

export const locationFixtures: Property[] = Array.from({
  length: NUM_OF_LOCATIONS,
}).map((_, idx) => {
  const pictures: Picture[] = [];

  return {
    active: true,
    address: faker.location.streetAddress(true),
    checkinTime: faker.date.between({
      from: "2020-01-01T10:00:00.000",
      to: "2020-01-01T13:00:00.000Z",
    }),
    checkoutTime: faker.date.between({
      from: "2020-01-01T14:00:00.000",
      to: "2020-01-01T17:00:00.000Z",
    }),
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    dailyRate: parseFloat(
      faker.commerce.price({
        min: 20,
        max: 3000,
      })
    ),
    description: faker.lorem.lines(),
    pictures,
    thumbnail: {
      id: faker.string.uuid(),
      url: `https://picsum.photos/id/${idx + 10}/400`,
    },
  };
});
