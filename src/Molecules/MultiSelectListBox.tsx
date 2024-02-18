import { useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { json } from 'stream/consumers';

interface FruitOption {
  id: number;
  name: string;
  unavailable: boolean;
}

const fruits = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'];
const fruitOptions: FruitOption[] = fruits.map((fruit, index) => ({
  id: index,
  name: fruit,
  unavailable: false,
}));

const MultiSelectListBox = () => {
    const [selectedFruits, setSelectedFruits] = useState<FruitOption[]>([]);

    const toggleFruit = (fruit: FruitOption) => {
      setSelectedFruits((prevSelectedFruits) =>
        prevSelectedFruits.find((f) => f.id === fruit.id)
          ? prevSelectedFruits.filter((f) => f.id !== fruit.id)
          : [...prevSelectedFruits, fruit]
      );
    };
  
    return (
      <div className="w-72">
          {/* {JSON.stringify(selectedFruits)} */}
        <Listbox as="div">
          {({ open }) => (
            <>
              <Listbox.Label className="block text-sm font-medium text-gray-700">Fruits</Listbox.Label>
              <div className="mt-1 relative">
                <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                  {selectedFruits.length === 0 ? 'Select fruits' : selectedFruits.map(f => f.name).join(', ')}
                </Listbox.Button>
                <Transition
                  show={open}
                  enter="transition duration-100 ease-out"
                  enterFrom="transform scale-95 opacity-0"
                  enterTo="transform scale-100 opacity-100"
                  leave="transition duration-75 ease-out"
                  leaveFrom="transform scale-100 opacity-100"
                  leaveTo="transform scale-95 opacity-0"
                >
                  <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                    {fruitOptions.map((fruit) => (
                      <Listbox.Option
                        key={fruit.id}
                        value={fruit}
                        disabled={fruit.unavailable}
                      >
                        {({ active, selected }) => (
                          <li
                            className={`${active ? 'text-white bg-indigo-600' : 'text-gray-900'} cursor-default select-none relative py-2 pl-3 pr-9`}
                            onClick={() => toggleFruit(fruit)}
                          >
                            <span className={`${selected ? 'font-semibold' : 'font-normal'} block truncate`}>
                              {fruit.name}
                            </span>
                          </li>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
            </>
          )}
        </Listbox>
      </div>
    );
}

export default MultiSelectListBox