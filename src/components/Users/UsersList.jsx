import { useQuery } from "@tanstack/react-query";
import { useClient } from "../../hooks/pure/useClient";
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

const UsersList = () => {
  const client = useClient();
  const { data: usersList, isFetching } = useQuery({
    queryKey: ["users-list"],
    queryFn: () => client("user/all"),
  });

  return (
    <div className="previewLayout" style={{ overflowX: "auto" }}>
      <Table basic>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Role</TableHeaderCell>
            <TableHeaderCell>Email</TableHeaderCell>
            <TableHeaderCell>Mobile</TableHeaderCell>
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
