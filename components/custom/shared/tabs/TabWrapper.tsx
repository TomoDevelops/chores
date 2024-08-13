import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsProps {
  tabHeader: object;
  defaultTab?: string;
  children: React.ReactNode;
}

export const TabWrapper = ({ tabHeader, defaultTab, children }: TabsProps) => {
  return (
    <Tabs
      defaultValue={defaultTab ?? Object.keys(tabHeader)[0]}
      className="w-3/4 xl:w-1/2"
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
