import { TInput } from "./Input";

export type TFormControl = {
  fields: TInput[];
  onSubmit: (data: { [key: string]: string }) => void;
};
