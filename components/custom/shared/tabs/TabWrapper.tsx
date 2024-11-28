import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsProps {
  tabHeader: object;
  defaultTab?: string;
  children: React.ReactNode;
}

export const TabWrapper = ({ tabHeader, defaultTab, children }: TabsProps) => {
  return (
    <Tabs
      defaultValue={defaultTab ?? Object.keys(tabHeader)[0]}
      className="w-11/12 py-8 md:w-3/4 lg:w-1/2 2xl:w-1/4"
    >
      <TabsList className="grid w-full grid-cols-2 gap-4">
        {Object.entries(tabHeader).map(([key, header]) => (
          <TabsTrigger key={key} value={key}>
            {header}
          </TabsTrigger>
        ))}
      </TabsList>
      {children}
    </Tabs>
  );
};
