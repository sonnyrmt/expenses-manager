import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import useGetData from "@/hooks/useGetData";
import thousandSeparator from "@/utils/thousandSeparator";

const Header = ({ setOpen }) => {
  const { data, loading, error } = useGetData("/api/exchange");

  return (
    !loading && (
      <div className="flex gap-2">
        <div className="flex w-full gap-5 rounded bg-neutral-900/30 items-center p-3 mb-3">
          <div className="text-3xl">Expenses</div>
          <Button
            onClick={() => setOpen(true)}
            sx={{ textTransform: "capitalize", height: "30px" }}
            size="small"
            variant="outlined"
          >
            Create New
          </Button>
        </div>
        <div className="flex w-full  gap-5 rounded bg-neutral-900/30 items-center p-3 mb-3 relative">
          <div className="text-3xl">Salary</div>
          <Divider orientation="vertical" flexItem />
          <div>
            <div className="uppercase font-semibold text-[#a5f990] text-xl">
              600 <span className="text-sm font-light text-gray-400">USDT</span>
            </div>
            <Divider />
            <div className="uppercase font-semibold text-[#a5f990] text-xl">
              {thousandSeparator(600 * data.exchangeData)}{" "}
              <span className="text-sm font-light text-gray-400">Binance Price</span>
            </div>
          </div>
        </div>
        <div className="flex w-full  gap-5 rounded bg-neutral-900/30 items-center p-3 mb-3 relative">
          <div className="text-3xl">Exchange</div>
          <Divider orientation="vertical" flexItem />
          <div>
            <div className="uppercase font-semibold text-[#a5f990] text-xl">
              {data.total.usdt} <span className="text-sm font-light text-gray-400">USDT</span>
            </div>
            <Divider />
            <div className="uppercase font-semibold text-[#90caf9] text-xl">
              {thousandSeparator(data.total.ars)} <span className="text-sm font-light text-gray-400">ARS</span>
            </div>
          </div>
        </div>
        <div className="flex w-full  gap-5 rounded bg-neutral-900/30 items-center p-3 mb-3 relative">
          <div className="text-3xl">Current</div>
          <Divider orientation="vertical" flexItem />
          <div>
            <div className="uppercase font-semibold text-[#90caf9] text-xl">
              {thousandSeparator(data.total.ars - data.totalExpenses.total)}
              <span className="text-sm font-light text-gray-400">ARS</span>
            </div>
            <Divider />
            <div className=" font-semibold text-[#90caf9] text-xl">
              {thousandSeparator(data.totalExpenses.total)}{" "}
              <span className="text-sm font-light text-gray-400">Expenses</span>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Header;
