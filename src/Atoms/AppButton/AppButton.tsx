import { Button } from '../../components/ui/button';
import React from 'react';
// import { Button } from '@/components/ui';

interface AppButtonProps {
  children: React.ReactNode;
  type?: string;
  onClick: () => void;
  loading?: boolean;
  style?: React.CSSProperties;
}

const AppButton: React.FC<AppButtonProps> = ({ children, type = "", onClick, loading, style, ...rest }) => {
  console.log(children)
  // Custom style for loading state
  const loadingStyle: React.CSSProperties = {
    ...style,
    opacity: loading ? 0.5 : 1,
    cursor: loading ? 'not-allowed' : 'pointer',
  };

  switch (type) {
    case "loadingButton":
      return (
        <Button 
          onClick={loading ? undefined : onClick} 
          style={loadingStyle} 
          {...rest}
          disabled={loading}
        >
          {loading ? 'Loading...' : children}
        </Button>
      );
    default:
      return (
        <Button 
          onClick={onClick} 
          style={style} 
          {...rest}
        >
          {children}
        </Button>
      );
  }
};

export default AppButton;
