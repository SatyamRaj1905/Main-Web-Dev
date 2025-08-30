// SidebarItem.tsx

import type { ReactElement } from "react";

interface SideBarItemProps {
    text: string;
    icon: ReactElement;
}

export function SidebarItem({ text, icon }: SideBarItemProps) {
    return (
        <div className="flex items-center text-gray-700 pl-5 cursor-pointer max-w-58 hover:bg-gray-200 rounded transition-all duration-200">
            <div className="p-2 pb-1"> 
               {icon} 
            </div>
            <div className="p-2 text-md">
               {text} 
            </div>
        </div>
    );
}
