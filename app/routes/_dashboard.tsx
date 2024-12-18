import { Link, Outlet, useLocation, useNavigate, useParams } from "@remix-run/react";
import { Calendar, ChartLine, StickyNote, User, UserCircle } from "lucide-react";
import { sidebar } from "~/data/sidebar";

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  return (
    <div className="h-screen grid grid-cols-6">
      <aside className="border-r flex flex-col justify-between hidden md:block">
        <ul className="mt-8">
          <Link to={"/"}>
            <h1 className="text-xl text-center mb-16">
              Bluesky <br /> Sleekdash
            </h1>
          </Link>
          {sidebar.map((option, index) => {
            const active = location.pathname.includes(option.route);
            return (
              <li
                key={index}
                className={
                  "flex items-center py-4 ps-8 cursor-pointer " +
                  (active
                    ? "bg-blue-500 hover:bg-blue-500 text-white"
                    : "hover:bg-neutral-100")
                }
                onClick={() => navigate(option.route)}
              >
                {index == 0 && <User size={16} className="me-2" />}
                {index == 1 && <ChartLine size={16} className="me-2" />}
                {index == 2 && <StickyNote size={16} className="me-2" />}
                {index == 3 && <Calendar size={16} className="me-2" />}
                {option.name}
              </li>
            );
          })}
        </ul>
        <div
          className={
            "flex items-center py-4 ps-8 cursor-pointer " +
            (location.pathname.includes("/account")
              ? "bg-blue-500 hover:bg-blue-500 text-white"
              : "hover:bg-neutral-100")
          }
          onClick={() => navigate("/account")}
        >
          <UserCircle size={16} className="me-2" /> Account
        </div>
      </aside>
      <Outlet />
      <nav className="absolute bottom-0 border-t w-full flex md:hidden">
        {sidebar.map((option, index) => {
          const active = location.pathname.includes(option.route);
          return (
            <li
              key={index}
              className={
                "flex justify-center items-center py-4 cursor-pointer grow " +
                (active
                  ? "bg-blue-500 hover:bg-blue-500 text-white"
                  : "hover:bg-neutral-100")
              }
              onClick={() => navigate(option.route)}
            >
              {index == 0 && <User size={32} className="me-2" />}
              {index == 1 && <ChartLine size={32} className="me-2" />}
              {index == 2 && <StickyNote size={32} className="me-2" />}
              {index == 3 && <Calendar size={32} className="me-2" />}
            </li>
          );
        })}
      </nav>
    </div>
  );
}
