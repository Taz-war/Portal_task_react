import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button } from './components/ui/button';
import AppButton from './Atoms/AppButton/AppButton';
import AppPopover from './Atoms/AppPopOver/AppPopover';
import { Input } from './components/ui/input';
import AppDragDropItems from './Molecules/AppDragDropItems';

function App() {
  const [anchorEl, setAnchorEl] = useState<boolean>(false);
  const [search, setSearch] = useState<null | string>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(true)
    // console.log('hello moto')
  }

  return (
    <div className="flex mx-auto items-center justify-center p-4">
      <AppButton onClick={handleClick} type='' style={{ backgroundColor: 'red' }}>
        Click me
      </AppButton>
      <AppPopover label='Popoveer'>
        <div>Children</div>
        <Input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
        <AppDragDropItems />
        <div className="flex justify-around mt-4"> 
        <Button variant="outline">Secondary</Button>
          <Button className="bg-blue-500 w-24">Save</Button>
        </div>
      </AppPopover>
    </div>
  );
}

export default App;
