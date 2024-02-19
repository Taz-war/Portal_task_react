import React, { useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { Button } from './components/ui/button';
import AppButton from './Atoms/AppButton/AppButton';
import AppPopover from './Atoms/AppPopOver/AppPopover';
import { Input } from './components/ui/input';
import AppDragDropItems from './Molecules/AppDragDropItems';
import MultiSelectListBox from './Molecules/MultiSelectListBox';
import ComboListBox from './Molecules/ComboListBox';
import ListBox from './Molecules/ListBox';
import MultiSelectComboBox from './Molecules/MultiSelectComboBox';
import ShadcnComboBox from './Molecules/ShadcnComboBox';

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
      <AppPopover label='Popoveer' >
        <Input type="text" placeholder="Search" className=" w-60 h-8" onChange={(e) => setSearch(e.target.value)} />
        <AppDragDropItems search={search} data={sampleData} setData={setSampleData} handleCheckboxChange={handleCheckboxChange} />

        <div className="flex justify-end mt-2">
          <Button variant="outline" className='mr-1 py-0 px-2 w-22 h-7'>Cancel</Button>
          <Button className="bg-blue-500 py-0 px-2 w-22 h-7">Save</Button>
        </div>
      </AppPopover>
      <br />
      <br />
      {/* <MultiSelectListBox /> */}
      <ComboListBox />
      <MultiSelectComboBox />
      {/* <ShadcnComboBox /> */}
      {/* <ListBox /> */}
    </div>
  );
}

export default App;
