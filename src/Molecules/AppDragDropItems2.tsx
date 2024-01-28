import { Checkbox } from '../components/ui/checkbox';
import React, { useState } from 'react'

type SampleDataType = {
    id: number;
    name: string;
};

const AppDragDropItems2 = () => {
    const [sampleData, setSampleData] = useState<SampleDataType[]>([
        { id: 1, name: 'General' },
        { id: 2, name: 'Custom Modules(Leads)' }
    ]);

    ///save reference for dragItem and dragOverItem////
    const dragItem =React.useRef<any>(null)
    const dragOverItem =React.useRef<any>(null)

    const updateOrder = (dragOverIndex:number) => {
        const newSampleData = [...sampleData];
        const draggedItemContent = newSampleData.splice(dragItem.current, 1)[0];
        newSampleData.splice(dragOverIndex, 0, draggedItemContent);
        setSampleData(newSampleData);
    };

    // Function to handle drag start
    const handleDragStart = (index:number) => {
        dragItem.current = index;
    };

    // Function to handle drag enter
    const handleDragEnter = (index:number) => {
        if (dragOverItem.current !== index) {
            dragOverItem.current = index;
            updateOrder(index);
        }
    };

    // Function to reset refs after drop
    const handleSort = (index:number) => {
        updateOrder(index)
        dragItem.current = null;
        dragOverItem.current = null;
    };

    return (
        <div>
            <div className="items-center space-x-2 my-4">
                {sampleData.map(({ id, name }, index) => (
                    <div key={id} className="flex items-center space-x-2 my-4 w-full ml-2 p-2 cursor-move" draggable
                        onDragStart={() => handleDragStart(index)}
                        onDragEnter={() => handleDragEnter(index)}
                        onDragEnd={()=>handleSort(dragOverItem.current=index)}
                        onDragOver={(e) => e.preventDefault()}
                    >
                        {/* Uncomment if Checkbox is needed */}
                        <Checkbox id={`checkbox-${id}`} className="cursor-move" />
                        <label
                            // htmlFor={`checkbox-${id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-move"
                        >
                            {name}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AppDragDropItems2