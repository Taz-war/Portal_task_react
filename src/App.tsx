import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button } from './components/ui/button';
import AppButton from './Atoms/AppButton/AppButton';

function App() {

  const handleClick=()=>{
    console.log('hello moto')
  }

  return (
    <div className="flex mx-auto items-center justify-center p-4">
       <AppButton onClick={handleClick} type="loadingButton">
        Click me
      </AppButton>
    </div>
  );
}

export default App;
