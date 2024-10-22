import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { capitalize, getFormattedDateTime } from "../../utils/helper";
import TableLoader from "../common/TableLoader";
import NoDataAvailable from "../common/NoDataAvailable";
import { useQuery } from "@tanstack/react-query";
import { useClient } from "../../hooks/pure/useClient";

const OrderList = () => {
  const client = useClient();
  const { data: ordersList, isFetching } = useQuery({
    queryKey: ["users-list"],
    queryFn: () => client("order"),
  });
  console.log(ordersList);

  return (
    <div className="previewLayout">
      <Table basic>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>User Name</TableHeaderCell>
            <TableHeaderCell>Meal Name</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
            <TableHeaderCell>Updated At</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersList?.length > 0 && !isFetching ? (
            ordersList?.map((order, index) => (
              <TableRow key={order?._id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{capitalize(order?.user?.name || "-")}</TableCell>
                <TableCell>{capitalize(order?.name || "-")}</TableCell>
                <TableCell>{capitalize(order?.description || "-")}</TableCell>
                <TableCell>{getFormattedDateTime(order?.createdAt)}</TableCell>
                <TableCell>{getFormattedDateTime(order?.updatedAt)}</TableCell>
                <TableCell>{order?.price}</TableCell>
                <TableCell></TableCell>
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
