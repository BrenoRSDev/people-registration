import React, { useState } from "react";
import {
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { default as TableMui } from "@mui/material/Table";
import { TablePaginationCustom } from "../../molecules";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { TableCustomProps } from "../../../interfaces/TableCustomProps";

function TableCustom({
  columns,
  rows,
  rowsPerPageOptions = [5, 10, 25],
  showEditButton = false,
  showDeleteButton = false,
  onEdit,
  onDelete,
}: TableCustomProps) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <TableMui sx={{ minWidth: 650 }} aria-label="custom table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.field} align={column.align || "left"}>
                {column.label}
              </TableCell>
            ))}
            {(showEditButton || showDeleteButton) && (
              <TableCell align="center">Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column) => (
                  <TableCell key={column.field} align={column.align || "left"}>
                    {row[column.field]}
                  </TableCell>
                ))}
                {(showEditButton || showDeleteButton) && (
                  <TableCell align="center">
                    {showEditButton && onEdit && (
                      <Tooltip title="Editar">
                        <IconButton onClick={() => onEdit(row)} color="primary">
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                    {showDeleteButton && onDelete && (
                      <Tooltip title="Deletar">
                        <IconButton onClick={() => onDelete(row)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </TableCell>
                )}
              </TableRow>
            ))}
        </TableBody>
      </TableMui>
      <TablePaginationCustom
        rowsPerPageOptions={rowsPerPageOptions}
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}

export default TableCustom;
