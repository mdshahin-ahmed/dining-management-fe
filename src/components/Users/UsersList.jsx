import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useClient } from "../../hooks/pure/useClient";
import { capitalize } from "../../utils/helper";
import NoDataAvailable from "../common/NoDataAvailable";
import TableLoader from "../common/TableLoader";

const UsersList = () => {
  const client = useClient();
  const { data: usersList, isFetching } = useQuery({
    queryKey: ["users-list"],
    queryFn: () => client("user/all"),
  });

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
              {isFetching && <TableLoader columns={6} />}
              {!isFetching && (
                <TableRow>
                  <TableCell colSpan="6">
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

export default UsersList;
