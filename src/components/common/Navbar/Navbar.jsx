import { Image } from "semantic-ui-react";
import logo from "@/assets/logo.png";

const Navbar = () => {
  return (
    <div className="navBarWrap">
      <div className="navLogo">
        <Image className="mt-1" src={logo} />
      </div>
    </div>
  );
};

export default Navbar;
