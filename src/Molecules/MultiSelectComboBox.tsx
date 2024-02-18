import { Fragment, useState, useEffect } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

type Person = {
    id: number;
    name: string;
}

// Mock asynchronous function to simulate fetching data
const fetchPeople = (): Promise<Person[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Wade Cooper' },
                { id: 2, name: 'Arlene McCoy' },
                { id: 3, name: 'Devon Webb' },
                { id: 4, name: 'Tom Cook' },
                { id: 5, name: 'Tanya Fox' },
                { id: 6, name: 'Hellen Schmidt' },
            ]);
        }, 2000); // Simulate network delay
    });
};

const MultiSelectComboBox = () => {
    const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
    const [people, setPeople] = useState<Person[]>([]);
    const [query, setQuery] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const filteredPeople: Person[] =
        query === ''
            ? people
            : people.filter((person) =>
                person.name.toLowerCase().includes(query.toLowerCase())
            );

    const toggleSelection = (person: Person) => {
        setSelectedPeople((currentSelected) => {
            const isSelected = currentSelected.some((p) => p.id === person.id);
            if (isSelected) {
                return currentSelected.filter((p) => p.id !== person.id);
            } else {
                return [...currentSelected, person];
            }
        });
    };

    // Fetch data when the dropdown is opened
    const handleDropdownClick = async () => {
        if (!isOpen && !loading) {
            setLoading(true);
            const fetchedPeople = await fetchPeople();
            setPeople(fetchedPeople);
            setLoading(false);
        }
        setIsOpen(!isOpen);
    };

    return (
        <div className="w-72">
            <Combobox value={selectedPeople} onChange={() => {}} multiple>
                <div className="relative mt-1">
                    <Combobox.Input
                        className="w-full border-gray-300 rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        displayValue={(items: Person[]) => items.map((item) => item.name).join(', ')}
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={selectedPeople.length > 0 ? '' : 'Select people'}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2" onClick={handleDropdownClick}>
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </Combobox.Button>
                    
                    <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 px-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {loading ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Loading...
                            </div>
                        ) : filteredPeople.length === 0 && query !== '' ? (
                            <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                Nothing found.
                            </div>
                        ) : (
                            filteredPeople.map((person) => (
                                <Combobox.Option
                                    key={person.id}
                                    className={({ active }) =>
                                        `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-200 text-black rounded-md' : 'text-gray-900'
                                        }`
                                    }
                                    value={person}
                                    onClick={() => toggleSelection(person)}
                                >
                                    {({ selected }) => (
                                        <>
                                            <span
                                                className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                    }`}
                                            >
                                                {person.name}
                                            </span>
                                            {selected && (
                                                <span
                                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${selected ? 'text-black' : 'text-black-500'
                                                        }`}
                                                >
                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                </span>
                                            )}
                                        </>
                                    )}
                                </Combobox.Option>
                            ))
                        )}
                    </Combobox.Options>
                </div>
            </Combobox>
        </div>
    );
}

export default MultiSelectComboBox;
