import { Button, Grid, GridColumn, Image } from "semantic-ui-react";
import { useAuth } from "../../context/app/useAuth";
import avatar from "@/assets/user-avatar.png";
import { capitalize } from "../../utils/helper";
import { FaRegEnvelope } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { LuHotel } from "react-icons/lu";
import { MdOutlineMeetingRoom } from "react-icons/md";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import RechargeModal from "../common/RechargeModal";
import { useDisclosure } from "../../hooks/pure/useDisclosure";

const Profile = () => {
  const { user } = useAuth();
  const { isOpen, onClose, setCustom: setRechargeCustom } = useDisclosure();
  return (
    <>
      <RechargeModal onClose={onClose} open={isOpen} />

      <div className="profileWrap p-2">
        <div className="profileHeader">
          <Grid>
            <GridColumn mobile={16} computer={4}>
              <Image
                className="b-radius-50 mx-auto"
                src={user?.src || avatar}
              />
            </GridColumn>
            <GridColumn className="asc" mobile={16} computer={12}>
              <h2 className="mb-1 t-capitalize">
                {user?.name} ({user?.userId})
              </h2>
              <h4 className="mt-0 profileDetails">
                <FaRegEnvelope />
                <span>{user?.email}</span>
              </h4>
              <h4 className="mt-0 profileDetails">
                <BsTelephone />
                <span className="t-capitalize">{user?.mobile}</span>
              </h4>
              <h4 className="mt-0 profileDetails">
                <LuHotel />
                <span className="t-capitalize">{user?.hostel}</span>
              </h4>
              <h4 className="mt-0 profileDetails">
                <MdOutlineMeetingRoom />
                <span className="t-capitalize">{user?.room}</span>
              </h4>
              <h4 className="mt-0 profileDetails">
                <FaBangladeshiTakaSign />
                <span>{user?.balance.toFixed(2) || 0}</span>
              </h4>
              <Button
                // className="ml-2"
                primary
                onClick={() => setRechargeCustom(true)}
              >
                Add Balance
              </Button>
            </GridColumn>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default Profile;
