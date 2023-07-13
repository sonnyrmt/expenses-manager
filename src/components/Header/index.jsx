import { Button, IconButton } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import thousandSeparator from "@/utils/thousandSeparator";
import { motion, AnimatePresence } from "framer-motion";
import ChartTest from "../ChartTest";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";
import EnterNewPayment from "../EnterNewPayment/EnterNewPayment";

const Header = ({ setOpen, headerData, loading }) => {
  const [openEnterPayment, setOpenEnterPayment] = useState(false);

  const {
    userData: { wallet_balance, id },
    setUserData,
  } = useContext(AuthContext);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: !loading ? 0 : 1 }}
        animate={{ opacity: !loading ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {!loading ? (
          <div className="flex gap-2">
            <div className="flex w-full rounded bg-neutral-900/30 p-6 mb-3">
              <div className="flex w-full justify-center items-center gap-5">
                <div className="text-4xl">Expenses</div>
                <Divider orientation="vertical" flexItem />
                <Button
                  onClick={(event) => setOpen(true)}
                  sx={{ textTransform: "capitalize", height: "30px" }}
                  size="small"
                  variant="outlined"
                >
                  Register New
                </Button>
              </div>
            </div>
            <div className="flex w-full rounded bg-neutral-900/30 mb-3  relative">
              <div className="flex items-center w-full justify-center gap-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-4xl">Wallet</div>
                <Divider orientation="vertical" flexItem />
                <div>
                  <div className="uppercase font-semibold text-[#a5f990] text-xl">
                    {wallet_balance} <span className="text-sm font-light text-gray-400">USDT</span>
                    <IconButton onClick={() => setOpenEnterPayment(true)} sx={{ ml: 1 }} size="small">
                      <AddCircleOutlineIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </div>
                  <Divider />
                  <div className="uppercase font-semibold text-[#90caf9] text-xl">
                    {thousandSeparator(wallet_balance * headerData.data.exchangeData)}{" "}
                    <span className="text-sm font-light text-gray-400">Binance Price</span>
                  </div>
                </div>
              </div>
              <ChartTest />
            </div>
            <div className="flex w-full gap-5 rounded bg-neutral-900/30 items-center  mb-3 relative">
              <div className="flex items-center w-full justify-center gap-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-4xl">Exchange</div>
                <Divider orientation="vertical" flexItem />
                <div>
                  <div className="uppercase font-semibold text-[#a5f990] text-xl">
                    {headerData.data.total.usdt} <span className="text-sm font-light text-gray-400">USDT</span>
                  </div>
                  <Divider />
                  <div className="uppercase font-semibold text-[#90caf9] text-xl">
                    {thousandSeparator(headerData.data.total.ars)}{" "}
                    <span className="text-sm font-light text-gray-400">ARS</span>
                  </div>
                </div>
              </div>
              <ChartTest />
            </div>
            <div className="flex w-full  gap-5 rounded bg-neutral-900/30 items-center  mb-3 relative">
              <div className="flex items-center w-full justify-center gap-5 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="text-4xl">Current</div>
                <Divider orientation="vertical" flexItem />
                <div>
                  <div className="uppercase font-semibold text-[#90caf9] text-xl">
                    {thousandSeparator(headerData.data.total.ars - headerData.data.totalExpenses.total)}{" "}
                    <span className="text-sm font-light text-gray-400">ARS</span>
                  </div>
                  <Divider />
                  <div className=" font-semibold text-[#ff6161] text-xl">
                    {thousandSeparator(headerData.data.totalExpenses.total)}{" "}
                    <span className="text-sm font-light text-gray-400">Expenses</span>
                  </div>
                </div>
              </div>
              <ChartTest />
            </div>
          </div>
        ) : (
          <div className="flex gap-2 mb-3">
            <Skeleton variant="rounded" animation="wave" width={"100%"} height={85} />
            <Skeleton variant="rounded" animation="wave" width={"100%"} height={85} />
            <Skeleton variant="rounded" animation="wave" width={"100%"} height={85} />
            <Skeleton variant="rounded" animation="wave" width={"100%"} height={85} />
          </div>
        )}
      </motion.div>
      <EnterNewPayment open={openEnterPayment} setOpen={setOpenEnterPayment} setUserData={setUserData} userId={id} />
    </AnimatePresence>
  );
};

export default Header;
