// Sidebar.tsx

import { useNavigate } from "react-router-dom";
import { BrainIcon } from "../../icons/BrainIcon";
import { TweeterIcon } from "../../icons/TweeterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { LogoutIcon } from "../../icons/LogoutIcon";
import { SidebarItem } from "./SidebarItem";
import { AllFileIcon } from "../../icons/AllFileIconl";
import { Button } from "./Button";


interface SidebarProps {
    currentFilter: "all" | "youtube" | "twitter";
    setFilter: (value: "all" | "youtube" | "twitter") => void;
    onLogoutClick:() => void
}

export function Sidebar({ currentFilter, setFilter, onLogoutClick }: SidebarProps) {
    const navigate = useNavigate();
    
    return (
        <div className="h-screen bg-white border-r-2 border-slate-300 w-64 fixed left-0 top-0 flex flex-col">
            <div className="pt-4 pl-4">
                <h1 className="pl-2 text-2xl pb-4 pt-2 font-semibold flex gap-4">
                    {<BrainIcon size="lg" />} MindVault
                </h1>
                <div className="mt-4 flex flex-col gap-2">
                    <SidebarItem
                        text="All"
                        icon={<AllFileIcon size="lg" />}
                        selected={currentFilter === "all"}
                        onClick={() => setFilter("all")}
                    />
                    <SidebarItem
                        text="Tweets"
                        icon={<TweeterIcon size="lg" />}
                        selected={currentFilter === "twitter"}
                        onClick={() => setFilter("twitter")}
                    />
                    <SidebarItem
                        text="Videos"
                        icon={<YoutubeIcon size="lg" />}
                        selected={currentFilter === "youtube"}
                        onClick={() => setFilter("youtube")}
                    />
                </div>
            </div>
            <div className="mt-auto pb-6 flex justify-center">
                <Button
                    startIcon={<LogoutIcon size="md" />}
                    variant="Warning"
                    size="sm"
                    onClick={onLogoutClick}
                    text={"Logout"}
                />
            </div>
        </div>
    );
}
