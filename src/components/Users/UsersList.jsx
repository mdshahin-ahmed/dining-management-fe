import { useState } from "react";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { MdAdd } from "react-icons/md";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useGetQueryDataList } from "../../api/query.api";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import { capitalize } from "../../utils/helper";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import SearchBar from "../common/SearchBar";
import TableLoader from "../common/TableLoader";
import AddBalanceModal from "../Meal/User/AddBalanceModal";

const UsersList = () => {
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
        <h2>Users ({usersList?.meta?.total || 0})</h2>
        <SearchBar
          placeholder="Search meal"
          stillTime={500}
          onSuccess={(e) =>
            setDefaultQuery((prev) => ({ ...prev, searchTerm: e }))
          }
        />
      </div>
      <Table basic>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Mobile</TableHeaderCell>
            <TableHeaderCell>Hostel</TableHeaderCell>
            <TableHeaderCell>Room</TableHeaderCell>
            <TableHeaderCell>Balance</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList?.result?.length > 0 && !isFetching ? (
            usersList?.result?.map((user, index) => (
              <TableRow key={user?._id}>
                <TableCell>
                  {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                </TableCell>
                <TableCell>{capitalize(user?.name)}</TableCell>
                <TableCell>
                  <span className={`roleDesign ${user?.role}Role`}>
                    {capitalize(user?.role)}
                  </span>
                </TableCell>
                <TableCell>{user?.email}</TableCell>
                <TableCell>{user?.mobile}</TableCell>
                <TableCell>{user?.hostel}</TableCell>
                <TableCell>{user?.room}</TableCell>
                <TableCell>{user?.balance}</TableCell>
                <TableCell>
                  <Button onClick={() => setCustom(user?._id)}>
                    <FaBangladeshiTakaSign />
                    <MdAdd />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {isFetching && <TableLoader columns={9} />}
              {!isFetching && (
                <TableRow>
                  <TableCell colSpan="9">
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
