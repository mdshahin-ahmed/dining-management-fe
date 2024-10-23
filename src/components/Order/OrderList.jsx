import {
  Button,
  Select,
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
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useClient } from "../../hooks/pure/useClient";
import { orderStatus } from "../../constant/common.constant";

const OrderList = () => {
  const client = useClient();
  const queryClient = useQueryClient();
  const { data: ordersList, isFetching } = useQuery({
    queryKey: ["orders-list"],
    queryFn: () => client("order"),
  });
  console.log(ordersList);

  const { mutate: updateStatusMutate } = useMutation({
    mutationFn: ({ id, status }) =>
      client(`order/${id}`, { method: "PATCH", data: { status } }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["orders-list"],
        type: "active",
      });
    },
  });

  const handleStatusChange = (e, { value }, id) => {
    updateStatusMutate({ id, status: value });
  };

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
            <TableHeaderCell>Status</TableHeaderCell>
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
                <TableCell>
                  <span
                    className={`${order?.status}OrderStatus orderStatusBtn`}
                  >
                    {capitalize(order?.status || "-")}
                  </span>
                </TableCell>
                <TableCell>{order?.price}</TableCell>
                <TableCell>
                  <Select
                    defaultValue={order?.status}
                    className="orderStatusDropdown"
                    options={orderStatus}
                    onChange={(e, data) =>
                      handleStatusChange(e, data, order?._id)
                    }
                  />
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
    </div>
  );
};

export default OrderList;
