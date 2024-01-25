import React, { useState } from 'react';
import { Checkbox } from '../components/ui/checkbox';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';

type SampleDataType = {
    id: number;
    name: string;
};

const AppDragDropItems = () => {
    const [sampleData, setSampleData] = useState<SampleDataType[]>([
        { id: 1, name: 'General' },
        { id: 2, name: 'Custom Modules(Leads)' }
    ]);

    const onDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }

        const items = Array.from(sampleData);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setSampleData(items);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
                {(provided) => (
                    <div
                        className="items-center space-x-2 my-4"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {sampleData.map(({id,name}, index) => (
                            <Draggable key={id} draggableId={`draggable-${id}`} index={id}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="flex items-center space-x-2 my-4 w-full ml-2 bg-gray-300 p-2"
                                    >
                                        {/* Uncomment if Checkbox is needed */}
                                        {/* <Checkbox id={`checkbox-${id}`} className="" /> */}
                                        <label
                                            htmlFor={`checkbox-${id}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {name}
                                        </label>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}

export default AppDragDropItems;
