import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { AiOutlineCheckCircle } from "react-icons/ai";
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
import { useGetQueryDataList } from "../../api/query.api";
import { useClient } from "../../hooks/pure/useClient";
import { getFormattedDateTime } from "../../utils/helper";
import AsToast from "../common/AsToast";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import TableLoader from "../common/TableLoader";
import { useAuth } from "../../context/app/useAuth";
import { cancelRequestStatus } from "../../constant/common.constant";
import { useNavigate } from "react-router-dom";

const CancelReqList = () => {
  const { user } = useAuth();
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    // searchTerm: ,
    // status: ["pending", "canceled"],
  });

  const client = useClient();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: cancelReqList, isFetching } = useGetQueryDataList(
    "cancel",
    defaultQuery,
    {
      onSuccess: () => {},
    }
  );

  const { mutate: updateCancelReqMutate } = useMutation({
    mutationFn: ({ id, status }) =>
      client(`cancel/${id}`, { method: "PATCH", data: { status } }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["cancel-list"],
        type: "active",
      });
      AsToast.success(
        <div className="errorToast">
          <AiOutlineCheckCircle /> &nbsp;
          <span>Cancel req updated successfully!</span>
        </div>
      );
    },
  });

  const handleStatusChange = (data) => {
    updateCancelReqMutate(data);
  };

  return (
    <div className="previewLayout">
      <div className="d-flex jcsb">
        <h2>Cancel ({cancelReqList?.meta?.total || 0})</h2>
        <Button onClick={() => navigate("add")} className="ml-3" primary>
          Add Cancel
        </Button>
      </div>
      <Table basic>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>#</TableHeaderCell>
            <TableHeaderCell>User Name</TableHeaderCell>
            <TableHeaderCell>User Id</TableHeaderCell>
            <TableHeaderCell>Meal Name</TableHeaderCell>
            <TableHeaderCell>Meal Type</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
            <TableHeaderCell>Updated At</TableHeaderCell>
            {user?.role === "admin" && (
              <TableHeaderCell>Action</TableHeaderCell>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {cancelReqList?.result?.length > 0 && !isFetching ? (
            cancelReqList?.result?.map((cancel, index) => (
              <TableRow key={index}>
                <TableCell>
                  {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                </TableCell>
                <TableCell className="t-capitalize">
                  {cancel?.user?.name || "-"}
                </TableCell>
                <TableCell>{cancel?.user?.userId || "-"}</TableCell>
                <TableCell className="t-capitalize">
                  <Button className={cancel?.mealName}>
                    {cancel?.mealName || "-"}
                  </Button>
                </TableCell>
                <TableCell>{cancel?.mealType || "-"}</TableCell>
                <TableCell>
                  <span
                    className={`${cancel?.status}OrderStatus orderStatusBtn t-capitalize`}
                  >
                    {cancel?.status || "-"}
                  </span>
                </TableCell>
                <TableCell>{getFormattedDateTime(cancel?.createdAt)}</TableCell>
                <TableCell>{getFormattedDateTime(cancel?.updatedAt)}</TableCell>
                {user?.role === "admin" && (
                  <TableCell>
                    <Select
                      // disabled={cancel?.status === "approved"}
                      defaultValue={cancel?.status}
                      className="orderStatusDropdown"
                      options={cancelRequestStatus || []}
                      onChange={(e, { value }) =>
                        handleStatusChange({
                          status: value,
                          id: cancel?._id,
                        })
                      }
                    />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : (
            <>
              {isFetching && (
                <TableLoader columns={user?.role === "admin" ? 9 : 8} />
              )}
              {!isFetching && (
                <TableRow>
                  <TableCell colSpan={(user?.role === "admin" && 9) || 8}>
                    <NoDataAvailable />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <CustomPagination
        totalPages={cancelReqList?.meta?.totalPage || 0}
        activePage={defaultQuery?.page || 0}
        onPageChange={(value) =>
          setDefaultQuery((prev) => ({ ...prev, page: value }))
        }
      />
    </div>
  );
};

export default CancelReqList;
