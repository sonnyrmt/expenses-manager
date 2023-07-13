import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { IconButton } from "@mui/material";

const styledColumns = ({ setter }) => {
  return [
    {
      field: "id",
      headerName: "# ID",
      flex: 0.3,
      renderCell: (params) => <span className="text-blue-300">#{params.row.id}</span>,
    },
    { field: "date", headerName: "Date", flex: 0.5 },
    { field: "description", headerName: "Description", flex: 1 },
    { field: "category", headerName: "Category", flex: 1 },
    {
      field: "amount",
      headerName: "Amount",
      flex: 1,
      renderCell: (params) => <span className="text-[#ff6161]">{params.row.amount}</span>,
    },
    {
      field: "method",
      headerName: "Method",
      flex: 1,
      renderCell: (params) => {
        return <span className={`${params.row.methods.color}`}>{params.row.method}</span>;
      },
    },
    {
      field: "Action",
      headerName: "Action",
      flex: 0.3,
      renderCell: (params) => {
        return (
          <IconButton onClick={() => setter({ status: true, id: params.row.id })} size="small">
            <HighlightOffIcon sx={{ color: "#ff6161", fontSize: 20 }} />
          </IconButton>
        );
      },
    },
  ];
};

export default styledColumns;
