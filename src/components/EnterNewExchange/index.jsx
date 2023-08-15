import thousandSeparator from "@/utils/thousandSeparator";
import removeNonNumeric from "@/utils/removeNaN";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  p: 2,
};
export default function EnterNewExchange({ open, setOpen }) {
  const handleClose = () => setOpen(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    watch,
  } = useForm({ mode: "onChange" });

  const submit = async (val) => {
    // const new_balance = parseInt(val.new_balance.replaceAll(".", ""));
    // const { data } = await axios.put(`/api/user?id=${userId}`, { new_balance });
    // setUserData((prev) => ({ ...prev, wallet_balance: data.wallet_balance }));
    reset();
    handleClose();
  };

  const changePrice = watch("change_price");
  const amountUsdt = watch("amount_usdt");

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <form onSubmit={handleSubmit(submit)}>
          <div className="mb-3">
            <Controller
              id="amount_usdt"
              name="amount_usdt"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  fullWidth
                  onChange={(event) => onChange(thousandSeparator(removeNonNumeric(event.target.value)))}
                  value={value || ""}
                  label="Exchange Amount"
                  error={Boolean(errors?.amount_usdt)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">USDT</InputAdornment>,
                  }}
                />
              )}
            />
          </div>
          <div className="mb-3">
            <Controller
              id="change_price"
              name="change_price"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  fullWidth
                  onChange={(event) => onChange(thousandSeparator(removeNonNumeric(event.target.value)))}
                  value={value || ""}
                  label="Exchange Price"
                  error={Boolean(errors?.change_price)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">ARS</InputAdornment>,
                  }}
                />
              )}
            />
          </div>
          <div className="mb-3">
            <Controller
              id="amount_ars"
              name="amount_ars"
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  size="small"
                  fullWidth
                  disabled
                  onChange={(event) => onChange(thousandSeparator(removeNonNumeric(event.target.value)))}
                  value={thousandSeparator(
                    (parseInt(changePrice?.replaceAll(".", "")) || 0) * (parseInt(amountUsdt?.replaceAll(".", "")) || 0)
                  )}
                  label="Total"
                  error={Boolean(errors?.amount_ars)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">ARS</InputAdornment>,
                  }}
                />
              )}
            />
          </div>
          <Button variant="outlined" fullWidth>
            Save
          </Button>
        </form>
      </Box>
    </Modal>
  );
}
