import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
import {
  Select,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useGetQueryDataList } from "../../api/query.api";
import { orderStatus } from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { capitalize, getFormattedDateTime } from "../../utils/helper";
import AsToast from "../common/AsToast";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import SearchBar from "../common/SearchBar";
import TableLoader from "../common/TableLoader";

const OrderList = () => {
  // const { user } = useAuth();
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    searchTerm: "",
    // status: ["pending", "canceled"],
  });

  const client = useClient();
  const queryClient = useQueryClient();

  const { data: ordersList, isFetching } = useGetQueryDataList(
    "order",
    defaultQuery,
    {
      onSuccess: () => {},
    }
  );

  const { mutate: updateStatusMutate } = useMutation({
    mutationFn: ({ id, status }) =>
      client(`order/${id}`, { method: "PATCH", data: { status } }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["order-list"],
        type: "active",
      });

      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Order updated successfully!</span>
        </div>
      );
    },
  });

  const handleStatusChange = (e, { value }, id) => {
    updateStatusMutate({ id, status: value });
  };

  return (
    <div className="previewLayout">
      <div className="d-flex jcsb">
        <h2>Orders ({ordersList?.meta?.total || 0})</h2>
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
            <TableHeaderCell>User Name</TableHeaderCell>
            <TableHeaderCell>Meal Name</TableHeaderCell>
            <TableHeaderCell>Meal Id</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
            <TableHeaderCell>Updated At</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersList?.result?.length > 0 && !isFetching ? (
            ordersList?.result?.map((order, index) => (
              <TableRow key={order?._id}>
                <TableCell>
                  {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                </TableCell>
                <TableCell>{capitalize(order?.user?.name || "-")}</TableCell>
                <TableCell>{capitalize(order?.name || "-")}</TableCell>
                <TableCell>{order?.uId || "-"}</TableCell>
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
                    // options={
                    //   user?.role === "user" ? orderStatus.slice(1) : orderStatus
                    // }
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
        totalPages={ordersList?.meta?.totalPage || 0}
        activePage={defaultQuery?.page || 0}
        onPageChange={(value) =>
          setDefaultQuery((prev) => ({ ...prev, page: value }))
        }
      />
    </div>
  );
};

export default OrderList;
