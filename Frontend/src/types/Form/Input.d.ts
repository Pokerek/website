import { ChangeEvent } from "react";

export type TInput = {
  label: string;
  type?: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};
