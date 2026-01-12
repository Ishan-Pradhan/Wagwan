export type InputPropTypes = {
  type: string;
  placeholder: string;
  className: string;
  id: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
