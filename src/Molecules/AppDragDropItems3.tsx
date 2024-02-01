import React, { useState } from 'react';

type ListItem = string;

const AppDragDropItems3:React.FC = () => {
    const initialItems: ListItem[] = ['Item 1', 'Item 2', 'Item 3', 'Item 4'];
    const [items, setItems] = useState<ListItem[]>(initialItems);
    const [draggedItem, setDraggedItem] = useState<ListItem | null>(null);
    

    const handleDragStart = (e: React.DragEvent<HTMLLIElement>, item: ListItem) => {
        setDraggedItem(item);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', item);
    };

    const handleDragOver = (e: React.DragEvent<HTMLLIElement>, overItem: ListItem) => {
        e.preventDefault();

        if (draggedItem === overItem) {
            return;
        }

        let newOrder = items.filter(item => item !== draggedItem);
        const index = newOrder.indexOf(overItem);
        newOrder.splice(index, 0, draggedItem as ListItem);
        setItems(newOrder);
    };

    const handleDragEnd = (e: React.DragEvent<HTMLLIElement>) => {
        setDraggedItem(null);
    };

    return (
        <ul>
            {items.map((item) => (
                <li key={item} draggable
                    onDragStart={(e) => handleDragStart(e, item)}
                    onDragOver={(e) => handleDragOver(e, item)}
                    onDragEnd={handleDragEnd}
                    style={{ cursor: 'move', marginBottom: '10px', border: '1px solid black', padding: '5px' }}
                >
                    {item}
                </li>
            ))}
        </ul>
    );
}

export default AppDragDropItems3