import { Button } from '../../components/ui/button';
import React from 'react';
import { ReloadIcon } from "@radix-ui/react-icons"

type AppButtonProps ={
  children: React.ReactNode,
  type: string,
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => any,
  loading?: boolean,
  style?: React.CSSProperties,
}

const AppButton: React.FC<AppButtonProps> = ({ children, type = "", onClick, loading, style }) => {
  console.log(onClick)
  // Custom style for loading state
  // const loadingStyle: React.CSSProperties = {
  //   ...style,
  //   opacity: loading ? 0.5 : 1,
  //   cursor: loading ? 'not-allowed' : 'pointer',
  // };

  switch (type) {
    case "loadingButton":
      return (
        <Button disabled>
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
      );
    default:
      return (
        <Button 
          onClick={onClick} 
          style={style} 
        >
          {children}
        </Button>
      );
  }
};

export default AppButton;
