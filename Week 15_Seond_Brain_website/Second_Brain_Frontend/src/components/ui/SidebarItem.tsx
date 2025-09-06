// SidebarItem.tsx

import type { ReactElement } from "react";

interface SideBarItemProps {
    text: string;
    icon: ReactElement;
    selected?: boolean;
    onClick?: () => void;
}

export function SidebarItem({ text, icon, selected, onClick }: SideBarItemProps) {
    return (
        <div
            className={`flex items-center text-gray-700 pl-5 cursor-pointer max-w-58 rounded transition-all duration-200
            ${selected ? "bg-gray-300 font-semibold" : "hover:bg-gray-200"}`}
            onClick={onClick}
        >
            <div className="p-2 pb-1">{icon}</div>
            <div className="p-2 text-md">{text}</div>
        </div>
    );
}
