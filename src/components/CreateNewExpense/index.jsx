import thousandSeparator from "@/utils/thousandSeparator";
import removeNonNumeric from "@/utils/removeNaN";
import { useForm, Controller } from "react-hook-form";
import useGetData from "@/hooks/useGetData";
import { TextField, Modal, Button, Box, MenuItem, InputAdornment } from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  borderRadius: 2,
  border: "1px solid #90CAf9",
  p: 2,
};

export default function CreateNewExpense({ open, setOpen, addData }) {
  const { data, loading, error } = useGetData("/api/select-data");

  const handleClose = () => setOpen(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ mode: "onChange" });

  const submit = async (values) => {
    const { data } = await axios.post("/api/expenses", { values });
    addData(data);
    reset();
    // setOpen(false);
  };

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          {!loading && (
            <form onSubmit={handleSubmit(submit)}>
              <div className="mb-3">
                <Controller
                  id="description"
                  name="description"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="small"
                      fullWidth
                      onChange={onChange}
                      value={value || ""}
                      label="Description"
                      placeholder="Shopping, Cinema"
                      error={Boolean(errors?.description)}
                    />
                  )}
                />
              </div>
              <div className="mb-3">
                <Controller
                  id="category"
                  name="category"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="small"
                      fullWidth
                      onChange={onChange}
                      value={value || ""}
                      label="Category"
                      placeholder="Food, Services, Transport"
                      error={Boolean(errors?.category)}
                      select
                    >
                      {data?.categories.map((category) => (
                        <MenuItem key={category.id} value={category.id} dense divider>
                          {category.description}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
              <div className="mb-3">
                <Controller
                  id="method"
                  name="method"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="small"
                      fullWidth
                      onChange={onChange}
                      value={value || ""}
                      label="Method"
                      placeholder="Lemon, Uala, Bank"
                      error={Boolean(errors?.method)}
                      select
                    >
                      {data?.methods.map((method) => (
                        <MenuItem key={method.id} value={method.id} dense divider>
                          {method.description}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
              </div>
              <div className="mb-3">
                <Controller
                  id="amount"
                  name="amount"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="small"
                      fullWidth
                      onChange={(event) => onChange(thousandSeparator(removeNonNumeric(event.target.value)))}
                      value={value || ""}
                      label="Amount"
                      placeholder="10.000"
                      error={Boolean(errors?.amount)}
                      InputProps={{
                        startAdornment: <InputAdornment position="start">{"$"}</InputAdornment>,
                      }}
                    />
                  )}
                />
              </div>
              <Button type="submit" fullWidth variant="outlined">
                Save
              </Button>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  );
}
