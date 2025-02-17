interface Column {
  field: string;
  label: string;
  align?: "left" | "right" | "center";
}

interface Row {
  [key: string]: string | number;
}

export interface TableCustomProps {
  columns: Column[];
  rows: any[];
  rowsPerPageOptions?: number[];
  showEditButton?: boolean;
  showDeleteButton?: boolean;
  onEdit?: (row: Row) => void;
  onDelete?: (row: Row) => void;
}
