import { useEffect, useState } from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "../components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/popover";

type Framework = {
    value: string;
    label: string;
};

// const frameworks: Framework[] = [
//     {
//         value: "next.js",
//         label: "Next.js",
//     },
//     {
//         value: "sveltekit",
//         label: "SvelteKit",
//     },
//     {
//         value: "nuxt.js",
//         label: "Nuxt.js",
//     },
//     {
//         value: "remix",
//         label: "Remix",
//     },
//     {
//         value: "astro",
//         label: "Astro",
//     },
// ];

export function ShadcnComboBox() {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [frameworks, setFrameworks] = useState<Framework[]>([]);

    useEffect(() => {
        if (open) {
            setLoading(true);
            // Simulate fetching data
            setTimeout(() => {
                setFrameworks([
                    { value: "next.js", label: "Next.js" },
                    { value: "sveltekit", label: "SvelteKit" },
                    { value: "nuxt.js", label: "Nuxt.js" },
                    { value: "remix", label: "Remix" },
                    { value: "astro", label: "Astro" },
                ]);
                setLoading(false);
            }, 1000);
        }
    }, [open]);

    const toggleValue = (selectedValue: string) => {
        setSelectedValues((currentSelectedValues) =>
            currentSelectedValues.includes(selectedValue)
                ? currentSelectedValues.filter((value) => value !== selectedValue)
                : [...currentSelectedValues, selectedValue]
        );
    };

    const selectedLabels = frameworks
        .filter((framework) => selectedValues.includes(framework.value))
        .map((framework) => framework.label)
        .join(",")

    console.log('aha', { selectedLabels })

    // Sort frameworks by selection status
    const sortedFrameworks = [...frameworks].sort((a, b) => {
        const isSelectedA = selectedValues.includes(a.value) ? -1 : 1;
        const isSelectedB = selectedValues.includes(b.value) ? -1 : 1;
        return isSelectedA - isSelectedB;
    });

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between flex-wrap align-middle min-h-9 h-fit whitespace-nowrap "
                >
                    
                    {selectedValues.length != 0 ? (
                        selectedValues.map((item, index) => {
                            return (
                                <p key={index}>{item},</p>
                            )
                        })
                    ) : "Select framework..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
                {/* <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="relative w-[200px] p-1 border border-gray-300"
                >
                    <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar">
                        {selectedValues.map((value, index) => (
                            <span key={value} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700">
                                {frameworks.find(f => f.value === value)?.label}
                                {selectedValues.length - 1 !== index && ','} 
                            </span>
                        ))}
                    </div>
                    <CaretSortIcon className="absolute right-1 top-1 h-4 w-4 opacity-50" />
                </Button> */}
                {/**<Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedLabels || "Select framework..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button> */}

            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    {loading ? (
                        <div className="flex justify-center items-center h-full">Loading...</div>
                    ) : (
                        <>
                            <CommandInput
                                placeholder="Search framework..."
                                className="h-9"
                                onValueChange={setQuery}
                                value={query}
                            />
                            {sortedFrameworks.length === 0 && <CommandEmpty>No framework found.</CommandEmpty>}
                            <CommandGroup>
                                {sortedFrameworks
                                    .filter((framework) =>
                                        framework.label.toLowerCase().includes(query.toLowerCase())
                                    )
                                    .map((framework) => (
                                        <CommandItem
                                            key={framework.value}
                                            value={framework.value}
                                            onSelect={() => toggleValue(framework.value)}
                                        >
                                            {framework.label}
                                            <CheckIcon
                                                className={cn(
                                                    "ml-auto h-4 w-4",
                                                    selectedValues.includes(framework.value) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    ))}
                            </CommandGroup>
                        </>
                    )}
                </Command>
            </PopoverContent>
        </Popover>
    );
}



export default ShadcnComboBox;
