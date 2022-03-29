import { HomeIcon, InformationCircleIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { NavLink } from "remix";

const navigation = [
  { name: "Home", href: ".", icon: HomeIcon },
  { name: "About", href: "about", icon: InformationCircleIcon },
];

export default function Navigation() {
  return (
    <>
      {navigation.map((item) => (
        <NavLink
          key={item.name}
          to={item.href}
          className={({ isActive }) =>
            clsx(
              isActive
                ? "bg-slate-100 text-slate-900"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
              "group flex items-center rounded-md px-2 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2"
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon
                className={clsx(
                  isActive
                    ? "text-slate-500"
                    : "text-slate-400 group-hover:text-slate-500",
                  "mr-3 h-6 w-6 flex-shrink-0"
                )}
                aria-hidden="true"
              />
              {item.name}
            </>
          )}
        </NavLink>
      ))}
    </>
  );
}
