import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";

export const MeetingsSearchFilter = () => {
    const [filters, setFilters] = useMeetingsFilters();
    
    return (
        <div className="relative">
            <SearchIcon className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
                placeholder="Filter by Name"
                className="h-9 bg-white w-[200px] pl-9"
                value={filters.search}
                onChange={(e) => setFilters({ search: e.target.value })}
            />
        </div>
    );
};