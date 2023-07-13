import { Box, styled } from "@mui/material";
import CreateNewExpense from "../CreateNewExpense";
import Header from "../Header";
import Skeleton from "@mui/material/Skeleton";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import useData from "@/hooks/useData";
import styledColumns from "./styledColumn";
import ConfirmationDialog from "../ConfirmationDialog";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& ::-webkit-scrollbar": {
    width: "6px",
  },
  "& ::-webkit-scrollbar-track": {
    backgroundColor: "#252525",
  },
  "& ::-webkit-scrollbar-thumb": {
    borderRadius: "10px",
    boxShadow: "inset 0 0 6px rgba(0,0,0,.3)",
    backgroundColor: "#555555",
  },
}));

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [headerData, setHeaderData] = useState({ loading: true, data: null, error: null });
  const { data, loading, error, addData, remove } = useData("/api/expenses");
  const [groupLoading, setGroupLoading] = useState(true);
  const columns = styledColumns({ setter: remove.setOpenRemove });

  const getHeaderData = async () => {
    try {
      const response = await axios.get("/api/exchange");
      setHeaderData((prev) => ({ ...prev, loading: false, data: response.data }));
    } catch (error) {
      setHeaderData((prev) => ({ ...prev, error }));
    }
  };

  useEffect(() => {
    getHeaderData();
  }, []);

  useEffect(() => {
    if (!loading && !headerData.loading) {
      setGroupLoading(false);
    }
  }, [loading, headerData.loading]);

  return (
    <div className="w-full relative">
      <Header setOpen={setOpen} open={open} headerData={headerData} loading={groupLoading} />
      <Box sx={{ height: "calc(100vh - 210px)" }}>
        <AnimatePresence>
          <motion.div
            initial={{ opacity: !groupLoading ? 0 : 1 }}
            animate={{ opacity: !groupLoading ? 1 : 0 }}
            transition={{ duration: 0.5 }}
            className="h-full"
          >
            {!groupLoading ? (
              <StyledDataGrid
                rows={data}
                columns={columns}
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
            ) : (
              <Skeleton variant="rounded" animation="wave" width={"100%"} height={"calc(100vh - 210px)"} />
            )}
          </motion.div>
        </AnimatePresence>
      </Box>
      <CreateNewExpense open={open} setOpen={setOpen} addData={addData} setHeaderData={setHeaderData} />
      <ConfirmationDialog remove={remove} />
    </div>
  );
};
export default Dashboard;
