import type { ReactElement } from "react";

interface SideBarItemProps {
    text: string;
    icon: ReactElement;
}

export function SidebarItem({ text, icon }: SideBarItemProps) {
    return (
        <div className="flex">
            <div>{icon}</div>
            <div>{text}</div>
        </div>
    );
}
