// Dashboard.tsx

import "../../App.css";
import { Button } from "../ui/Button";
import { PlusIcon } from "../../icons/PlusIcon";
import { ShareIcon } from "../../icons/ShareIcon";
import { Card } from "../ui/Card";
import { CreateContentModel } from "../ui/CreateContentModel";
import { useEffect, useState } from "react";
import { Sidebar } from "../ui/Sidebar";
import { useContent } from "../../hooks/useContent";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export function Dashboard() {
    const [modelOpen, setModelOpen] = useState(false);
    const { contents, refresh } = useContent();

    // whenever the model is closed, it should re-fetch the data from the backend
    useEffect(() => {
        refresh();
    }, [modelOpen]);
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
                        text={"Share Brain"}
                        onClick={async () => {
                            const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
                                share: true,
                            }, {
                                headers:{
                                    "Authorization" : localStorage.getItem("token")
                                }
                            });
                            const shareUrl = `http://localhost:5173/share/${response.data.hash}`
                            alert(shareUrl)
                        }}
                    />
                </div>

                <div className="flex gap-1 flex-wrap">
                    {contents.map(({ type, link, title }, index) => (
                        <Card
                            key={index}
                            type={type}
                            link={link}
                            title={title}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
