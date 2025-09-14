import { SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAgentsFilters } from "@/app/(dashboard)/agents/hooks/use-agents-filters";
export const AgentsSearchFilter = ()=>{
    const [filters,SetFilters]=useAgentsFilters();
    return(
            <div>
        <Input
        placeholder="Filter by Name"
        className="h-9 bg-white w-[200px] pl-7"
        value={filters.search}
        onChange={(e)=>SetFilters({search:e.target.value})}/>
        <SearchIcon className="size-4 absolute left-3 top-1/2 -traslate-y-1/2 text-muted-foreground"/>
            </div>
    )
}