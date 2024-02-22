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


export function ShadcnComboBox() {
    const [open, setOpen] = useState(false);
    const [selectedValues, setSelectedValues] = useState<string[]>([]);
    const [query, setQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [moduleData, setModuleData] = useState<Framework[]>([]);

    useEffect(() => {
        if (open) {
            setLoading(true);
            // Simulate fetching data
            setTimeout(() => {
                setModuleData([
                    { "label": "Campaigns", "value": "Campaigns" },
                    { "label": "Reports", "value": "Reports" },
                    { "label": "Analytics", "value": "Analytics" },
                    { "label": "Solutions", "value": "Solutions" },
                    { "label": "Vendors", "value": "Vendors" },
                    { "label": "Quotes", "value": "Quotes" },
                    { "label": "Purchase Orders", "value": "Purchase_Orders" },
                    { "label": "Documents", "value": "Documents" },
                    { "label": "Social", "value": "Social" },
                    { "label": "Feeds", "value": "Feeds" },
                    { "label": "Google Ads", "value": "Google_AdWords" },
                    { "label": "SalesInbox", "value": "SalesInbox" },
                    { "label": "Projects", "value": "Projects" },
                    { "label": "Partners", "value": "Partners" },
                    { "label": "Courses", "value": "Courses" },
                    { "label": "TempContact", "value": "TempContact" },
                    { "label": "Demo Users", "value": "Demo_Users" },
                    { "label": "Marketing Attributions", "value": "Marketing_Attribution" },
                    { "label": "Equipments", "value": "Equipments" },
                    { "label": "Account x Equipments", "value": "Account_x_Equipments" },
                    { "label": "Contact x Equipments", "value": "Contact_x_Equipments" },
                    { "label": "Contract Details New", "value": "Contract_Details_New" },
                    { "label": "Fee Schedules1", "value": "Fee_Schedules1" },
                    { "label": "Product Lines", "value": "Product_Lines" },
                    { "label": "Business Units", "value": "Business_Units" },
                    { "label": "BCGlobal Module", "value": "BCGlobal_Module" },
                    { "label": "Portal Users", "value": "Portal_Users" },
                    { "label": "Forecasts", "value": "Forecasts" },
                    { "label": "Visits", "value": "Visits" },
                    { "label": "My Jobs", "value": "Approvals" },
                    { "label": "Home", "value": "Home" },
                    { "label": "Leads", "value": "Leads" },
                    { "label": "Contacts", "value": "Contacts" },
                    { "label": "Accounts", "value": "Accounts" },
                    { "label": "Deals", "value": "Deals" },
                    { "label": "Tasks", "value": "Tasks" },
                    { "label": "Meetings", "value": "Events" },
                    { "label": "Activities", "value": "Activities" },
                    { "label": "Calls", "value": "Calls" },
                    { "label": "CommandCenter", "value": "Orchestration" },
                    { "label": "Alpine.js", "value": "Alpine_js" },
                    { "label": "Mass Email", "value": "Mass_Email" },
                    { "label": "Filter Phone Numbers", "value": "Filter_Phone_Numbers" },
                    { "label": "Invoices", "value": "Invoices" },
                    { "label": "Price Books", "value": "Price_Books" },
                    { "label": "Products", "value": "Products" },
                    { "label": "School Building Projects", "value": "School_Building_Projects" },
                    { "label": "Employee list", "value": "Fathers" },
                    { "label": "Days", "value": "Females" },
                    { "label": "Months", "value": "Childrens" },
                    { "label": "XOrganizations", "value": "XOrganizations" },
                    { "label": "XEmployees", "value": "XEmployees" },
                    { "label": "LeadsXAccounts", "value": "LeadsXAccounts" },
                    { "label": "Test Web Tab", "value": "testingiwebw__Localhost_Web_Tab" },
                    { "label": "Test Settings", "value": "testingiwebw__Test_Settings" },
                    { "label": "DeDuplicate Logs", "value": "easydeduplicateforcrm__DeDuplicate_Logs" },
                    { "label": "Field Change Timelog", "value": "Field_Change_Timelog" },
                    { "label": "Custom Subform", "value": "Custom_Subform_ForSync" },
                    { "label": "Custom Subform1", "value": "Custom_Subform1" },
                    { "label": "Custom Subform3", "value": "Custom_Subform3" },
                    { "label": "Family Maping", "value": "Family_Maping" },
                    { "label": "Subform 2", "value": "Subform_2" },
                    { "label": "Subform 3", "value": "Subform_3" },
                    { "label": "Educational Information", "value": "Educational_Information" },
                    { "label": "DeDuplicate Settings", "value": "easydeduplicateforcrm__DeDuplicate_Settings" },
                    { "label": "daily stat", "value": "daily_stat" },
                    { "label": "monthly stat", "value": "monthly_stat" },
                    { "label": "Weekly stat", "value": "Weekly_stat" },
                    { "label": "Tanveerul Hoque", "value": "Tanveerul_Hoque" },
                    { "label": "Weeks", "value": "Weeks" },
                    { "label": "Administration Widget", "value": "Administration_Widget" },
                    { "label": "Notes", "value": "Notes" },
                    { "label": "Company Relationship", "value": "Company_Relationship" },
                    { "label": "Services", "value": "Services__s" },
                    { "label": "Appointments", "value": "Appointments__s" },
                    { "label": "Dummy Users", "value": "Dummy_Users" },
                    { "label": "Attachments", "value": "Attachments" },
                    { "label": "Sales Orders", "value": "Sales_Orders" },
                    { "label": "Emails", "value": "Emails" },
                    { "label": "Cases", "value": "Cases" },
                    { "label": "Jobs", "value": "Jobs" },
                    { "label": "Actions Performed", "value": "Actions_Performed" },
                    { "label": "Job Allocation", "value": "Job_Allocation" },
                    { "label": "Time Sheets", "value": "Time_Sheets" },
                    { "label": "Contacts X Users", "value": "Contacts_X_Users" },
                    { "label": "Services X Users", "value": "Services_X_Users__s" },
                    { "label": "Leads X Contacts", "value": "Leads_X_Contacts" },
                    { "label": "Leads X Users", "value": "Leads_X_Users" },
                    { "label": "Facebook", "value": "Facebook" },
                    { "label": "Twitter", "value": "Twitter" },
                    { "label": "ShiftHours", "value": "ShiftHours" },
                    { "label": "Qualify Leads through Call", "value": "Qualify_Leads_through_Call" },
                    { "label": "Qualify Leads through Email", "value": "Qualify_Leads_through_Email" },
                    { "label": "Forecast Quotas", "value": "Forecast_Quotas" },
                    { "label": "Forecast Items", "value": "Forecast_Items" },
                    { "label": "Forecast Groups", "value": "Forecast_Groups" },
                    { "label": "Consents", "value": "Consents" },
                    { "label": "Data Subject Requests", "value": "Data_Subject_Requests" },
                    { "label": "Locking Information", "value": "Locking_Information__s" },
                    { "label": "Appointments Rescheduled History", "value": "Appointments_Rescheduled_History__s" },
                    { "label": "Test Journey", "value": "Test_Journey" },
                    { "label": "Easy SMS Logs", "value": "Easy_SMS_Logs" },
                    { "label": "Email Extension Users", "value": "Email_Extension_Users" }
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

    const selectedLabels = moduleData
        .filter((framework) => selectedValues.includes(framework.value))
        .map((framework) => framework.label)
        .join(",")

    console.log('aha', { selectedLabels })

    // Sort moduleData by selection status
    const sortedmoduleData = [...moduleData].sort((a, b) => {
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
                    className="w-[300px] justify-between flex-wrap align-middle min-h-9 h-fit whitespace-nowrap "
                >

                    {selectedValues.length != 0 ? (
                        selectedValues.map((item, index) => {
                            return (
                                <p key={index}>{item},</p>
                            )
                        })
                    ) : "Select module data..."}
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
                                {moduleData.find(f => f.value === value)?.label}
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
            <PopoverContent className="w-[300px] p-0 max-h-[300px] overflow-y-auto">
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
                            {sortedmoduleData.length === 0 && <CommandEmpty>No framework found.</CommandEmpty>}
                            <CommandGroup>
                                {sortedmoduleData
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
