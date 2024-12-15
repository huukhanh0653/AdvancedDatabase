import {
    ChevronDown,
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
  } from "lucide-react"
  
  import { Button } from "@/components/ui/button"
  import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
  export function DropdownOption({ options = [], value, onValueChange, className }) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <span className="flex border">
            <Button variant="outline" className= "border-none ml-0 font-normal">{value}</Button>
            <ChevronDown className="mr-2 h-4 w-4 mt-3 ml-auto shrink-0 opacity-50" />
          </span>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-60">
          <DropdownMenuGroup>
            {options.map((option, index) => (
              <DropdownMenuItem key={index} onSelect={() => onValueChange(option)}>
                {option}
              </DropdownMenuItem>
            ))}
            </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  