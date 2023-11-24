import { Booking } from "@/types/models.types";
import { format } from "date-fns";
import { Link } from "react-router-dom";

export type BookingCardProps = {
  booking: Booking;
};

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  return (
    <li className="h-32 rounded-lg border w-[90%] md:w-[60%] border-slate-100 bg-slate-50 hover:bg-slate-100 shadow-sm p-2">
      <Link className="h-full" to={`/bookings/${booking.id}`}>
        <div className="flex flex-row  h-full">
          <img
            className="w-32 object-fit rounded-lg"
            src={booking.property?.thumbnail?.url}
          />
          <div className="flex flex-col p-6 gap-y-2">
            {booking.property?.name}
            <p className="text-slate-500 text-xs">
              {format(booking.startDate, "dd/MM")} -{" "}
              {format(booking.endDate, "dd/MM")}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
};
