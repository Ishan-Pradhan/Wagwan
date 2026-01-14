export type InputPropTypes = {
  type?: string;
  placeholder: string;
  className?: string;
  value?: string;
  error?: string;
  id: string;
  name: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
