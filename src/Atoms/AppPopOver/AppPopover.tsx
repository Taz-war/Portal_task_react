import { Button } from "../../components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../../components/ui/popover"

type AppPopoverProps = { 
    children: React.ReactNode, 
    label: string 
}

const AppPopover = ({ children, label }:AppPopoverProps ) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline">{label}</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                {children}
            </PopoverContent>
        </Popover>
    )
}
export default AppPopover