import { MetaFunction } from "@remix-run/node";
import {
  Link,
  Outlet,
  useLocation,
  useNavigate,
  useNavigation,
  useParams,
} from "@remix-run/react";
import {
  Calendar,
  ChartLine,
  Loader2,
  StickyNote,
  User,
  UserCircle,
} from "lucide-react";
import { useEffect } from "react";
import { sidebar } from "~/data/sidebar";

export const meta: MetaFunction = () => {
  return [{ title: "Bsky SleekDash | Dashboard" }];
};
export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const params = useParams();
  useEffect(() => {
    const dataOrg = localStorage.getItem("ALLDATA");
    const data = JSON.parse(dataOrg!);
    if (!data) {
      navigate("/");
    }
  });
  return (
    <>
      <div className="grid grid-cols-6 h-dvh mb-20">
        <aside className="border-r flex-col justify-between hidden md:flex">
          <ul className="mt-8">
            <Link to={"/"}>
              <h1 className="text-xl text-center mb-16">
                <span className="text-primary">Bsky</span> <br />
                <span className="text-2xl">SleekDash</span>
              </h1>
            </Link>
            {sidebar.map((option, index) => {
              const active = location.pathname.includes(option.activeLink);
              return (
                <li
                  key={index}
                  className={
                    "flex items-center py-4 ps-8 cursor-pointer " +
                    (active
                      ? "bg-primary hover:bg-primary text-white"
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
                ? "bg-primary hover:bg-primary text-white"
                : "hover:bg-neutral-100")
            }
            onClick={() => navigate("/account")}
          >
            <UserCircle size={16} className="me-2" /> Account
          </div>
        </aside>
        {navigation.state == "loading" ? (
          <div className="col-span-6 md:col-span-5 flex justify-center items-center">
            <Loader2 className="animate-spin text-primary" />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      <nav className="fixed w-full bottom-0 h-20 bg-white border-t flex md:hidden">
        {sidebar.map((option, index) => {
          const active = location.pathname.includes(option.activeLink);
          return (
            <li
              key={index}
              className={
                "flex justify-center items-center py-4 cursor-pointer grow " +
                (active
                  ? "bg-primary hover:bg-primary text-white"
                  : "hover:bg-neutral-100")
              }
              onClick={() => navigate(option.route)}
            >
              {index == 0 && (
                <div className="flex flex-col items-center text-sm">
                  <User size={32} />
                  Profile
                </div>
              )}
              {index == 1 && (
                <div className="flex flex-col items-center text-sm">
                  <ChartLine size={32} />
                  Statistics
                </div>
              )}
              {index == 2 && (
                <div className="flex flex-col items-center text-sm">
                  <StickyNote size={32} />
                  Posts
                </div>
              )}
              {index == 3 && (
                <div className="flex flex-col items-center text-sm">
                  <Calendar size={32} />
                  Schedule
                </div>
              )}
            </li>
          );
        })}
      </nav>
    </>
  );
}
