import TabComponent from "../Tabs";
import Dashboard from "../Dashboard";
import { useState } from "react";

const sections = [{ component: Dashboard, id: 0 }];

const Container = () => {
  const [section, setSection] = useState(0);

  const renderComponent = () => {
    const selectedSection = sections.find((s) => s.id === section);
    if (selectedSection) {
      const Component = selectedSection.component;
      return <Component />;
    }
    return null;
  };

  return (
    <div className="w-full h-full bg-neutral-800 rounded text-white p-4">
      <TabComponent value={section} setValue={setSection} />
      {renderComponent()}
    </div>
  );
};

export default Container;
