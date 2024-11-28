import { TabsContent } from "@/components/ui/tabs";
import React from "react";

interface TabContentWrapperProps {
  tabContentKey: string;
  children: React.ReactNode;
  forceMount?: boolean;
}

const TabContentWrapper = ({
  tabContentKey,
  children,
  forceMount = false,
}: TabContentWrapperProps) => {
  return (
    <TabsContent
      forceMount={forceMount ? true : undefined}
      value={tabContentKey}
      className="mt-8 min-h-[450px]"
    >
      {children}
    </TabsContent>
  );
};

export default TabContentWrapper;
