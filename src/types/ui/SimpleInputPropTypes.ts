export type SimpleInputPropTypes = {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type: "text" | "number" | "email";
  name: string;
  placeholder: string;
};
