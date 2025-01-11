import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "semantic-ui-react";
import { useDisclosure } from "../../hooks/pure/useDisclosure";
import CreateExpenseModal from "./CreateExpenseModal";
import { useState } from "react";
import { useGetQueryDataList } from "../../api/query.api";
import TableLoader from "../common/TableLoader";
import NoDataAvailable from "../common/NoDataAvailable";
import CustomPagination from "../common/CustomPagination";

const ExpenseList = () => {
  const [defaultQuery, setDefaultQuery] = useState({
    page: 1,
    limit: 20,
    // searchTerm: ,
    // status: ["pending", "canceled"],
  });

  const { isOpen, onClose, setCustom } = useDisclosure();
  const { data: expenseList = [], isFetching } = useGetQueryDataList(
    "expense",
    defaultQuery,
    {
      onSuccess: () => {},
    }
  );
  return (
    <>
      <CreateExpenseModal onClose={onClose} open={isOpen} />
      <div className="previewLayout">
        <div className="d-flex jcsb">
          <h2>Expense ({expenseList?.meta?.total || 0})</h2>
          <Button onClick={() => setCustom(true)} className="ml-3" primary>
            Add Expense
          </Button>
        </div>
        <Table basic>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>#</TableHeaderCell>
              <TableHeaderCell>Description</TableHeaderCell>
              <TableHeaderCell>Amount</TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenseList?.result?.length > 0 && !isFetching ? (
              expenseList?.result?.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>
                    {(defaultQuery?.page - 1) * defaultQuery?.limit + index + 1}
                  </TableCell>
                  <TableCell className="t-capitalize">
                    {expense?.description || "-"}
                  </TableCell>
                  <TableCell>{expense?.amount || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <>
                {isFetching && <TableLoader columns={3} />}
                {!isFetching && (
                  <TableRow>
                    <TableCell colSpan={3}>
                      <NoDataAvailable />
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
        <CustomPagination
          totalPages={expenseList?.meta?.totalPage || 0}
          activePage={defaultQuery?.page || 0}
          onPageChange={(value) =>
            setDefaultQuery((prev) => ({ ...prev, page: value }))
          }
        />
      </div>
    </>
  );
};

export default ExpenseList;
