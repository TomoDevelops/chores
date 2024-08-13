import { TabsContent } from "@/components/ui/tabs";
import React from "react";

interface TabContentWrapperProps {
  tabContentKey: string;
  children: React.ReactNode;
}

const TabContentWrapper = ({
  tabContentKey,
  children,
}: TabContentWrapperProps) => {
  return (
    <TabsContent value={tabContentKey} className="min-h-[450px]">
      {children}
    </TabsContent>
  );
};

export default TabContentWrapper;
