import { Fragment, useState, useEffect, memo, useCallback, useMemo } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon, ChevronDownIcon } from '@heroicons/react/20/solid';

type Person = {
    id: number;
    name: string;
};

// Define the fetchPeople function if it's not already defined
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
        }, 2000);
    });
};

const MultiSelectComboBox = () => {
    const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
    const [people, setPeople] = useState<Person[]>([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownClick = async () => {
        if (!isOpen && !loading) {
            setLoading(true);
            const fetchedPeople = await fetchPeople();
            setPeople(fetchedPeople);
            setLoading(false);
        }
        setIsOpen(!isOpen);
    };

    const filteredPeople = useMemo(() => (
        query === '' ? people : people.filter(person =>
            person.name.toLowerCase().includes(query.toLowerCase()))
    ), [people, query]);

    const toggleSelection = useCallback((person: Person) => {
        setSelectedPeople(currentSelected => {
            const isSelected = currentSelected.some(p => p.id === person.id);
            if (isSelected) {
                return currentSelected.filter(p => p.id !== person.id);
            } else {
                return [...currentSelected, person];
            }
        });
    }, []);

    const removeSelectedPerson = useCallback((personId: number) => {
        setSelectedPeople(currentSelected => currentSelected.filter(p => p.id !== personId));
    }, []);

    const onInputChanged = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    }, []);

    return (
        <div className="w-72">
            <Combobox value={selectedPeople} by="id" onChange={() => { }} multiple>
                <div className="relative mt-1">
                    <div className="w-full border-gray-300 rounded-md bg-white py-2 pl-3 pr-10 flex flex-wrap items-center gap-2 text-left shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                        {selectedPeople.map((person) => (
                            <div key={person.id} className="flex items-center gap-1 bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full">
                                {person.name}
                                <button type="button" onClick={() => removeSelectedPerson(person.id)} className="font-bold">
                                    ×
                                </button>
                            </div>
                        ))}
                        <Combobox.Input
                            as="input" // Explicitly declare as an input for clarity
                            className="flex-1 w-32 outline-none flex-3 border-none focus:ring-0"
                            onChange={onInputChanged}
                            placeholder={selectedPeople.length > 0 ? 'Search people...' : 'Select people'}
                        />
                    </div>
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" onClick={handleDropdownClick} />
                    </Combobox.Button>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => {setLoading(false);setIsOpen(false)}}
                    >
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
                                            `relative rounded-md cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-200 text-black-900' : 'text-gray-900'
                                            }`
                                        }
                                        value={person}
                                        onClick={() => toggleSelection(person)}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                                                    {person.name}
                                                </span>
                                                {selected && (
                                                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};

export default memo(MultiSelectComboBox);
