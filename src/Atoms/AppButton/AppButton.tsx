import React from 'react'
import LoadingButton from "@mui/lab/LoadingButton";
import { Button } from '@/components/ui/button';
// import { Button } from "@mui/material";

interface AppButtonProps {
    children: React.ReactNode; // For React elements or components
    type?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Function type for click events
    loading?: boolean;
    sx?: React.CSSProperties; // Style properties
    [key: string]: any; // For the rest of the props
}


const AppButton: React.FC<AppButtonProps> = ({
  children,
  type = "",
  onClick,
  loading,
  sx,
  ...rest
}) => {
  console.log('hello fahim', typeof(children))
  switch (type) {
    case "loadingButton":
      return (
        <LoadingButton
          size="small"
          onClick={onClick}
          loading={loading}
          sx={{ textTransform: "capitalize", ...sx }}
          {...rest}
          disabled={loading}
        >
          {children}
        </LoadingButton>
      );
    default:
      return (
        <Button
          onClick={onClick}
          size="small"
          sx={{ textTransform: "capitalize", ...sx }}
          {...rest}
        >
          {children}
        </Button>
      );
  }
};

export default AppButton;
