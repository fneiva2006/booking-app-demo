import { PageTitle } from "@/components/PageTitle";
import { useApiClient } from "@/hooks/useApiClient";
import { useEffect } from "react";
import { useQuery } from "react-query";
import { BookingParams } from "@/schemas/booking.schema";

import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { BookingEditPanel } from "@/components/BookingEditPanel";

export const BookingCreation = () => {
  const apiClient = useApiClient();

  const navigate = useNavigate();

  const { id: propertyId } = useParams();

  const [params] = useSearchParams();

  const to = params.get("to");
  const from = params.get("from");

  const { data: property, isLoading } = useQuery({
    queryKey: [],
    queryFn: () => apiClient.getProperty(propertyId ?? ""),
  });

  useEffect(() => {
    if (!isLoading && !property?.id) {
      navigate("/properties");
    }
  }, [property, isLoading, navigate]);

  const onSubmit = (values: BookingParams) => {
    apiClient.createBooking({
      endDate: values.dateRange.to,
      startDate: values.dateRange.from,
      propertyId: values.propertyId,
    });

    navigate("/bookings");
  };

  const onCancel = () => {
    navigate("/properties");
  };

  return (
    <div className="flex flex-col justify-center items-center pb-8">
      <PageTitle title="Create Booking" />
      <BookingEditPanel
        onSubmit={onSubmit}
        onCancel={onCancel}
        property={property}
        to={to}
        from={from}
      />
    </div>
  );
};
