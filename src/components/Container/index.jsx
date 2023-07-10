import { Button, Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import useGetData from "@/hooks/useGetData";
import CreateNewExpense from "../CreateNewExpense";
import Header from "../Header";

export const dataColumns = [
  { field: "id", headerName: "# ID", flex: 0.5 },
  { field: "description", headerName: "Description", flex: 2 },
  { field: "category", headerName: "Category", flex: 1 },
  { field: "method", headerName: "Method", flex: 1 },
  { field: "amount", headerName: "Amount", flex: 1 },
  { field: "date", headerName: "Date", flex: 1 },
];

const Container = () => {
  const [open, setOpen] = useState(false);
  const { data, loading, error, addData } = useGetData("/api/expenses");

  return (
    <div className="w-full h-full bg-neutral-800 rounded text-white p-4">
      <Header setOpen={setOpen} />
      <Box sx={{ height: "calc(100vh - 140px)" }}>
        {!loading && (
          <DataGrid
            rows={data}
            columns={dataColumns}
            pageSizeOptions={[20, 40, 50]}
            density="compact"
            initialState={{
              sorting: {
                sortModel: [{ field: "id", sort: "desc" }],
              },
              pagination: {
                paginationModel: {
                  pageSize: 20,
                },
              },
            }}
          />
        )}
      </Box>
      <CreateNewExpense open={open} setOpen={setOpen} addData={addData} />
    </div>
  );
};

export default Container;
