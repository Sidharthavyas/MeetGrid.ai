"use client";

import { DataTable } from "@/components/data-table";
import { Errorstate } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useMeetingsFilters } from "../../hooks/use-meetings-filters";
import { useRouter } from "next/navigation";
import { DataPagination } from "@/components/data-pagination";

export const MeetingsView=()=>{
    const trpc=useTRPC();
    const router=useRouter();
    const[filters,setFilters]=useMeetingsFilters();
    const {data}=useSuspenseQuery(trpc.meetings.getMany.queryOptions({
        ...filters,
    }))
     
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      {/* Search Filter */}
      <div className="flex items-center justify-between">
      
        {/* you can add other filters (status, agentId) here later */}
      </div>

      <DataTable data={data.items} columns={columns} onRowClick={(row)=>router.push(`/meetings/${row.id}`)} />
      <DataPagination
      page={filters.page}
      totalPages={data.totalPages}
      onPageChange={(page)=>setFilters({page})}
      />

      {data.items.length === 0 && (
        <EmptyState
          title="Create your first Meeting"
          description="Let's connect! Join a meeting to collaborate, share ideas, and interact in real time."
        />
      )}
    </div>
  );
};




export const MeetingsViewLoading = ()=>{
    return(
        <LoadingState
        title="Loading Meetings"
        description="This may take a few Seconds!!"
        />
    )
}

export const MeetingsViewError = ()=>{
    return(
        <Errorstate
        
              title = "Error Loading Meetings"
            description="Something Went Wrong"
        />
       
    
    )
}