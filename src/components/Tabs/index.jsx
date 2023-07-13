import { useState } from "react";
import { Tab, Tabs } from "@mui/material";

const TabComponent = ({ value, setValue }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className="mb-3 w-full">
      <Tabs
        sx={{ minHeight: "36px", height: "36px", padding: 0, background: "#1717174d", borderRadius: 1 }}
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab sx={{ minHeight: "36px", height: "36px", padding: 0 }} label="Dashboard" />
        <Tab sx={{ minHeight: "36px", height: "36px", padding: 0 }} label="New Category" />
        <Tab sx={{ minHeight: "36px", height: "36px", padding: 0 }} label="New Exchange" />
        <Tab sx={{ minHeight: "36px", height: "36px", padding: 0 }} label="New Method" />
        {/* <Tab sx={{ minHeight: "36px", height: "36px", padding: 0 }} label="Download" /> */}
      </Tabs>
    </div>
  );
};

export default TabComponent;
