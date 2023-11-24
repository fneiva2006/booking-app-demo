import { useQuery } from "react-query";
import { useApiClient } from "../hooks/useApiClient";
import { PropertyCard } from "../components/PropertyCard";
import { DateRangePicker } from "../components/DateRangePicker";
import { DateRange } from "react-day-picker";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { PageTitle } from "@/components/PageTitle";

export const Properties: React.FC = () => {
  const apiClient = useApiClient();

  const { data, isLoading } = useQuery({
    queryKey: "properties",
    queryFn: () => apiClient.listProperties(),
  });

  const [dateRange, setDate] = useState<DateRange | undefined>();

  const locationItems = data?.map((property) => (
    <PropertyCard
      key={property.id}
      {...property}
      to={dateRange?.to}
      from={dateRange?.from}
    />
  ));

  return (
    <div className="flex flex-col justify-center items-center">
      <PageTitle title="Properties available" />
      <div className="grid w-full items-center gap-1.5 py-4 justify-center">
        <Label className="pl-1" htmlFor="date">
          Filter by period
        </Label>
        <DateRangePicker dateRange={dateRange} onSelect={setDate} />
      </div>

      <ul className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 sm:gap-x-6 gap-y-6 p-6 justify-center">
        {!isLoading && locationItems}
      </ul>
    </div>
  );
};