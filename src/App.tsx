import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button } from './components/ui/button';
import AppButton from './Atoms/AppButton/AppButton';
import AppPopover from './Atoms/AppPopOver/AppPopover';
import { Input } from './components/ui/input';
import AppDragDropItems from './Molecules/AppDragDropItems';
import AppDragDropItems2 from './Molecules/AppDragDropItems2';
import AppDragDropItems3 from './Molecules/AppDragDropItems3';

type SampleDataType = {
  id: number;
  name: string;
  checked: boolean,
};

function App() {
  const [anchorEl, setAnchorEl] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [sampleData, setSampleData] = useState([
    { id: 1, name: 'General', checked: false },
    { id: 2, name: 'Custom Modules(Leads)', checked: false },
]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(true)
    // console.log('hello moto')
  }

  const handleCheckboxChange = (id: number) => {
    const newData = sampleData.map(item => {
        if (item.id === id) {
            return { ...item, checked: !item.checked };
        }
        return item;
    }).sort((a, b) => (b.checked === a.checked) ? 0 : b.checked ? 1 : -1);

    setSampleData(newData);
};
  


  return (
    <div className="flex mx-auto items-center justify-center p-4">
      <AppButton onClick={handleClick} type='' style={{ backgroundColor: 'red' }}>
        Click me
      </AppButton>
      <AppPopover label='Popoveer'>
        <Input type="text" placeholder="Search" onChange={(e)=>setSearch(e.target.value)}/>
        <AppDragDropItems2 search={search} data={sampleData} setData={setSampleData} handleCheckboxChange={handleCheckboxChange}/>
        {/* <AppDragDropItems3 /> */}
        <div className="flex justify-around mt-4"> 
        <Button variant="outline">Secondary</Button>
          <Button className="bg-blue-500 w-24">Save</Button>
        </div>
      </AppPopover>
    </div>
  );
}

export default App;
