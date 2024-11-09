import avatar from "@/assets/user-avatar.png";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Image,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useGetQueryDataList } from "../../api/query.api";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import SearchBar from "../common/SearchBar";
import TableLoader from "../common/TableLoader";
import AddBalanceModal from "./AddBalanceModal";
import { useAuth } from "../../context/app/useAuth";

const UsersList = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    searchTerm: "",
  });
  const { data: usersList, isFetching } = useGetQueryDataList(
    "user/all",
    defaultQuery
  );
  const { isOpen, onClose, setCustom } = useDisclosure();

  return (
    <div className="previewLayout">
      <AddBalanceModal onClose={onClose} open={isOpen} />

      <div className="d-flex jcsb">
        <div>
          <h2>Users ({usersList?.meta?.total || 0})</h2>
          {user?.role === "admin" && (
            <h4 className="mt-0">Total Balance ({usersList?.totalBalance})</h4>
          )}
        </div>
        <div>
          <SearchBar
            placeholder="Search user"
            stillTime={500}
            onSuccess={(e) =>
              setDefaultQuery((prev) => ({ ...prev, searchTerm: e }))
            }
          />
          <Button onClick={() => navigate("add")} className="ml-3" primary>
            Add User
          </Button>
        </div>
      </div>
      <Table basic>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>User Id</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Mobile</TableHeaderCell>
            <TableHeaderCell>Hostel</TableHeaderCell>
            <TableHeaderCell>Room</TableHeaderCell>
            <TableHeaderCell>Balance</TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList?.result?.length > 0 && !isFetching ? (
            usersList?.result?.map((user, index) => (
              <TableRow key={user?._id}>
                <TableCell>
                  {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                </TableCell>
                <TableCell>
                  <div className="d-flex aic">
                    <Image
                      className="b-radius-50 headerAvatar"
                      src={user?.imageUrl || avatar}
                    />
                    <span className="t-capitalize ml-2">{user?.name}</span>
                  </div>
                </TableCell>
                <TableCell>{user?.userId}</TableCell>
                <TableCell>
                  <Button
                    fluid
                    className={`roleDesign ${user?.role}Role t-capitalize`}
                  >
                    {user?.role}
                  </Button>
                </TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.mobile}</TableCell>
                <TableCell>{user?.hostel}</TableCell>
                <TableCell>{user?.room}</TableCell>
                <TableCell>{user?.balance.toFixed(2)}</TableCell>
                <TableCell className="d-flex jcsb">
                  <Button>
                    <FaEdit />
                  </Button>
                  <Button onClick={() => setCustom(user?._id)}>
                    <FaBangladeshiTakaSign />
                    <MdAdd />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {isFetching && <TableLoader columns={10} />}
              {!isFetching && (
                <TableRow>
                  <TableCell colSpan="10">
                    <NoDataAvailable />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <CustomPagination
        totalPages={usersList?.meta?.totalPage || 0}
        activePage={defaultQuery?.page || 0}
        onPageChange={(value) =>
          setDefaultQuery((prev) => ({ ...prev, page: value }))
        }
      />
    </div>
  );
};

export default UsersList;
