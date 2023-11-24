import { BookingCard } from "@/components/BookingCard";
import { PageTitle } from "@/components/PageTitle";
import { useApiClient } from "@/hooks/useApiClient";
import { useQuery } from "react-query";

export const Bookings = () => {
  const apiClient = useApiClient();

  const { data, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => apiClient.listBookings(),
  });

  const bookingItems = data?.map((b) => <BookingCard key={b.id} booking={b} />);

  return (
    <div className="flex flex-col justify-center items-center">
      <PageTitle title="Bookings" />

      <ul className="flex flex-col sm:gap-x-6 gap-y-6 p-6 justify-center w-full items-center">
        {!isLoading && bookingItems}
      </ul>
    </div>
  );
};
