import { TablePagination } from "@mui/material";
import { TablePaginationCustomProps } from "../../../interfaces/TablePaginationCustomProps";

function TablePaginationCustom({
  rowsPerPageOptions,
  count,
  rowsPerPage,
  page,
  onPageChange,
  onRowsPerPageChange,
}: TablePaginationCustomProps) {
  return (
    <TablePagination
      rowsPerPageOptions={rowsPerPageOptions}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
    />
  );
}

export default TablePaginationCustom;
