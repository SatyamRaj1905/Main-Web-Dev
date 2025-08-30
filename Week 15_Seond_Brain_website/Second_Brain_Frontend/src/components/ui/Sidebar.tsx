// Sidebar.tsx

import { BrainIcon } from "../../icons/BrainIcon";
import { TweeterIcon } from "../../icons/TweeterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
    return (
        <div className="h-screen bg-white border-r-2 border-slate-300 w-64 fixed left-0 top-0">
            <div className="pt-4 pl-4">
                <h1 className="pl-2 text-2xl pb-4 pt-2 font-semibold flex gap-4">
                    {<BrainIcon size="lg" />} Second Brain 
                </h1>
                <div className="mt-4">
                    <SidebarItem
                        text="Tweets"
                        icon={<TweeterIcon size="lg" />}
                    ></SidebarItem>
                    <SidebarItem
                        text="Videos"
                        icon={<YoutubeIcon size="lg" />}
                    ></SidebarItem>
                </div>
            </div>
        </div>
    );
}
