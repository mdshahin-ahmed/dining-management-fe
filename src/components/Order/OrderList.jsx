import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { capitalize } from "../../utils/helper";
import TableLoader from "../common/TableLoader";
import NoDataAvailable from "../common/NoDataAvailable";

const OrderList = () => {
  const usersList = [];
  const isFetching = false;

  return (
    <div className="previewLayout">
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
          </TableRow>
        </TableHeader>
        <TableBody>
          {usersList?.length > 0 && !isFetching ? (
            usersList?.map((user, index) => (
              <TableRow key={user?._id}>
                <TableCell>{index + 1}</TableCell>
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
              </TableRow>
            ))
          ) : (
            <>
              {isFetching && <TableLoader columns={8} />}
              {!isFetching && (
                <TableRow>
                  <TableCell colSpan="8">
                    <NoDataAvailable />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderList;
