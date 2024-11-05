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
import { useClient } from "../../hooks/pure/useClient";
import { getFormattedDateTime } from "../../utils/helper";
import AsToast from "../common/AsToast";
import CustomPagination from "../common/CustomPagination";
import NoDataAvailable from "../common/NoDataAvailable";
import SearchBar from "../common/SearchBar";
import TableLoader from "../common/TableLoader";

const StateMentList = () => {
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    // searchTerm: ,
    // status: ["pending", "canceled"],
  });

  const client = useClient();
  const queryClient = useQueryClient();

  const { data: statementList, isFetching } = useGetQueryDataList(
    "statement",
    defaultQuery,
    {
      onSuccess: () => {},
    }
  );

  const { mutate: updateStatusMutate } = useMutation({
    mutationFn: ({ id, status }) =>
      client(`statement/${id}`, { method: "PATCH", data: { status } }),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: ["statement-list"],
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
        <h2>Statements ({statementList?.meta?.total || 0})</h2>
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
            <TableHeaderCell>Mobile</TableHeaderCell>
            <TableHeaderCell>Transaction Number</TableHeaderCell>
            <TableHeaderCell>Amount</TableHeaderCell>
            <TableHeaderCell>Method</TableHeaderCell>
            <TableHeaderCell>Created At</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
            <TableHeaderCell>Prev Balance</TableHeaderCell>
            <TableHeaderCell>New Balance</TableHeaderCell>
            <TableHeaderCell>Action</TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {statementList?.result?.length > 0 && !isFetching ? (
            statementList?.result?.map((statement, index) => (
              <TableRow key={index}>
                <TableCell>
                  {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                </TableCell>
                <TableCell className="t-capitalize">
                  {statement?.user?.name || "-"}
                </TableCell>
                <TableCell>{statement?.mobile}</TableCell>
                <TableCell>{statement?.transactionNumber}</TableCell>
                <TableCell>{statement?.amount}</TableCell>
                <TableCell className="t-capitalize">
                  {statement?.type || "-"}
                </TableCell>
                <TableCell>
                  {getFormattedDateTime(statement?.createdAt)}
                </TableCell>
                <TableCell>
                  <span
                    className={`${statement?.status}OrderStatus orderStatusBtn t-capitalize`}
                  >
                    {statement?.status || "-"}
                  </span>
                </TableCell>
                <TableCell>{statement?.prevBalance.toFixed(2)}</TableCell>
                <TableCell>{statement?.newBalance.toFixed(2)}</TableCell>
                <TableCell>
                  <Select
                    disabled={statement?.status === "approved"}
                    defaultValue={statement?.status}
                    className="orderStatusDropdown"
                    options={[
                      {
                        key: "approved",
                        text: "Approved",
                        value: "approved",
                      },
                    ]}
                    onChange={(e, { value }) =>
                      handleStatusChange({ status: value, id: statement?._id })
                    }
                  />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <>
              {isFetching && <TableLoader columns={11} />}
              {!isFetching && (
                <TableRow>
                  <TableCell colSpan="11">
                    <NoDataAvailable />
                  </TableCell>
                </TableRow>
              )}
            </>
          )}
        </TableBody>
      </Table>
      <CustomPagination
        totalPages={statementList?.meta?.totalPage || 0}
        activePage={defaultQuery?.page || 0}
        onPageChange={(value) =>
          setDefaultQuery((prev) => ({ ...prev, page: value }))
        }
      />
    </div>
  );
};

export default StateMentList;
