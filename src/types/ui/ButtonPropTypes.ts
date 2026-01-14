export type ButtonPropTypes = {
  type: "submit" | "reset" | "button" | undefined;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
};
