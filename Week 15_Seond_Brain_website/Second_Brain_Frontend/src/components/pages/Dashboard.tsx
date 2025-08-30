// Dashboard.tsx

import "../../App.css";
import { Button } from "../ui/Button";
import { PlusIcon } from "../../icons/PlusIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { Card } from "../ui/Card";
import { CreateContentModel } from "../ui/CreateContentModel";
import { useState } from "react";
import { Sidebar } from "../ui/Sidebar";

export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
    return (
        <div>
            <Sidebar />
            <div className="p-4 ml-64 min-h-screen bg-slate-100">
                <CreateContentModel
                    open={modelOpen}
                    onClose={() => {
                        setModelOpen(false);
                    }}
                ></CreateContentModel>

                <div className="flex justify-end">
                    <Button 
                        startIcon={<PlusIcon size="sm" />}
                        variant="Primary"
                        size="sm"
                        onClick={() => {
                            setModelOpen(true);
                        }}
                        text={"Add Content"}
                    />
                    <Button
                        startIcon={
                            <div className="pr-0.5">
                                <ShareIcon size="sm" />
                            </div>
                        }
                        variant="Secondary"
                        size="sm"
                        onClick={() => {}}
                        text={"Share Brain"}
                    />
                </div>

                <div className="flex gap-1">
                    <Card
                        type="twitter"
                        link="https://x.com/GlobeEyeNews/status/1960348787278328221"
                        title="Trump V/S Modi"
                    />
                    <Card
                        type="youtube"
                        link="https://www.youtube.com/watch?v=2MTST0bEkP0"
                        title="Trump V/S Modi"
                    />
                </div>
            </div>
        </div>
    );
}

