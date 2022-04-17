import React from "react";
import { useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { ReactComponent as LogoTextWhite } from "../assets/images/logo-text-white.svg";
import { ReactComponent as LogoText } from "../assets/images/logo-text.svg";
import { RootState } from "../redux/store";

const routes: {
  path?: string;
  icon?: string;
  name: string;
  adminPage?: boolean;
  routes?: { path: string; icon?: string; name: string; adminPage?: boolean }[];
}[] = [
  {
    path: "/admin/home", // the url
    adminPage: true,
    icon: "home", // the component being exported from icons/index.js
    name: "Beranda", // name that appear in Sidebar
  },
  {
    path: "/lecturer/home", // the url
    adminPage: false,
    icon: "home", // the component being exported from icons/index.js
    name: "Beranda", // name that appear in Sidebar
  },

  {
    name: "Data Course",
    adminPage: false,
    routes: [
      // submenu
      {
        path: "/lecturer/data/courses",
        name: "Course",
        icon: "house-user",
      },
      {
        path: "/lecturer/data/modules",
        name: "Modul",
        icon: "book",
      },
      {
        path: "/lecturer/data/lessons",
        name: "Lesson",
        icon: "keyboard",
      },
    ],
  },
  {
    name: "Data Kuis",
    adminPage: false,
    routes: [
      // submenu
      {
        path: "/lecturer/quizzes",
        name: "Kuis",
        icon: "comments",
      },
    ],
  },
  {
    name: "Data Progress Student",
    adminPage: false,
    routes: [
      // submenu
      {
        path: "/lecturer/data/students",
        name: "Student Progress",
        icon: "spinner",
      },
    ],
  },
  // {
  //   path: "/lecturer/quizzes",
  //   icon: "chalkboard-teacher",
  //   name: "Kuis",
  //   adminPage: false,
  // },

  {
    name: "Data Course",
    adminPage: true,
    routes: [
      // submenu
      {
        path: "/admin/data/courses",
        name: "Course",
        icon: "folder-open",
      },
      {
        path: "/admin/data/modules",
        name: "Modul",
        icon: "book",
      },
      {
        path: "/admin/data/lessons",
        name: "Lesson",
        icon: "keyboard",
      },
    ],
  },
  {
    name: "Data User",
    adminPage: true,
    routes: [
      {
        path: "/admin/data/classes",
        name: "Kelas",
        icon: "house-user",
      },
      {
        path: "/admin/data/students",
        name: "Mahasiswa",
        icon: "users",
      },
      {
        path: "/admin/data/lecturers",
        name: "Dosen",
        icon: "chalkboard-teacher",
      },
    ],
  },
];

export const SidebarButton = ({
  isActive,
  name,
  path,
  icon,
}: {
  path?: string;
  name: string;
  icon?: string;
  isActive: boolean;
}) => {
  const history = useHistory();
  return (
    <div
      onClick={() => {
        if (path) {
          history.push(path);
        }
      }}
      key={name}
      className={`relative py-3 px-6 flex items-center hover:bg-blueGray-100 dark:hover:bg-blueGray-700 hover:text-blue-600 dark:hover:text-blue-100  font-medium transition ${
        path && "cursor-pointer"
      } ${
        isActive &&
        "bg-blueGray-100 dark:bg-blueGray-700 text-blue-900 dark:text-blue-100"
      }`}
    >
      {icon && (
        <div className="w-4 mr-4 flex items-center justify-center ">
          <i className={`fas fa-${icon} text-md `} />
        </div>
      )}
      {name}
      <div className="flex-1" />
      {isActive && (
        <div className="absolute inset-y-0 right-0 flex items-center">
          <div className="rounded-tl-md rounded-bl-md bg-blue-600 dark:bg-blue-400 w-1 h-4/5" />
        </div>
      )}
      {/* <i className="fas fa-chevron-down text-xs" /> */}
    </div>
  );
};

export const Sidebar = () => {
  const dark = useSelector((state: RootState) => state.app.dark);
  const { user } = useSelector((state: RootState) => state.auth);
  const { pathname } = useLocation();
  return (
    <aside className="z-30 flex-shrink-0  w-64  bg-white dark:bg-blueGray-800 relative h-screen flex flex-col">
      <div className="flex px-6 items-center h-16">
        <Link to="/">
          {dark ? (
            <LogoTextWhite className="w-36 h-12" />
          ) : (
            <LogoText className="w-36 h-12" />
          )}
        </Link>
      </div>
      <ul className="text-blueGray-800 dark:text-gray-400 flex-1 overflow-y-auto scrollbar-thin">
        {routes.map((v) => {
          const isActive = v.path ? pathname.includes(v.path) : false;

          if (v.adminPage && !user?.isAdmin) {
            return null;
          }

          if (v.adminPage === false && user?.isAdmin) {
            return null;
          }

          if (v.routes) {
            return (
              <li className="my-6" key={v.name}>
                <div className="py-2 px-6 mt-2 text-xs uppercase tracking-widest font-bold text-blue-600 dark:text-blue-400">
                  {v.name}
                </div>
                {v.routes.map((_v) => {
                  const _isActive = _v.path
                    ? pathname.includes(_v.path)
                    : false;

                  return (
                    <SidebarButton
                      isActive={_isActive}
                      name={_v.name}
                      path={_v.path}
                      icon={_v.icon}
                      key={_v.name}
                    />
                  );
                })}
                {/* <i className="fas fa-chevron-down text-xs" /> */}
              </li>
            );
          } else {
            return (
              <SidebarButton
                isActive={isActive}
                name={v.name}
                path={v.path}
                icon={v.icon}
                key={v.name}
              />
            );
          }
        })}
      </ul>
    </aside>
  );
};

export default Sidebar;
