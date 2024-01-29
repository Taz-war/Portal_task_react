import { Checkbox } from '../components/ui/checkbox';
import React, { useState, useRef } from 'react';
// Import your Checkbox component as needed

type SampleDataType = {
    id: number;
    name: string;
    checked: boolean,
};

const AppDragDropItems2 = () => {
    const [sampleData, setSampleData] = useState<SampleDataType[]>([
        { id: 1, name: 'General', checked: false },
        { id: 2, name: 'Custom Modules(Leads)', checked: false },
    ]);

    const dragItem = useRef<number | null>(null);
    const dragOverItem = useRef<number | null>(null);

    const updateOrder = (dragOverIndex: number) => {
        if (dragItem.current === null || dragOverItem.current === null) return;

        const newSampleData = [...sampleData];
        const draggedItemContent = newSampleData.splice(dragItem.current, 1)[0];
        newSampleData.splice(dragOverIndex, 0, draggedItemContent);

        dragItem.current = dragOverIndex; // Update the current drag item index
        setSampleData(newSampleData);
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
        <div>
            <div className="items-center space-x-2 my-4">
                {sampleData.map(({ id, name, checked }, index) => (
                    <div key={id} className="flex items-center space-x-2 my-4 w-full ml-2 p-2 cursor-move" draggable
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
