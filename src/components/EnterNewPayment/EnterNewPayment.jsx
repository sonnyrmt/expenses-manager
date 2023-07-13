import thousandSeparator from "@/utils/thousandSeparator";
import removeNonNumeric from "@/utils/removeNaN";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import axios from "axios";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import SendRoundedIcon from "@mui/icons-material/SendRounded";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  p: 2,
};
export default function EnterNewPayment({ open, setOpen, setUserData, userId }) {
  const handleClose = () => setOpen(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({ mode: "onChange" });

  const submit = async (val) => {
    const new_balance = parseInt(val.new_balance.replaceAll(".", ""));
    const { data } = await axios.put(`/api/user?id=${userId}`, { new_balance });
    setUserData((prev) => ({ ...prev, wallet_balance: data.wallet_balance }));
    reset();
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-3">
            <Controller
              id="new_balance"
              name="new_balance"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  fullWidth
                  onChange={(event) => onChange(thousandSeparator(removeNonNumeric(event.target.value)))}
                  value={value || ""}
                  label="New Payment"
                  error={Boolean(errors?.new_balance)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">USDT</InputAdornment>,
                    endAdornment: (
                      <IconButton type="submit" size="small">
                        <SendRoundedIcon sx={{ fontSize: 18 }} color="primary" />
                      </IconButton>
                    ),
                  }}
                />
              )}
            />
          </div>
        </form>
      </Box>
    </Modal>
  );
}
