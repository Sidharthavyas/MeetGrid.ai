import { AlertCircleIcon } from "lucide-react";
interface Props{
    title:string;
    description:string;
}
export const Errorstate = ({
    title,
    description
}:Props)=>{
    return(
        <div className="h-screen w-full flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center justify-center gap-y-6 bg-background border  rounded-lg p-10 shadow-lg">
                <AlertCircleIcon className="size-7  text-red-500"/>
                <div className="flex flex-col gap-y-2 text-center">
                    <h6 className="text-lg font-medium">  {title} </h6>
                    <p className="text-sm"> {description}</p>
                </div>
            </div>
        </div>
    )
}