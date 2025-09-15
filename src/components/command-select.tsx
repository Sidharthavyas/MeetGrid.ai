import { Button } from "@/components/ui/button";
import {
  CommandEmpty,
  CommandItem,
  CommandInput,
  CommandList,
  CommandResponsiveDialog,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "lucide-react";
import { ReactNode, useState } from "react";

interface Props {
  options: Array<{
    id: string;
    value: string;
    children: ReactNode;
  }>;
  onSelect: (value: string) => void;
  onSearch?: (value: string) => void;
  value: string;
  placeholder?: string;
  isSearchable?:boolean,
  className?: string;
}

export const CommandSelect = ({
  options,
  onSelect,
  onSearch,
  value,
  placeholder = "Select an Option",
  className,
}: Props) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <>
      
      <Button
        onClick={() => setOpen(true)}
        type="button"
        variant="outline"
        className={cn(
          "h-9 justify-between font-normal px-2",
          !selectedOption && "text-muted-foreground",
          className
        )}
      >
        <div>{selectedOption?.children ?? placeholder}</div>
        <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
      </Button>

      {/* Dialog */}
      <CommandResponsiveDialog open={open} onOpenChange={setOpen}
      shouldFilter={!onSearch}
      >
        <CommandInput placeholder="Search..." onValueChange={onSearch} />
        <CommandList>
          <CommandEmpty>
            <span className="text-sm text-muted-foreground">
              No options found
            </span>
          </CommandEmpty>
          {options.map((option) => (
            <CommandItem
              key={option.id}
              value={option.value}
              onSelect={() => {
                onSelect(option.value);
                setOpen(false);
              }}
            >
              {option.children}
            </CommandItem>
          ))}
        </CommandList>
      </CommandResponsiveDialog>
    </>
  );
};
