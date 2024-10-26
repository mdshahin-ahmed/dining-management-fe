import logo from "@/assets/logo.png";
import {
  FaCartArrowDown,
  FaUserAlt,
  FaUserEdit,
  FaUsers,
} from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { IoHomeSharp } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { Image, List, ListItem, Popup } from "semantic-ui-react";
import { useAuth } from "../../../context/app/useAuth";

const routeList = [
  {
    content: "Home",
    pathname: "home",
    src: IoHomeSharp,
    permissions: ["user", "admin"],
  },
  {
    content: "Manage Meal",
    pathname: "manage-meal",
    src: GiHotMeal,
    permissions: ["admin"],
  },
  {
    content: "Meals",
    pathname: "meals",
    src: GiHotMeal,
    permissions: ["user", "admin"],
  },
  {
    content: "Users",
    pathname: "users",
    src: FaUsers,
    permissions: ["admin"],
  },
  {
    content: "Order",
    pathname: "orders",
    src: FaCartArrowDown,
    permissions: ["user", "admin"],
  },
  {
    content: "Manage User",
    pathname: "manage-user",
    src: FaUserEdit,
    permissions: ["admin"],
  },
  {
    content: "Profile",
    pathname: "profile",
    src: FaUserAlt,
    permissions: ["user", "admin"],
  },
];

const Navbar = () => {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="navBarWrap">
      <div className="navLogo">
        <Image className="mt-1" src={logo} />
      </div>
      <div>
        <List link className="navList">
          {routeList.map((route) => {
            if (route?.permissions.includes(user?.role)) {
              return (
                <Popup
                  key={route?.pathname}
                  size="small"
                  position="right center"
                  content={route.content}
                  trigger={
                    <ListItem
                      className={
                        location?.pathname?.includes(route.pathname)
                          ? "navListItem active "
                          : "navListItem"
                      }
                      // className={"navListItem"}
                      as={NavLink}
                      to={`/${route.pathname}`}
                      id={route.pathname}
                    >
                      {route.src}
                    </ListItem>
                  }
                />
              );
            }
          })}
        </List>
      </div>
    </div>
  );
};

export default Navbar;
