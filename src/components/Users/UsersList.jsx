import { useQuery } from "@tanstack/react-query";
import { useClient } from "../../hooks/pure/useClient";
import { Table, TableBody, TableCell, TableHeader } from "semantic-ui-react";

const UsersList = () => {
  const client = useClient();
  const { data: usersList, isFetching } = useQuery({
    queryKey: ["users-list"],
    queryFn: () => client("user/all"),
  });
  console.log(usersList);

  return (
    <div className="previewLayout">
      <Table>
        <TableHeader>
          <TableCell>#</TableCell>
          <TableCell>Name</TableCell>
          <TableCell>Role</TableCell>
          <TableCell>Email</TableCell>
          <TableCell>Phone</TableCell>
          <TableCell>Balance</TableCell>
          <TableCell>Actions</TableCell>
        </TableHeader>
        <TableBody>
          <TableCell>1</TableCell>
        </TableBody>
      </Table>
    </div>
  );
};

export default UsersList;
