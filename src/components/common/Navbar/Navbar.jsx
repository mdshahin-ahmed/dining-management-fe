import logo from "@/assets/logo.png";
import { FaUserAlt, FaUserEdit, FaUsers } from "react-icons/fa";
import { GiHotMeal } from "react-icons/gi";
import { IoHomeSharp } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import { Image, List, ListItem, Popup } from "semantic-ui-react";

const routeList = [
  { content: "Home", pathname: "home", src: IoHomeSharp },
  { content: "Manage Meal", pathname: "manage-meal", src: GiHotMeal },
  { content: "Meals", pathname: "meals", src: GiHotMeal },
  { content: "Users", pathname: "users", src: FaUsers },
  { content: "Manage User", pathname: "manage-user", src: FaUserEdit },
  { content: "Profile", pathname: "profile", src: FaUserAlt },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <div className="navBarWrap">
      <div className="navLogo">
        <Image className="mt-1" src={logo} />
      </div>
      <div>
        <List link className="navList">
          {routeList.map((route) => {
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
          })}
        </List>
      </div>
    </div>
  );
};

export default Navbar;
