import Image from "next/image";
import Link from "next/link";

import{
CallControls,
SpeakerLayout
}from "@stream-io/video-react-sdk"
interface Props{
    onLeave:()=>void;
    meetingName:string;
}
export const CallActive = ({onLeave,meetingName}:Props)=>{
    return(
    <div className="flex flex-col h-full bg-[#101213] text-white">

      <div className="flex items-center gap-4 p-4 border-b border-white/10">
        <Link href="/" className="flex items-center p-1 bg-white/10 rounded-full w-fit">
          <Image src="/logo.svg" width={22} height={22} alt="logo" />
        </Link>
        <h4 className="text-base font-medium">{meetingName}</h4>
      </div>
        <SpeakerLayout />
      <div className="p-4 flex justify-center border-t border-white/10">
        <CallControls onLeave={onLeave} />
      </div>
    </div>
  );
};

