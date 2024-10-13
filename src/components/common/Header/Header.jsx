import { Menu } from "semantic-ui-react";
import { useAuth } from "../../../context/app/useAuth";

const Header = () => {
  const { user } = useAuth();
  console.log(user);

  return <Menu className="headerWrap">Welcome! {user?.name}</Menu>;
};

export default Header;
