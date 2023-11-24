import { cn } from "@/lib/utils";
import { Link, Outlet, useLocation } from "react-router-dom";
import { Location } from "react-router-dom";

export const MainLayout: React.FC = () => {
  const location = useLocation();

  const getHighlightStyle = (location: Location, path: string) => {
    return cn({
      "font-bold": location.pathname.startsWith(path),
    });
  };

  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-col bg-slate-50 w-screen">
        <ul className="flex flex-row h-12 bg-orange-500 justify-between sm:justify-center items-center px-6 text-white font-normal gap-8">
          <Link
            className={getHighlightStyle(location, "/properties")}
            to={"/properties"}
          >
            Properties
          </Link>
          <Link
            className={getHighlightStyle(location, "/bookings")}
            to={"/bookings"}
          >
            Bookings
          </Link>
        </ul>
      </div>
      <div className="overflow-scroll w-screen">
        <Outlet />
      </div>
    </div>
  );
};
