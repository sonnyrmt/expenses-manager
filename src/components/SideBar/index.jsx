import Image from "next/image";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import CategoryIcon from "@mui/icons-material/Category";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Divider } from "@mui/material";

const SideBar = () => {
  return (
    <div className="w-52 min-w-52 h-full bg-neutral-800 rounded text-white p-3">
      <div className="mb-3 p-1">Manager</div>
      <ListItem disablePadding>
        <ListItemButton sx={{ borderRadius: "5px", bgcolor: "#17171726" }}>
          <SpaceDashboardIcon sx={{ color: "gray", mr: 1 }} />
          <div className="text-sm">Dashboard</div>
        </ListItemButton>
      </ListItem>
      <div className="mt-3 mb-3 p-1">Register Data</div>
      <ListItem disablePadding>
        <ListItemButton sx={{ borderRadius: "5px", bgcolor: "#17171726" }}>
          <CurrencyExchangeIcon sx={{ color: "gray", mr: 1 }} />
          <div className="text-sm">Exchange</div>
        </ListItemButton>
      </ListItem>
      <Divider sx={{ mt: 0.5, mb: 0.5 }} />
      <ListItem disablePadding>
        <ListItemButton sx={{ borderRadius: "5px", bgcolor: "#17171726" }}>
          <CategoryIcon sx={{ color: "gray", mr: 1 }} />
          <div className="text-sm">Categories</div>
        </ListItemButton>
      </ListItem>
      <Divider sx={{ mt: 0.5, mb: 0.5 }} />
      <ListItem disablePadding>
        <ListItemButton sx={{ borderRadius: "5px", bgcolor: "#17171726" }}>
          <AccountBalanceWalletIcon sx={{ color: "gray", mr: 1 }} />
          <div className="text-sm">Methods</div>
        </ListItemButton>
      </ListItem>
    </div>
  );
};

export default SideBar;
