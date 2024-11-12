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
import { adminOrderStatus } from "../../constant/common.constant";
import { useClient } from "../../hooks/pure/useClient";
import { getFormattedDateTime } from "../../utils/helper";
import AsToast from "../common/AsToast";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import SearchBar from "../common/SearchBar";
import TableLoader from "../common/TableLoader";
import { useAuth } from "../../context/app/useAuth";

const AllOrders = () => {
  const { user } = useAuth();
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    // searchTerm: ,
    type: "",
    status: ["delivered", "canceled"],
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

  const handleStatusChange = (data) => {
    updateStatusMutate(data);
  };

  return (
    <div className="previewLayout">
      <div className="orderHeaderWrap">
        <h2>Orders ({ordersList?.meta?.total || 0})</h2>
        <div className="orderFilterWrap">
          <SearchBar
            placeholder="Search meal"
            stillTime={500}
            onSuccess={(e) =>
              setDefaultQuery((prev) => ({ ...prev, searchTerm: e }))
            }
          />
        </div>
      </div>
      <Table basic>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>User Name</TableHeaderCell>
            <TableHeaderCell>User Id</TableHeaderCell>
            <TableHeaderCell>Meal Name</TableHeaderCell>
            <TableHeaderCell>Meal Type</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
            <TableHeaderCell>Updated At</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Price</TableHeaderCell>
            {(user?.role === "admin" || user?.role === "manager") && (
              <TableHeaderCell>Action</TableHeaderCell>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersList?.result?.length > 0 && !isFetching ? (
            ordersList?.result?.map((order, index) => (
              <TableRow key={order?._id}>
                <TableCell>
                  {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                </TableCell>
                <TableCell className="t-capitalize">
                  {order?.user?.name || "-"}
                </TableCell>
                <TableCell>{order?.userId}</TableCell>
                <TableCell className="t-capitalize">
                  {order?.name || "-"}
                </TableCell>
                <TableCell className="t-capitalize">
                  {order?.type || "-"}
                </TableCell>
                <TableCell className="t-capitalize">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: order?.description || "",
                    }}
                  />
                </TableCell>
                <TableCell>{getFormattedDateTime(order?.createdAt)}</TableCell>
                <TableCell>{getFormattedDateTime(order?.updatedAt)}</TableCell>
                <TableCell>
                  <span
                    className={`${order?.status}OrderStatus orderStatusBtn t-capitalize`}
                  >
                    {order?.status || "-"}
                  </span>
                </TableCell>
                <TableCell>{order?.price}</TableCell>
                {(user?.role === "admin" || user?.role === "manager") && (
                  <TableCell>
                    <Select
                      disabled={
                        // order?.status === "delivered" ||
                        order?.status === "canceled"
                      }
                      defaultValue={order?.status}
                      className="orderStatusDropdown"
                      options={adminOrderStatus}
                      onChange={(e, { value }) =>
                        handleStatusChange({ status: value, id: order?._id })
                      }
                    />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <>
              {isFetching && (
                <TableLoader
                  columns={
                    user?.role === "admin" || user?.role === "manager" ? 11 : 10
                  }
                />
              )}
              {!isFetching && (
                <TableRow>
                  <TableCell
                    colSpan={
                      user?.role === "admin" || user?.role === "manager"
                        ? 11
                        : 10
                    }
                  >
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

export default AllOrders;
