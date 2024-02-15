import { Checkbox } from '../components/ui/checkbox';
import React, { useState, useRef } from 'react';
// Import your Checkbox component as needed

type SampleDataType = {
    id: number;
    name: string;
    checked: boolean,
};

type AppDragDropItems2Props = {
    search: string;
    data:SampleDataType[],
    setData:React.Dispatch<React.SetStateAction<SampleDataType[]>>,
    handleCheckboxChange: (id:number)=>void
};

const AppDragDropItems2 = ({search,data,setData,handleCheckboxChange}:AppDragDropItems2Props) => {
    

    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const updateOrder = (dragOverIndex: number) => {
        if (dragItem.current === null || dragOverItem.current === null) return;

        const newSampleData = [...data];
        const draggedItemContent = newSampleData.splice(dragItem.current, 1)[0];
        newSampleData.splice(dragOverIndex, 0, draggedItemContent);
        dragItem.current = dragOverIndex; // Update the current drag item index
        setData(newSampleData);
    };

    const handleDragStart = (index: number) => {
        dragItem.current = index;
        console.log(dragItem.current)
    };

    const handleDragEnter = (index: number) => {

        dragOverItem.current = index;
        if (dragItem.current !== index) {
            updateOrder(index);
        }
    };

    const handleDragEnd = () => {
        dragItem.current = null;
        dragOverItem.current = null;
    };

    
    const filteredData = data.filter(item => 
        item.name.toLowerCase().includes(search)
    );


    return (
        <div>
            <div className="items-center space-x-2 my-4">
                {filteredData.map(({ id, name, checked }, index) => (
                    <div key={id} className="flex items-center space-x-2 my-2 w-full ml-2 p-1 cursor-move" draggable
                        onDragStart={() => handleDragStart(index)} //1
                        onDragEnter={() => handleDragEnter(index)} //0
                        onDragEnd={handleDragEnd}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        <Checkbox id={`checkbox-${id}`} className="accent-blue-700" onClick={() => handleCheckboxChange(id)} checked={checked} />
                        <label
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-move"
                        >
                            {name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppDragDropItems2;
