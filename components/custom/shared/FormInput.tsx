import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { FC } from "react";

interface FormInputProps {
  control: any;
  formFieldName: string;
  labelName: string;
  inputType?: string;
}

const FormInput: FC<FormInputProps> = ({
  control,
  formFieldName,
  labelName,
  inputType,
}) => {
  return (
    <FormField
      control={control}
      name={formFieldName}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{labelName}</FormLabel>
          <FormControl>
            <Input type={inputType} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormInput;
