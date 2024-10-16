import avatar from "@/assets/user-avatar.png";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Image, Menu, MenuItem, Popup } from "semantic-ui-react";
import { useAuth } from "../../../context/app/useAuth";
import { useDisclosure } from "../../../hooks/pure/useDisclosure";
import { logout } from "../../../utils/auth/auth-methods";
import DeleteModal from "../DeleteModal";

const Header = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const { isOpen, onClose, setCustom } = useDisclosure();
  const handleDelete = (data) => {
    logout();
    setUser(null);
    onClose();
    navigate("/signin");
    console.log(data);
  };
  return (
    <>
      <DeleteModal
        confirmText="Logout"
        // isLoading={isDeleteCaseLoading}
        modalContent="Are you sure you want to logout?"
        modalHeader="Logout"
        onClose={onClose}
        open={isOpen}
        onConfirm={() => handleDelete(isOpen)}
      />
      <Menu className="headerWrap d-flex jce">
        <span className="headerBalance">Balance</span>
        <span className="headerBalanceCount">{user?.balance || 0}</span>
        <MenuItem>
          <Popup
            content={user?.name}
            position="bottom center"
            trigger={
              <Image
                className="b-radius-50 headerAvatar c-pointer"
                src={user?.src || avatar}
              />
            }
          />
        </MenuItem>
        <MenuItem>
          <Popup
            content="Logout"
            position="bottom center"
            trigger={
              // <Button onClick={() => setCustom(true)}>
              <FaSignInAlt
                className="c-pointer"
                onClick={() => setCustom(true)}
              />
              // </Button>
            }
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
