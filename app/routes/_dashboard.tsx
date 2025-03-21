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
  Check,
  Loader2,
  StickyNote,
  User,
  UserCircle,
} from "lucide-react";
import { useEffect } from "react";
import { Button } from "~/components/ui/button";
import { sidebar } from "~/data/sidebar";

export const meta: MetaFunction = () => {
  return [{ title: "Bluestride | Dashboard" }];
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
      <div className="grid grid-cols-6 h-dvh mb-20 md:mb-0">
        <aside className="border-r flex-col justify-between hidden md:flex">
          <ul className="mt-8">
            <Link to={"/"}>
              <h1 className="text-xl text-center mb-16">
                <span className="text-primary">Bsky</span> <br />
                <span className="text-2xl">Bluestride</span>
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
                  {index == 1 && <Calendar size={16} className="me-2" />}
                  {index == 2 && <ChartLine size={16} className="me-2" />}
                  {index == 3 && <StickyNote size={16} className="me-2" />}
                  {option.name}
                </li>
              );
            })}
          </ul>
          <div className="bg-primary/10 px-6 py-4 space-y-2">
            <h3>
              <b>Free Account</b>
            </h3>
            <ul>
              <li className="flex items-center">
                <Check className="text-primary" size={16} />
                &nbsp;1 profile
              </li>
              <li className="flex items-center">
                <Check className="text-primary" size={16} />
                &nbsp;3 scheduled posts
              </li>
            </ul>
            <Button asChild>
              <Link to={"/pricing"}>Upgrade for $9</Link>
            </Button>
          </div>
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
                  {option.name}
                </div>
              )}
              {index == 1 && (
                <div className="flex flex-col items-center text-sm">
                  <Calendar size={32} />
                  {option.name}
                </div>
              )}
              {index == 2 && (
                <div className="flex flex-col items-center text-sm">
                  <ChartLine size={32} />
                  {option.name}
                </div>
              )}
              {index == 3 && (
                <div className="flex flex-col items-center text-sm">
                  <StickyNote size={32} />
                  {option.name}
                </div>
              )}
            </li>
          );
        })}
      </nav>
    </>
  );
}
