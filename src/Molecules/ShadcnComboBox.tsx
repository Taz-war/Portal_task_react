import * as React from "react";
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

const frameworks: Framework[] = [
    {
        value: "next.js",
        label: "Next.js",
    },
    {
        value: "sveltekit",
        label: "SvelteKit",
    },
    {
        value: "nuxt.js",
        label: "Nuxt.js",
    },
    {
        value: "remix",
        label: "Remix",
    },
    {
        value: "astro",
        label: "Astro",
    },
];

export function ShadcnComboBox() {
    const [open, setOpen] = React.useState(false);
    const [selectedValues, setSelectedValues] = React.useState<string[]>([]);
    const [query, setQuery] = React.useState("");

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
        .join(", ");

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {selectedLabels || "Select framework..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput
                        placeholder="Search framework..."
                        className="h-9"
                        onValueChange={setQuery}
                        value={query}
                    />
                    {frameworks.length === 0 && <CommandEmpty>No framework found.</CommandEmpty>}
                    <CommandGroup>
                        {frameworks
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
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default ShadcnComboBox;
