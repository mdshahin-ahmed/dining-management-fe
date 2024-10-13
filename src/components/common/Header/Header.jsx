import { FaSignInAlt } from "react-icons/fa";
import { Button, Menu, MenuItem, Popup } from "semantic-ui-react";
import { useAuth } from "../../../context/app/useAuth";
import { logout } from "../../../utils/auth/auth-methods";
import { capitalize } from "../../../utils/helper";
import DeleteModal from "../DeleteModal";
import { useDisclosure } from "../../../hooks/pure/useDisclosure";
import { useNavigate } from "react-router-dom";

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
        <span>Welcome! {capitalize(user?.name)}</span>

        <MenuItem>
          <Popup
            content="Logout"
            position="bottom center"
            trigger={
              <Button onClick={() => setCustom(true)}>
                <FaSignInAlt />
              </Button>
            }
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default Header;
