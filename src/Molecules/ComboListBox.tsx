import { Fragment, useMemo, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

type Person = {
    id: number;
    name: string;
}

const people: Person[] = [
    { id: 1, name: 'Wade Cooper' },
    { id: 2, name: 'Arlene Mccoy' },
    { id: 3, name: 'Devon Webb' },
    { id: 4, name: 'Tom Cook' },
    { id: 5, name: 'Tanya Fox' },
    { id: 6, name: 'Hellen Schmidt' },
]

export default function ComboListBox() {
    const [selected, setSelected] = useState<Person | null>(null);
    const [query, setQuery] = useState<string>('');

    // Memoize filteredPeople to avoid recalculating on every render
    const filteredPeople: Person[] = useMemo(() => {
        return query === ''
            ? people
            : people.filter((person) =>
                  person.name.toLowerCase().includes(query.toLowerCase())
              );
    }, [query]);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(event.target.value);
    };

    return (
        <div className="relative w-72">
            <Combobox value={selected} onChange={setSelected}>
                <div className="relative mt-1">
                    <Combobox.Input
                        className="w-full border-gray-300 rounded-md bg-white py-2 pl-3 pr-10 text-left shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        displayValue={(person: Person) => person?.name ?? 'Select a fruit'}
                        onChange={handleInputChange}
                        placeholder="Select a fruit"
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                        <ChevronUpDownIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 px-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredPeople.length === 0 && query !== '' ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredPeople.map((person) => (
                                    <Combobox.Option
                                        key={person.id}
                                        value={person}
                                        className={({ active }) =>
                                            `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-gray-200 text-black rounded-md' : 'text-gray-900'
                                            }`
                                        }
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                        }`}
                                                >
                                                    {person.name}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-black' : 'text-black-500'
                                                            }`}
                                                    >
                                                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                    </span>
                                                ) : null}
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
}
